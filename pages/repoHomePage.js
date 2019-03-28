/**
 * POM for repository page
 */

const logger = require('../utils/logUtils.js');


// selectors
const pageWrapperSelector = '.application-main';
const errorPageWrapperSelector = '.js-plaxify';
const page = '.application-main';
const itemContainer = 'tbody';
const repoElements = 'tbody>[class="js-navigation-item"]';
const iconFileX = '.icon [class="octicon octicon-file"]';
const contentX = ' .content a';
const icoFile = '[aria-label="directory"]';
const icoFolder = '[aria-label="directory"]';

let gitFileNames = [];
let gitFoldersUrl = [];

class repoHomePage {
  static open(gitUrl) {
    browser.url(gitUrl);
    browser.pause(250);
    this.waitUntilLoaded();
  }

  static isActive() {
    return browser.isVisible(pageWrapperSelector);
  }

  static isError() {
    return browser.isVisible(errorPageWrapperSelector);
  }

  static waitUntilLoaded(){
    browser.waitUntil(
      () => (browser.isVisible(page) && browser.isVisible(repoElements)),
      5000,
      `Elements: "${page}: ${browser.isVisible(page)}"; "${repoElements}:${browser.isVisible(repoElements)}";still not visible after 5000 ms`);
    return true;
  }

  static repositoryExists() {
    browser.waitUntil(
      () => this.isActive() || this.isError(),
      5000,
      logger.errStr('Repository not exists'));

    return this.isActive();
  }

  static items() {
    return browser.elements(repoElements);
  }

  static numOfItems() {
    return browser.elements(repoElements).value.length;
  }

  static getAllFileNames(url) {
    this.open(url);

    const items = this.items().value;
    items.map((itemSelector) => {
      let icoItem = browser.elementIdElement(itemSelector.value.ELEMENT, iconFileX);
      let itemId = browser.elementIdElement(itemSelector.value.ELEMENT, contentX);
      if (icoItem.status === 0 || icoItem._status === 0) {
        let fileName = browser.elementIdText(itemId.value.ELEMENT).value;
        gitFileNames.push(fileName);
      } else {
        let folderUrl = browser.elementIdAttribute(itemId.value.ELEMENT, 'href').value;
        gitFoldersUrl.push(folderUrl);
      }
    });
  }

  static getFileNames(url) {
    let page = 0;
    gitFoldersUrl.push(`${url}`);
    while (page <= gitFoldersUrl.length) {
      this.getAllFileNames(gitFoldersUrl[page]);
      page += 1;
    }
    logger.data(" gitFileNames " + gitFileNames);
    logger.data("total folders: " + gitFoldersUrl.length)
    logger.data("total files: " + gitFileNames.length);
    return gitFileNames;
  }
}

module.exports = repoHomePage;
