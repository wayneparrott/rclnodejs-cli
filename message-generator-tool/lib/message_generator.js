'use strict';

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const process = require('process');

class MsgGenerator {

  configureCli(cli) {
    let createPkgCmd = cli.command('generate-ros-messages');
    createPkgCmd
      .description('Generate JavaScript code from ROS2 IDL interfaces')
      //.option('-d <directory_path>', 'Directory where to create the package directory')
      .action((options) => {
        this.generateMessages()
      });
  }

  generateMessages() {
    // confirm rclnodejs package 
    let node_modules = path.join(process.cwd(), 'node_modules');
    if (!fs.existsSync(node_modules)) {
      console.error('Error: unable to locate node_modules directory.\n' +
                    'The current directory does not appear to be an initialized Nodejs package.');
      process.exit(-1);
    }

    let generate_messages = path.join(node_modules, '.bin', 'generate-ros-messages');
    if (!fs.existsSync(generate_messages)) {
      console.error('Error: unable to identify rclnodejs as a package dependency');
      process.exit(-1);
    }

    let cmd = generate_messages;

    const child = exec(cmd);
    child.stdout.on('data', (data) => {
      console.log(data);
    });
    child.stderr.on('err', (data) => {
      console.warn(data);
    });
  }

}

module.exports = MsgGenerator;
