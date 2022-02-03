const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

exports.handler = async function (event) {
  const browser = await puppeteer.launch({
    // Required
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const symbol = event.queryStringParameters.symbol;

  //   Execute Google search for the provided company
  await page.goto(`https://google.com/search?q=${symbol} investor relations`);

  const resultsSelector = ".g a";

  const links = await page.evaluate((resultsSelector) => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));

    return anchors
      .map((anchor) => {
        const link = anchor.href;
        return link;
      })
      .filter(
        (link) =>
          !link.startsWith("https://www.google.com/search?q") &&
          !link.startsWith("https://translate.google.com/translate?hl") &&
          !link.startsWith("https://webcache.googleusercontent.com/search?q") &&
          !link.startsWith("http://webcache.googleusercontent.com/search?q")
      );
  }, resultsSelector);

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      top_result: links[0],
      all_results: links,
    }),
  };
};
