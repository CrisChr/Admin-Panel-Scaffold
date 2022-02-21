#! /usr/bin/env node

import chalk from "chalk";
import path from 'path';
import fs from 'fs';
import figlet from "figlet";
import { promisify } from "util";
import {exec} from 'child_process';
import ProjectTemplate from "./templates/project-template";
import ConfigValidator from './validators/index';
import ListTemplate from "./templates/list-template";
import ConfigTemplate from "./templates/config-template";
import OtherTemplate from "./templates/other-template";
import LocaleTemplate from "./templates/locale-template";
import TypingsTemplate from "./templates/typings-template";
import ServiceTemplate from "./templates/service-template";
import { Command } from 'commander';
const copydir = require('copy-dir');
const readFile = promisify(fs.readFile);
const execCommand = promisify(exec);

  /**
   * 验证配置文件的字段
   * @param config
   */
const validateConfig = async (config: Config) => {
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
  await validateConfig(config);
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

  await generateProject(config);

  console.log(chalk.green('install dependencies...'));
  await execCommand('yarn');

  // console.log(chalk.green('beautify code...'));
  // await execCommand('yarn prettier');
}

/**
 * 生成项目
 * @param config
 */
const generateProject = async (config: Config) => {
  await copydir.sync(path.join(__dirname, '../project-templates/project'), process.cwd());
  console.log(chalk.green('init project...'));
  new ProjectTemplate(config).run();
  new ConfigTemplate(config).run();
  await generagePages(config);
}

/**
 * 生成Pages模板
 * @param config
 */
const generagePages = async (config: Config) => {
  config.pages.forEach((page) => {
    console.log(chalk.green(`start ${(page as ListPage).type} page...`));
    new OtherTemplate(page as ListPage);
    new ListTemplate(page as ListPage).run();
    new ServiceTemplate(page as ListPage).run();
  });
  console.log(chalk.green('extract locale resources...'));
  await new LocaleTemplate(config).run();
  console.log(chalk.green('start extract typings...'));
  await new TypingsTemplate().run();

}

const program = new Command();

program
  .command('new')
  .description('create a new project')
  .option('--c, --config <path>', 'the path of config file')
  .action((args: any)  => {
    run(args.config);
  });

  program.parse();
