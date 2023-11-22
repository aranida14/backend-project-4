#!/usr/bin/env node
import { program } from 'commander';
import pageLoader from '../src/index.js';

program
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>')
  .option('-o, --output [dir]', 'output dir', '/home/user/current-dir')
  .action((url, options) => {
    pageLoader(url, options.output).then((downloadedFilepath) => {
      console.log(downloadedFilepath);
    });
  });

program.parse();
