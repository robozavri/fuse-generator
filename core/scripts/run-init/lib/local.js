'use strict';

const shelljs = require('shelljs');
const git = require('simple-git/promise')();
var shellColors = require('colors/safe');


module.exports = {
  createLocalAndSyncToRemote,
};

async function createLocalAndSyncToRemote({ projectName, repoSshUrl }) {
  console.log(shellColors.black.bold(`Local: creating local ${projectName} directory from core...`));

  shelljs.cd('../');
  shelljs.cp('-R', './core', `./${projectName}`);

  shelljs.cd(`./${projectName}`);

  console.log(shellColors.green.bold(`Local: local ${projectName} directory created.`));
  console.log(shellColors.black.bold(`Local: initializing local .git directory, pushing to remote...`));

  shelljs.rm('-rf', `.git`);
  const projectDir = shelljs.pwd().stdout;

  
  git.cwd(`${projectDir}`)
    .then(git.init())
    .then(git.add(`./*`))
    .then(git.commit('[chore][project]: init project'))
    .then(git.addRemote('origin', repoSshUrl))
    .then(git.push(['-u', 'origin', 'master']))
    .then(() => console.log(shellColors.green.bold(`Local: .git directory initialized, pushed to remote.`)))
    .catch(() => console.log(shellColors.red.bold(`Local: .git directory initialization failed.`)));
}