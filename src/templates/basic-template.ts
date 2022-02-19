import { parse } from '@babel/core';
import generate from '@babel/generator';
import fs from 'fs';
import path from 'path';

export default class BasicTemplate {
  processor?: Processor;
  ast?: any;
  path?: string;
  outputPath?: string;

  run() {
    // if (!this.processor) {
    //   throw Error('No processor.');
    // }

    // this.processor.run();
    this.generate();
  }

  parse(code: string) {
    const ast = parse(code, {
      ast: true,
      presets: [
        [
          path.join(
            __dirname,
            '..',
            '..',
            'node_modules',
            '@babel/preset-typescript',
          ),
          { isTSX: true, allExtensions: true },
        ],
        [
          path.join(
            __dirname,
            '..',
            '..',
            'node_modules',
            '@babel/preset-react',
          ),
        ],
      ],
    });

    if (!ast) {
      throw new Error(`AST parse failed. Template path: ${this.path}`);
    }

    this.ast = ast;
  }

  generate() {
    if (!this.ast) {
      throw Error('No AST.');
    }

    if (!this.outputPath) {
      throw Error('No output path.');
    }

    const { code } = generate(this.ast, {
      retainLines: true, // 尝试在输出的代码中使用与源代码相同的行号(有助于保留栈信息跟踪)
      retainFunctionParens: true // 保留函数表达式的上下级 (可用于更改引擎解析行为)
    });

    fs.writeFileSync(this.outputPath, code);
  }
}
