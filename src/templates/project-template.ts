/**
 * 工程模板
 */
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

export default class ProjectTemplate {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  run() {
    this.copyPackageJson();
    this.copyIndexPage();
    this.writeGlobalLess();
  }

  /**
   * 拷贝package.json文件
   */
  copyPackageJson() {
    const buffer = fs.readFileSync(
      path.join(__dirname, '..', '..', 'templates', 'project', 'package.json'),
    );
    const code = ejs.render(buffer.toString(), {
      projectName: this.config.projectName,
    });

    fs.writeFileSync(path.join(process.cwd(), 'package.json'), code); // 写入新的package.json
  }

  /**
   * 拷贝Index文件
   */
  copyIndexPage() {
    const buffer = fs.readFileSync(
      path.join(__dirname, '..', '..', 'templates', 'index-page.tsx'),
    );
    const code = ejs.render(buffer.toString(), {
      homePagePath: this.config.homePagePath,
    });

    fs.writeFileSync(
      path.join(process.cwd(), 'src', 'pages', 'index.tsx'),
      code,
    ); // 写入新的index.tsx
  }

  /**
   * 生成less样式文件
   */
  writeGlobalLess() {
    const { projectName } = this.config;

    fs.writeFileSync(
      path.join(process.cwd(), 'src', 'global.less'),
      `
     #${projectName} {
       height: 100%;
     }
     `,
    );
  }
}
