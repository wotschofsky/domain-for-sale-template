const qs = require('querystring');
const Mustache = require('mustache');
const fs = require('node:fs/promises');

const data = require('../data.json');

let template = null;

module.exports = async (req, res) => {
  const domainName = req.headers.host;

  if (!template) {
    template = await fs.readFile('./templates/index.mustache', {
      encoding: 'utf8'
    });
    Mustache.parse(template);
  }

  let price;
  if (!data.domains[domainName]) {
    price = 'Unavailable';
  } else {
    price = data.domains[domainName].price;
  }

  const output = Mustache.render(template, {
    domainName,
    price,
    recaptchaSitekey: process.env.RECAPTCHA_SITEKEY
  });

  res.end(output);
};
