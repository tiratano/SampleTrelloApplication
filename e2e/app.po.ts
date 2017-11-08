import { browser, by, element } from 'protractor';

export class SampleTrelloApplicationPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('h2')).getText();
  }

}
