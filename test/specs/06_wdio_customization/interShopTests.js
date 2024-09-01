import { expect, browser, $ } from "@wdio/globals";
import { pages } from "../../../helpers/pages.js";
import {
  step,
  addSeverity,
  addDescription,
  addLink,
} from "@wdio/allure-reporter";

describe.only("Custom WDIO func tests", () => {
  beforeEach(async () => {
    await step("Open main page", async () => {
      await browser.reloadSession();
      await browser.url(pages.MAIN, false);
      
      await expect(browser).toHaveUrl("https://intershop.skillbox.ru/");
    });
  });

  it("catalog item search tests", async () => {
    await addSeverity("Critical"), await addDescription("Attemt new locator strategy");
    await addLink("", "");

    await step("Find Catalog menu and move to", async () => {
  
    await browser.moveToCategory('Электроника', true)

    await expect(browser).toHaveUrl('https://intershop.skillbox.ru/product-category/catalog/electronics/')
    
     
    });

    await step("", async () => {});
  });
});
