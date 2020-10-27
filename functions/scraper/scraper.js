// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const cheerio = require("cheerio");
const fetch = require("node-fetch").default;

const toArray = (data) => {
  const array = [];
  for (let i = 0; i < data.length; i++) {
    array.push(data[i].children.map((textNode) => textNode.data)[0]);
  }
  return array;
};

const scapeValdemarsro = (url) => {
  return fetch(url)
    .then((resp) => resp.text())
    .then((body) => cheerio.load(body)("li", ".ingredientlist"))
    .then(toArray);
};

exports.handler = async (event) => {
  try {
    const url = JSON.parse(event.body).url || "";
    if (!url) {
      return { statusCode: 400, body: "Please supply a URL" };
    }
    if (!url.includes("valdemarsro.dk")) {
      return { statusCode: 400, body: 'URL must be from "valdemarsro.dk"' };
    }
    const ingredients = (await scapeValdemarsro(url)) || [];
    return {
      statusCode: 200,
      body: JSON.stringify({ ingredients }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
