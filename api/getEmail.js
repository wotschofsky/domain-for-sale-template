const qs = require('querystring');
const axios = require('axios');

const data = require('../data.json');

module.exports = async (req, res) => {
  const query = qs.stringify({
    secret: process.env.RECAPTCHA_SECRET,
    response: req.query.recaptcha
  });

  const response = await axios.get(
    `https://www.google.com/recaptcha/api/siteverify?${query}`,
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
  );

  if (response.data.success) {
    res.status(200).end(data.email);
  } else {
    res.status(401).end();
  }
};
