'use strict';

const inquirer = require('inquirer');

module.exports = {
  askBitbucketCredentials,
  askProjectConfig,
};

function askBitbucketCredentials() {
  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Bitbucket username or e-mail address:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address.';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password.';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

function askProjectConfig() {
  const questions = [
    {
      name: 'projectName',
      type: 'input',
      message: 'Enter project name:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter project name';
        }
      }
    },
  ];
  return inquirer.prompt(questions);
}