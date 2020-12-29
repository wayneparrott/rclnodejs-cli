#!/usr/bin/env node


'use strict';
const { Command } = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');
const PkgCreator = require('./package-creation-tool/lib/package_creator.js');


function main() {
  console.log(
    chalk.yellow(
      figlet.textSync('rclnodejs')
    )
  );

  let cli = new Command('rclnodejs');
  cli
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .usage('[command] [options]');

  let pkgCreator = new PkgCreator();
  pkgCreator.configureCli(cli);
 
  cli.parse(process.argv);
}



main();



