'use strict';

const inquirer = require('./lib/inquirer');
const bitbucketHelper = require('./lib/bitbucket');
const local = require('./lib/local');

async function run() {
  try {
    const projectConfig = await inquirer.askProjectConfig();
    await bitbucketHelper.setupCredentials();
    const repoSshUrl = await bitbucketHelper.createRemoteRepo(projectConfig);
    local.createLocalAndSyncToRemote({ ...projectConfig, repoSshUrl });
  } catch (e) {
    console.log('ERROR', e);
  }
}

run();