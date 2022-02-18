import chalk from "chalk";
import path from 'path';
import fs from 'fs';
import figlet from "figlet";
import { promisify } from "util";
import {exec} from 'child_process';
import ProjectTemplate from "./templates/project-template";
import ConfigValidator from './validators/index';
const {Command} = require('commander');
const copydir = require('copy-dir');
const readFile = promisify(fs.readFile);
const execCommand = promisify(exec);


const program = new Command();

program
  .command('new')
  .description('create a new project')
  .option('--c, --config <path>', 'the path of config file')
  .action((args: any)  => {
    run(args.config);
  })

  /**
   * 验证配置文件的字段
   * @param config
   */
const validateConfig = (config: Config) => {
  return new ConfigValidator(config).run();
}

/**
 * 加载配置文件
 * @param configPath
 * @returns
 */
const loadConfig = async (configPath: string) => {
  let config;
  try {
    const buffer = await readFile(configPath);
    const configObj = configPath.endsWith('js') ? eval(buffer.toString()) : JSON.parse(buffer.toString())
    config = configObj;
  } catch (error) {
    console.log(
      chalk.red('config parse failed, please check your config file')
    );
  }
  validateConfig(config);
  return config;
}

const run = async (configPath: string) => {
  console.log('================================');
  console.log(
    figlet.textSync('igloo Agency', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true
    })
  );
  console.log('================================');

  // 加载配置文件
  const  config = await loadConfig(configPath);

  generateProject(config);

  console.log(chalk.green('install dependencies...'));
  execCommand('yarn');

  console.log(chalk.green('beautify code...'));
  execCommand('yarn prettier');
}

/**
 * 生成项目
 * @param config
 */
const generateProject = (config: Config) => {
  copydir.sync(path.join(__dirname, '../templates/project'), process.cwd());
  console.log(chalk.green('init project...'));
  new ProjectTemplate(config).run();
  generagePages(config);
}

/**
 * 生成Pages模板
 * @param config
 */
const generagePages = (config: Config) => {
  config.pages.forEach((page) => {
    console.log(chalk.green(`start ${(page as ListPage).type} page...`));

  })
}
