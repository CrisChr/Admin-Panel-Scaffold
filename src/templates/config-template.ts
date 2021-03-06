import path from 'path';
import fs from 'fs';
import BasicTemplate from './basic-template';

export default class ConfigTemplate extends BasicTemplate{
  path: string;
  outputPath: string;
  config: Config;

  constructor(config: Config){
    super();
    this.path = path.join(
      __dirname,
      '..',
      '..',
      'project-templates',
      'config',
      'index.ts'
    );
    this.outputPath = path.join(
      process.cwd(),
      'src',
      'config',
      'index.ts'
    )
    this.config = config;
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