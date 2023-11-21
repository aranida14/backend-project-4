#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>')
  .option('-o, --output [dir]', 'output dir', '/home/user/current-dir')
  .action((url, options) => {
  });

program.parse();
