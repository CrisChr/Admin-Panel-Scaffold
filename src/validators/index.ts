import chalk from "chalk";

export default class Validator {
  config: Config;

  constructor(config: Config){
    this.config = config;
  }

  error(message: string){
    console.log(chalk.red(message));
    throw Error();
  }

  async run() {
    if(!this.config){
      throw Error('config is invalid');
    }

    const missingKeys = [
      'projectName',
      'languages',
      'defaultLanguage',
      'currencies',
      'defaultCurrency',
      'menus'
    ].filter((key) => !this.config[key as keyof Config]);

    if(missingKeys.length){
      this.error(`${missingKeys.toString()} are missing in config file`)
    }

    this.validateLanguages(this.config['languages']);
    this.validateCurrencies(this.config['currencies']);
    this.validateMenus(this.config['menus']);

  }

  validateLanguages(languages: Config['languages']){
    if(!Array.isArray(languages) || !languages.every(({key, title}) => key && title)){
      this.error(`languages should be format {title: string; key: string;}[]`);
    }
  }

  validateCurrencies(currencies: Config['currencies']){
    if(!Array.isArray(currencies) || !currencies.every(({key, title}) => key && title)){
      this.error(`currencies should be format {title: string; key: string;}[]`);
    }
  }

  validateMenus(menus: Config['menus']){
    if(!Array.isArray(menus)){
      this.error('menus should be an array!');
    }

    menus.forEach(({children, title: parentTitle, key: parentKey}) => {
      if(!parentTitle){
        this.error('menu item should have a title!');
      }
      if(typeof parentKey !== 'string'){
        this.error('menu item should have a key!');
      }
      if(!children || !Array.isArray(children)){
        this.error(`sub menu of ${parentTitle || parentKey} should be an array!`);
      }

      children.forEach(({title, key, path, icon, scopeKey }) => {
        if(!title){
          this.error(`sub menu of ${parentTitle || parentKey} should have a title`);
        }
        if(!key){
          this.error(`sub menu ${title} should have a key`);
        }

        if(!path){
          this.error(`sub menu ${title} should have a path`);
        }

        if(
          ![
            'Partner',
            'Template',
            'Bill'
          ].includes(icon)
        ){
          this.error(`icon in sub menu ${title} should be one of ${['Partner', 'Template', 'Bill']}`);
        }

        if(scopeKey && typeof scopeKey !== 'string'){
          this.error(`scope in sub menu ${title} should be a string`);
        }

      })
    })
  }
}