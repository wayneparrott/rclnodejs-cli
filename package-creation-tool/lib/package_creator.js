'use strict';

const {
  exec
} = require('child_process');
const path = require('path');

class PkgCreator {

  configureCli(cli) {
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
      .action((package_name, options) => {
        this.createPackage(package_name, options)
      });
  }

  createPackage(package_name, options) {
    let cmd = this._createExecCmd(package_name, options);
    console.log('cmd:', cmd);
    this._runCmd(cmd);
  }

  _createExecCmd(package_name, options) {
    console.log('os:', process.platform);

    let isWin = process.platform === "win32";
    let script = isWin ? 'create_ros_nodejs_pkg.bat' : 'create_ros_nodejs_pkg.sh';

    let cmd = path.join(__dirname, '..', 'scripts', script);
    cmd += ` ${package_name}`;

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

  _runCmd(cmd) {
    const child = exec(cmd);
    child.stdout.on('data', (data) => {
      console.log(data);
    });
    child.stderr.on('err', (data) => {
      console.warn(data);
    });
  }

}

module.exports = PkgCreator;


// let rclnodejsCmd = cli.command('rclnodejs');
// rclnodejsCmd
//   .usage('<command> [options...]')
//   .description('Execute a rclnodejs utility tool.')