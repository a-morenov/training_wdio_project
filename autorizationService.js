export default class AutorizationService {
  constructor(options) {
    this.options = options;
  }
  async before() {
    await browser.overwriteCommand(
      "url",
      async (originUrlFunk, url, withAutorize = false) => {
        await originUrlFunk(url);
        if (withAutorize) {
          await browser.setCookies({
            name: options.name,
            value: options.value
          });
          await browser.refresh();
        }
      }
    );
  }
}
