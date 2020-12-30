# rclnodejs-cli
Standalone commandline tools and `ros2 cli` extensions for use with the ROS2 [rclnodejs]() client library.

## Prerequisites
* ROS2 Foxy or greater installed
* Node.js version 12 or 13
* npm or yarn package manager
* **A shell environment that includes ROS2.** See [Configuring a ROS2 Environment](https://index.ros.org/doc/ros2/Tutorials/Configuring-ROS2-Environment/) for more info.

## Installation
Install the `rclnodejs-cli` package globally.

Note: Your shell environment should include ROS2. 

```
> npm install -g rclnodejs-cli
or
> yarn global add rclnodejs-cli
```

### Optional
You can extend the `ros2` cli with additional commands and options from this package by sourcing the `install/setup.[bat,bash,ps1,sh] file.

On Linux run:
```
> source <rclnodejs-cli-dir>/install/setup.bash
```
On Windows run:
```
> <rclnodejs-cli-dir>\install\setup.bat
or
> <rclnodejs-cli-dir>\install\setup.ps1
```

For more information on using an rclnodejs-cli tool from the `ros2` cli see the references to tool/command user-guides below. 


## Usage
List available commands.
```
> rclnodejs -h

           _                 _       _
  _ __ ___| |_ __   ___   __| | ___ (_)___
 | '__/ __| | '_ \ / _ \ / _` |/ _ \| / __|
 | | | (__| | | | | (_) | (_| |  __/| \__ \
 |_|  \___|_|_| |_|\___/ \__,_|\___|/ |___/
                                  |__/
Usage: rclnodejs [command] [options]
    
Options:
  -h, --help                               display help for command

Commands:
  create-package [options] <package-name>  Create a ROS2 package for Nodejs development.
  generate-ros-messages                    Generate JavaScript code from ROS2 IDL interfaces
  help [command]                           display help for command

```

List a subcommmand details.
```
> rclnodejs <subcommand> -h
```
Example
```
> rclnodejs create-package -h
```

## create-package command
[Learn about the create-package tool](package-creation-tool/README.md).

## generate-ros-messages command
[Learn about the generate-ros-messages tool](message-generator-tool/README.md).

## Contributors
[Wayne Parrott](https://github.com/wayneparrott)
