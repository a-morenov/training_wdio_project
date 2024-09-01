import { expect, browser, $ } from "@wdio/globals";
import { pages } from "../../../helpers/pages.js";
import {
  step,
  addSeverity,
  addDescription,
  addLink,
} from "@wdio/allure-reporter";

describe("Navigation tests", () => {
  before(async () => {
    await browser.setTimeout({ pageLoad: 10000, implicit: 6000 });
  });

  beforeEach(async () => {
    await step("Open main page ", async () => {
      await browser.reloadSession();
      await browser.url(pages.MAIN);
    });
  });

  it("User can select and open electronic catalog ", async () => {
    await addSeverity("Critical"),
      await addDescription(
        "Attempt to opening electronic catalog from dropdown menu on main."
      );
    await addLink(
      "https://intershop.skillbox.ru/product-category/catalog/electronics/",
      "Catalog of electronic page"
    );

    await step("Select Electronic catalog item", async () => {
      const catalog = await $("#menu-item-46");
      await catalog.waitForDisplayed();

      // Передвигаем курсор к каталогу
      await catalog.moveTo();

      // Находим раздел 'Электроника' и дожидаемся, когда он будет отображен
      const electronic = await $("#menu-item-47");
      await electronic.waitForDisplayed();

      // Передвигаем курсор к 'Электроника'
      await electronic.moveTo();

      // Выбираем подраздел 'Планшеты', дожидаемся когда он будет отображен,
      // и кликаем на него.
      const tablets = await $("#menu-item-116");
      await tablets.waitForDisplayed();
      await tablets.click();

      await expect(browser).toHaveUrl(
        "https://intershop.skillbox.ru/product-category/catalog/electronics/pad/"
      );
    });
  });
});
