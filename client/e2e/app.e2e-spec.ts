import { AwsStormcloudPage } from './app.po';

describe('aws-stormcloud App', function() {
  let page: AwsStormcloudPage;

  beforeEach(() => {
    page = new AwsStormcloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
