import { NewdemosPage } from './app.po';

describe('newdemos App', function() {
  let page: NewdemosPage;

  beforeEach(() => {
    page = new NewdemosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
