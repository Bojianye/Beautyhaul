import { MakeupPage } from './app.po';

describe('makeup App', () => {
  let page: MakeupPage;

  beforeEach(() => {
    page = new MakeupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
