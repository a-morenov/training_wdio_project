import { expect, browser, $ } from "@wdio/globals";
import {
  step,
  addSeverity,
  addDescription,
  addLink,
} from "@wdio/allure-reporter";

describe("Calendar tests", () => {
  const pages = {
    DATES:
      "/react-dates/iframe.html?id=drp-input-props--reopens-daypicker-on-clear-dates",
  };
  const startDate = "05/30/2024";
  const endDate = "06/30/2024";

  beforeEach(async () => {
    await step("Open calendar", async () => {
      await browser.reloadSession();
      await browser.url(pages.DATES);
    });
  });

  it("User can enter dates", async () => {
    await addSeverity("Normal"),
      await addDescription(
        "Attemp to dates in component after input is correct"
      );
    await addLink(
      "https://react-dates.github.io/react-dates/iframe.html?id=drp-input-props--reopens-daypicker-on-clear-dates",
      "React dates component"
    );

    await step("Enter dates in Start date and End date inputs", async () => {
      let startDateInput = await $("input#startDate");
      await startDateInput.waitForDisplayed();
      await startDateInput.click();
      await startDateInput.setValue(startDate);
      await expect($("input[value='05/30/2024']")).toBeDisplayed();

      let endDateInput = await $("input#endDate");
      await endDateInput.waitForDisplayed();
      await endDateInput.click();
      await endDateInput.setValue(endDate);
      await expect($("input[value='06/30/2024']")).toBeDisplayed();
      await $("div[style*='background']").click();
      await endDateInput.click();
      await expect(
        $("td[aria-label='Selected as start date. Thursday, May 30, 2024']")
      ).toBeDisplayed();
      await expect(
        $("td[aria-label='Selected as end date. Sunday, June 30, 2024']")
      ).toBeDisplayed();
    });
  });
  it("User can choose dates", async () => {
    await addSeverity("Critical"),
      await addDescription(
        "Attemp to dates in component after choosing is correct"
      );
    await addLink(
      "https://react-dates.github.io/react-dates/iframe.html?id=drp-input-props--reopens-daypicker-on-clear-dates",
      "React dates component"
    );

    await step("Choose start date by mouse", async () => {
      let startDateInput = await $("input#startDate");
      await startDateInput.waitForDisplayed();
      await startDateInput.click({ button: "left" });
      await $("div[aria-roledescription*='datepicker']").waitForDisplayed();
      await expect(
        $("div[aria-roledescription*='datepicker']")
      ).toBeDisplayed();
    });

    await step("Choose one week interval via End date by mouse", async () => {
      let startDate = await $("td[aria-label*='May 30, 2024']");
      await startDate.click();
      let endDate = await $("td[aria-label*='June 5, 2024']");
      await endDate.click();
      await expect(
        $("div[aria-roledescription*='datepicker']")
      ).not.toBeDisplayed();
      await expect($("input[value='05/30/2024']")).toBeDisplayed();
      await expect($("input[value='06/05/2024']")).toBeDisplayed();
    });
  });
  it("User can enter dates from keyboard", async () => {
    await addSeverity("Normal"),
      await addDescription(
        "Attemp to dates in component after input from keyboard is correct"
      );
    await addLink(
      "https://react-dates.github.io/react-dates/iframe.html?id=drp-input-props--reopens-daypicker-on-clear-dates",
      "React dates component"
    );

    await step("Click to start date", async () => {
      let startDateInput = await $("input#startDate");
      await startDateInput.waitForDisplayed();
      await startDateInput.click();
      await $("div[aria-roledescription*='datepicker']").waitForDisplayed();
      await expect(
        $("div[aria-roledescription*='datepicker']")
      ).toBeDisplayed();
    });

    await step("Enter dates via keyboard", async () => {
      await browser.keys(["ArrowDown"]), await browser.pause(500);
      await browser.keys(["ArrowRight"]);
      await browser.pause(500);
      await browser.keys(["ArrowRight"]);
      await browser.pause(500);
      await browser.keys(["Enter"]);
      await browser.pause(500);

      await browser.keys(["ArrowDown"]), await browser.pause(500);
      await browser.keys(["ArrowRight"]);
      await browser.pause(500);
      await browser.keys(["ArrowRight"]);
      await browser.pause(500);
      await browser.keys(["Enter"]);
      await browser.pause(500);

      await expect(
        $("div[aria-roledescription*='datepicker']")
      ).not.toBeDisplayed();
      await expect($("input[value='05/31/2024']")).toBeDisplayed();
      await expect($("input[value='06/07/2024']")).toBeDisplayed();
    });
  });
  it("User can hide calendar", async () => {
    await addSeverity("Normal"),
      await addDescription(
        "Attempt to hidding calendar after click on overlay"
      );
    await addLink(
      "https://react-dates.github.io/react-dates/iframe.html?id=drp-input-props--reopens-daypicker-on-clear-dates",
      "React dates component"
    );

    await step("Click to start date", async () => {
      let startDateInput = await $("input#startDate");
      await startDateInput.waitForDisplayed();
      await startDateInput.click();
      await $("div[aria-roledescription*='datepicker']").waitForDisplayed();
      await expect(
        $("div[aria-roledescription*='datepicker']")
      ).toBeDisplayed();
    });

    await step("Сlick on overlay", async () => {
      await $("input#startDate").click({ x: 100, y: 100 });
    });
  });
});
