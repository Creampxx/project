import { ProjectVCPage } from './app.po';

describe('project-vc App', function() {
  let page: ProjectVCPage;

  beforeEach(() => {
    page = new ProjectVCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
