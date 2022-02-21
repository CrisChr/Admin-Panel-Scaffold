import path from 'path';
import fs from 'fs';
import BasicTemplate from './basic-template';
import { registeredMessages, messages } from '../locales/messages';

export default class LocaleTemplate extends BasicTemplate{
  path: string;
  outputPath: string;
  config: Config;

  constructor(config: Config){
    super();
    this.config = config;
    this.path = path.join(
      __dirname,
      '..',
      '..',
      'project-templates',
      'locales',
      'index.ts'
    );
    this.outputPath = path.join(process.cwd(), 'src', 'locales', 'index.ts');
    this.parse();
  }

  run(): void {
    const ret = this.getMessages();
    Object.keys(ret).forEach(key => {
      this.writeLocaleFile(key, ret[key]);
    });
    this.generate();
  }

  writeLocaleFile(key: string, locales: any){
    if(!fs.existsSync(path.join(process.cwd(), 'src', 'locales', key))){
      fs.mkdirSync(path.join(process.cwd(), 'src', 'locales', key));
    }
    fs.writeFileSync(
      path.join(process.cwd(), 'src', 'locales', key, 'messages.json'),
      JSON.stringify(locales, null, 2)
    )
  }

  getMessages(){
    const {languages} = this.config;
    const ret: {[id: string]: {[id: string]: string}} = {};
    languages.forEach(({key}) => {
      const locales: {[id:string]: string} = {};
      const innerMessages: {[id: string]: string} = messages[key];
      new Set(registeredMessages).forEach(id => {
        locales[id] = innerMessages[id] || id;
      });
      ret[key] = locales;
    });
    return ret;
  }

  parse(): void {
    const buffer = fs.readFileSync(this.path);
    super.parse(buffer.toString());
  }
}