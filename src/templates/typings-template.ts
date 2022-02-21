import path from 'path';
import fs from 'fs';
import BasicTemplate from './basic-template';

export default class TypingsTemplate extends BasicTemplate{
  path: string;
  outputPath: string;

  constructor(){
    super();
    this.path = path.join(
      __dirname,
      '..',
      '..',
      'project-templates',
      'project',
      'typings.d.ts'
    );
    this.outputPath = path.join(process.cwd(), 'typings.d.ts');
    this.parse();
  }

  run(): void {
    this.generate();
  }

  parse(): void {
    const buffer = fs.readFileSync(this.path);
    super.parse(buffer.toString());
  }
}