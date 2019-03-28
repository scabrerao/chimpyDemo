/**
 * `Step definitions for getAllFilesGitHub feature
 */

const world = require('./worldMap.js');
const logger = require('../../utils/logUtils.js');


const repoHomePage = require('../../pages/repoHomePage.js');
module.exports = function getAllFilesGitHubStepDefinition() {
  this.Given(/^a git url "([^"]*)"$/, { timeout: 5000 }, function openGitUrl(gitUrl) {
    this.set(world.gitUrl, gitUrl);
    repoHomePage.open(gitUrl);
  });

  this.When(/^page was loaded$/, { timeout: 5000 }, function repoPageLoaded() {
    repoHomePage.waitUntilLoaded();
  });

  this.Then(/^repository exists$/, { timeout: 5000 }, function repoExists() {
    repoHomePage.repositoryExists();
  });

  this.Then(/^repository is not empty$/, { timeout: 5000 }, function repoNotEmpty() {
    expect(repoHomePage.numOfItems() > 0).toBeTruthy();
  });

  this.When(/^repository has files return all file names$/, { timeout: 600000 }, function getFileNames() {
    const allFileNames = repoHomePage.getFileNames(this.get(world.gitUrl));
    expect(allFileNames.length > 0).toBeTruthy();
  });
};
