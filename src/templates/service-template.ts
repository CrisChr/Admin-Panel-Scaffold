import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import BasicTemplate from './basic-template';

export default class ServiceTemplate extends BasicTemplate{
  path: string;
  outputPath: string;
  config: ListPage;

  constructor(config: ListPage){
    super();
    this.path = path.join(
      __dirname,
      '..',
      '..',
      'project-templates',
      'list-page',
      'service.ts'
    );
    this.outputPath = path.join(
      process.cwd(),
      'src',
      'pages',
      config.type.toLocaleLowerCase(),
      'service.ts'
    );
    this.config = config;
    this.parse();
  }

  run(): void {
    this.generate();
  }

  parse(): void {
    const buffer = fs.readFileSync(this.path);
    const code = ejs.render(buffer.toString(), {
      listApi: this.config.listApi,
    });
    super.parse(code);
  }
}