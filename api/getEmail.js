const qs = require('querystring');

const data = require('../data.json');

module.exports = async (req, res) => {
  const query = qs.stringify({
    secret: process.env.RECAPTCHA_SECRET,
    response: req.query.recaptcha
  });

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?${query}`,
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
  );
  const body = await response.json();

  if (body.success) {
    res.status(200).end(data.email);
  } else {
    res.status(401).end();
  }
};
