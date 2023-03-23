const { default: axios } = require("axios");
var parseString = require("xml2js").parseString;

module.exports = {
  getNews: async (req, res) => {
    let query = req.query.query;

    // console.log(query);

    var config = {
      params: {
        q: query,
        hl: "id",
        gl: "ID",
        ceid: "ID:id",
      },

      host: "news.google.com",
      headers: {
        "Content-Type": "text/xml",
      },
    };
    try {
      await axios
        .get("https://news.google.com/rss/search", config)
        .then((response) => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.log(err);
            }

            var soapBody = result.rss.channel[0];

            // console.log(soapBody);
            return res.status(200).send({ data: soapBody });
          });
        });
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: e.message || e });
    }
  },
};
