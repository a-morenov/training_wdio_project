export default class CatalogNavigationService {
  constructor(options) {
    this.options = options;
  }

  async before() {
    await browser.addLocatorStrategy(
      "catalog_item",
      async ({ categoryName }) => {
        return document
          .evaluate(
            `//*[contains(text(), ${categoryName})]`, //Вот тут надо переписать селектор, текущий находит только первый элемент меню, надо найти правильное xpath выражение поиска по тексту и проверить с разным текстом
            document,
            null,
            XPathResult.ANY_TYPE,
            null
          )
          .iterateNext();
      }
    );
    await browser.addCommand(
      "moveToCategory",
      async ({ categoryName }, click = false) => {
        const menu = await browser.custom$("catalog_item", "Каталог");
        await menu.moveTo();
        await browser.debug()
        
        const category = await browser.custom$(
          "catalog_item",
          `${categoryName}`
        );
        await (await browser.$(category)).waitForDisplayed();
        await category.moveTo();
           
        if (click) {
          await category.click();
        }
      }
    );
  }
}
