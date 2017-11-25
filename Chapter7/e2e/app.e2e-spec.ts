import { SampleTrelloApplicationPage } from './app.po';

describe('sample-trello-application App', () => {
  let page: SampleTrelloApplicationPage;

  beforeEach(() => {
    page = new SampleTrelloApplicationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Boards');
  });
});
