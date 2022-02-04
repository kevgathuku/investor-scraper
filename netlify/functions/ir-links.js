require("dotenv").config();

const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);

function googleSearch(symbol) {
  // Execute Google search for the provided sybmol / company name
  return new Promise((resolve, reject) => {
    search.json(
      {
        q: `${symbol} investor relations`,
      },
      (result) => {
        if (result.search_metadata.status === "Success") {
          resolve(result);
        } else {
          reject(new Error(result.search_metadata.status));
        }
      }
    );
  });
}

exports.handler = async function (event) {
  const symbol = event.queryStringParameters.symbol;

  try {
    const response = await googleSearch(symbol);
    return {
      statusCode: 200,
      body: JSON.stringify(response.organic_results.map(result => result.link)),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error }),
    };
  }
};
