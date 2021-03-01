const {API_KEY} = process.env.API_KEY || require('./apiKey')

const validateApiKey = (req, res, next) => {
  let reqKey = req.get('api_key');
  if (reqKey !== API_KEY) {
    return res.status(400).send('Invalid API key!');
  }
  next();
}

module.exports = validateApiKey;
