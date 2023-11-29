#!/usr/bin/env node
import { program } from 'commander';
import loadPage from '../src/index.js';

program
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action((url, options) => {
    loadPage(url, options.output).then((downloadedFilepath) => {
      console.log(downloadedFilepath);
    });
  });

program.parse();
