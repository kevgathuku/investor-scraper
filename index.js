const puppeteer = require("puppeteer");

(async (symbol) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //   Execute Google search for the provided company
  await page.goto(`https://google.com/search?q=${symbol} investor relations`);

  //   await page.screenshot({ path: `tmp/${symbol}.png` });

  const resultsSelector = ".g a";

  const links = await page.evaluate((resultsSelector) => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map((anchor) => {
      const link = anchor.href;
      return link;
    });
  }, resultsSelector);

  console.log("First result", links[0]);

  await browser.close();
})("Centum");
