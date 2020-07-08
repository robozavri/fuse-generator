  'use strict';

const { Bitbucket } = require('bitbucket');
var shellColors = require('colors/safe');
const inquirer = require('./inquirer');

const lucyWorkspace = 'lucy-dev';
let bitbucket;

module.exports = {
  setupCredentials,
  createRemoteRepo,
};

async function setupCredentials() {
  const credentials = await inquirer.askBitbucketCredentials();
  bitbucket = new Bitbucket({
    auth: credentials,
  });
}

async function createRemoteRepo({ projectName }) {
  console.log(shellColors.black.bold('Bitbucket: creating remote repository...'));

  const { data: remoteRepoData } = await bitbucket.repositories.create({
    _body: { name: projectName, scm: 'git', is_private: true },
    repo_slug: projectName,
    workspace: lucyWorkspace,
  });

  const filteredCloneLinks = remoteRepoData.links.clone.filter((linkObj) => linkObj.name === 'ssh');
  const sshUrl = filteredCloneLinks[0].href;

  console.log(shellColors.green.bold('Bitbucket: remote repository created.'));

  return sshUrl;
}



