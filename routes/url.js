const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url');

const Url = require('../models/url');

let router = express.Router();

const baseUrl = process.env.SHORTENER_BASE_URL;

router.post('/', async (req, res) => {
  const sourceUrl = req.body.sourceUrl;
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Internal error. Please come back later.");
  }

  const code = shortid.generate();

  if(validUrl.isUri(sourceUrl)) {
    try {
      let url = await Url.findOne({sourceUrl : sourceUrl});
      if (url) {
        return res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + code;
        url = new Url({
          code,
          sourceUrl,
          shortUrl,
          accessCount: 0
        });

        await url.save();
        return res.status(201).json(url);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json("Internal Server error " + err.message);
    }
  } else {
    res.status(400).json("Invalid URL. Please enter a valid url for shortening.");
  }
});

// router.get('/', (req, res) => res.json('GG2'));

router.get('/:shortUrl', async (req, res) => {
  var shortUrlCode = req.params.shortUrl;
  var url = await Url.findOne({ code: shortUrlCode });

  try {
    if (url) {
      var clickCount = url.accessCount;
      clickCount++;
      res.redirect(url.sourceUrl);
      await url.update({ accessCount });
    } else {
      res.status(400).json('The short url doesn`t exists in our system.');
    }
  } catch(err) {
    console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
    res.status(500).json("Internal error.");
  }
});

module.exports = router;