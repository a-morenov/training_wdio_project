import { expect, browser, $ } from "@wdio/globals";
import { pages } from "../../../helpers/pages.js";
import {
  step,
  addSeverity,
  addDescription,
  addLink,
} from "@wdio/allure-reporter";

describe("Cart tests", () => {
  before(async () => {
    await browser.setTimeout({ pageLoad: 10000, implicit: 6000 });
  });

  beforeEach(async () => {
    await step("Open catalog page for smarthones items ", async () => {
      await browser.reloadSession();
      await browser.url(pages.CATALOG);
      await expect(browser).toHaveUrl(
        "https://intershop.skillbox.ru/product-category/catalog/electronics/phones/"
      );
    });
  });

  const itemExpectedName = "OnePlus 8 Pro (китайская версия) 12/256GB, зеленый";
  const itemExpectedPrice = "67542,00₽"; //for 1 item
  const cartExpectedTotal = "270168,00₽"; //for 4 items

  it("User can put item to cart", async () => {
    await addSeverity("Critical"),
      await addDescription(
        "Attempt to putting items into the cart from catalog phones page."
      );
    await addLink(
      "https://intershop.skillbox.ru/product-category/catalog/electronics/phones",
      "Catalog of phones page"
    );

    await step("Select Item", async () => {
      let itemName = await $(".post-69 .collection_title");
      await expect(itemName).toHaveText(itemExpectedName);
    });

    await step("Put item in to cart", async () => {
      let addToCartButton = await $(".price-cart a[href*='add-to-cart=69']");
      await expect(addToCartButton).toBeDisplayed();
      await expect(addToCartButton).toHaveText("В КОРЗИНУ");
      await $(".price-cart a[href*='add-to-cart=69']").click();
      await expect(addToCartButton).not.toBeDisplayed();
    });

    await step("Go to cart", async () => {
      let goToCartButton = await $(".added_to_cart");
      await expect(goToCartButton).toBeDisplayed();
      await expect(goToCartButton).toHaveText("ПОДРОБНЕЕ");
      await $(".added_to_cart").click();

      await expect(browser).toHaveUrl("https://intershop.skillbox.ru/cart/");
      await expect($(".content-inner.clearfix")).toMatchElementSnapshot(
        "cartContainer"
      );

      let actualName = await $("[data-title='Товар']");
      await expect(actualName).toHaveText(itemExpectedName);
      await expect(browser.$("input[value='1']")).toBeDisplayed();
    });
  });

  it("User can delete item in cart", async () => {
    await addSeverity("Normal"),
      await addDescription(
        "Attempt to delete item from cart and see proposal of abort deleating "
      );
    await addLink("https://intershop.skillbox.ru/cart", "Cart page");

    await step("Select item", async () => {
      let item = await $(".post-69");
      await expect(item).toBeDisplayed();
    });

    await step("Add Item to cart", async () => {
      let addToCartButton = $(".price-cart a[href*='add-to-cart=69']");
      await expect(addToCartButton).toBeDisplayed();
      await $(".price-cart a[href*='add-to-cart=69']").click();
      await expect(addToCartButton).not.toBeDisplayed();
    });

    await step("Go to cart", async () => {
      let goToCartButton = await $(".added_to_cart");
      await expect(goToCartButton).toBeDisplayed();
      await $(".added_to_cart").click();

      await expect(browser).toHaveUrl("https://intershop.skillbox.ru/cart/");
    });

    await step("Delete item in cart", async () => {
      let removeFromCartButton = await $("a[class*='remove']");
      await expect(removeFromCartButton).toBeClickable();
      await $(removeFromCartButton).click();
      let emptyCartMessage = await $("p[class*='empty']");
      await emptyCartMessage.waitForDisplayed();
      await expect(emptyCartMessage).toBeDisplayed();
      await emptyCartMessage.waitForStable();
      await expect(emptyCartMessage).toHaveText(
        "Your cart is currently empty."
      );
      let succesDeleateMessage = await $("[class*='woocommerce-message']");
      await succesDeleateMessage.waitForDisplayed();
      await expect(succesDeleateMessage).toHaveText(
        `“${itemExpectedName}” removed. Undo?`
      );
      await expect($(".content-inner.clearfix")).toMatchElementSnapshot(
        "emptyCartBlock"
      );
    });
  });

  it("User can change quanity of items in cart", async () => {
    await addSeverity("Critical"),
      await addDescription("Attempt to change quanity of items in cart.");
    await addLink("https://intershop.skillbox.ru/cart", "Cart page");

    await step("Select item", async () => {
      let item = await $(".post-69");
      await expect(item).toBeDisplayed();
    });

    await step("Add Item to cart", async () => {
      let addToCartButton = $(".price-cart a[href*='add-to-cart=69']");
      await expect(addToCartButton).toBeDisplayed();
      await $(".price-cart a[href*='add-to-cart=69']").click();
      await expect(addToCartButton).not.toBeDisplayed();
    });

    await step("Go to cart", async () => {
      let goToCartButton = await $(".added_to_cart");
      await expect(goToCartButton).toBeDisplayed();
      await $(".added_to_cart").click();
      await expect(browser).toHaveUrl("https://intershop.skillbox.ru/cart/");
    });

    await step("Change quanity of items in cart to 4", async () => {
      let cartQuanityInput = await browser.$(".quantity input");
      await expect(cartQuanityInput).toBeDisplayed();
      await browser.$(cartQuanityInput).click();
      await browser.$(cartQuanityInput).setValue("4");
    });
    await step("Update cart", async () => {
      let cartTotalAmount = $$("[data-title='Общая стоимость'] bdi");
      await expect(cartTotalAmount[0]).toHaveText(itemExpectedPrice);
      await expect(cartTotalAmount[1]).toHaveText(itemExpectedPrice);

      let cartUpdateButton = await browser.$("button[name='update_cart']");
      await expect(cartUpdateButton).toBeDisplayed();
      await browser.$(cartUpdateButton).click();
      await expect(cartUpdateButton).not.toBeClickable();

      await expect(cartTotalAmount[0]).toHaveText(cartExpectedTotal);
      await expect(cartTotalAmount[1]).toHaveText(cartExpectedTotal);
    });
  });

  it("User can back deleted item in cart", async () => {
    await addSeverity("Normal"),
      await addDescription("Attempt to returning item in cart after deleteng ");
    await addLink("https://intershop.skillbox.ru/cart", "Cart page");

    await step("Select item", async () => {
      let item = await $(".post-69");
      await expect(item).toBeDisplayed();
    });

    await step("Add Item to cart", async () => {
      let addToCartButton = $(".price-cart a[href*='add-to-cart=69']");
      await expect(addToCartButton).toBeDisplayed();
      await $(".price-cart a[href*='add-to-cart=69']").click();
      await expect(addToCartButton).not.toBeDisplayed();
    });

    await step("Go to cart", async () => {
      let goToCartButton = await $(".added_to_cart");
      await expect(goToCartButton).toBeDisplayed();
      await $(".added_to_cart").click();
      await expect(browser).toHaveUrl("https://intershop.skillbox.ru/cart/");
    });

    await step("Delete item in cart", async () => {
      let removeFromCartButton = await $("a[class*='remove']");
      await expect(removeFromCartButton).toBeClickable();
      await $(removeFromCartButton).click();
    });

    await step("Return item in cart", async () => {
      let getBackButton = await $(".woocommerce-message").$("a[href]");
      await expect(getBackButton).toBeClickable();
      await $(getBackButton).click();

      let actualName = await $("[data-title='Товар']");
      await expect(actualName).toHaveText(itemExpectedName);

      let cartTotalAmount = $$("[data-title='Общая стоимость'] bdi");
      await expect(cartTotalAmount[0]).toHaveText(itemExpectedPrice);
      await expect(cartTotalAmount[1]).toHaveText(itemExpectedPrice);
    });
  });
});
