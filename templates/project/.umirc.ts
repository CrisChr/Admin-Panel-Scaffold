import { defineConfig } from 'umi';
import theme from 'iglootheme';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  qiankun: {
    slave: {},
  },
  theme,
  dva: {},
  title: `Admin Panel ${process.env.PROJECT_NAME}`,
  plugins: [
    './plugins/clean.js',
    './plugins/moveFiles.js',
  ],
  publicPath: `/static/${process.env.PROJECT_NAME}/`,
  outputPath: `/build/static/${process.env.PROJECT_NAME}/`,
  mountElementId: process.env.PROJECT_NAME,
});
