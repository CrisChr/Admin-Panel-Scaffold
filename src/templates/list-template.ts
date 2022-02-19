import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import BasicTemplate from './basic-template';

export default class ListTemplate extends BasicTemplate{
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
      'list.tsx'
    );
    this.outputPath = path.join(
      process.cwd(),
      'src',
      'pages',
      config.type.toLocaleLowerCase(),
      'index.tsx'
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
      type: this.config.type
    });
    super.parse(code);
  }
}