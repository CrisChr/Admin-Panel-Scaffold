import path from 'path';
import fs from 'fs';

export default class OtherTemplate {
  config: ListPage;

  constructor(config: ListPage){
    this.config = config;

    if(!fs.existsSync(
      path.join(
        process.cwd(),
        'src',
        'pages',
        this.config.type.toLocaleLowerCase(),
      ),
    )){
      fs.mkdirSync(
        path.join(process.cwd(), 'src', 'pages', this.config.type.toLowerCase())
      )
    }

  }
}