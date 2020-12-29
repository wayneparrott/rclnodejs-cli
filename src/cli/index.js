#!/usr/bin/env node


'use strict';
const { Command } = require('commander');
const { exec } = require('child_process');
const path = require('path');
const figlet = require('figlet');
const chalk = require('chalk');

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

  // let rclnodejsCmd = cli.command('rclnodejs');
  // rclnodejsCmd
  //   .usage('<command> [options...]')
  //   .description('Execute a rclnodejs utility tool.')

  let createPkgCmd = cli.command('create-package <package-name>');
  createPkgCmd
    .usage('create-package <package_name> [options...]')
    .description('Create a ROS2 package for Nodejs development.')
    .option('--description <description>', 'The description given in the package.xml')
    .option('--destination-directory <directory_path>', 'Directory where to create the package directory')
    .option('--license <license>', 'The license attached to this package')
    .option('--maintainer-email <email>', 'email address of the maintainer of this package')
    .option('--maintainer-name <name>', 'name of the maintainer of this package')
    .option('--typescript', 'Configure as a TypeScript Node.js project')
    .option('--no-init', 'Do not run "npm init"')
    .option('--dependencies <ros_packages...>', 'list of ROS dependencies')
    .action((package_name, cmd) => {
      let execCmd = createExecCmd(package_name, cmd);
      //console.log(execCmd);
      runCmd(execCmd);
    });
  
  cli.parse(process.argv);
}

function createExecCmd(rosPkg, options) {
  // console.log('options', options.typescript);

  let cmd = path.join(__dirname, 'scripts', 'create_ros_nodejs_project.sh');
  cmd += ` ${rosPkg}`;

  if (options.description) {
    cmd += ` --description \"${options.description}\"`;
  }

  if (options.destinationDirectory) {
    cmd += ` --destination-directory \"${options.destinationDirectory}\"`;
  }

  if (options.license) {
    cmd += ` --license \"${options.license}\"`;
  }

  if (options.maintainerEmail) {
    cmd += ` --maintainer-email \"${options.maintainerEmail}\"`;
  }

  if (options.maintainerName) {
    cmd += ` --maintainer-name \"${options.maintainerName}\"`;
  }

  if (options.typescript) {
    cmd += ' --typescript';
  }

  if (options.dependencies) {
    cmd += ` --dependencies ${options.dependencies}`;
  }

  return cmd;
}

function runCmd(cmd) {
  const child = exec(cmd);
  child.stdout.on('data', (data) => {
    console.log(data);
  });
  child.stderr.on('err', (data) => {
    console.warn(data);
  });
}

main();



