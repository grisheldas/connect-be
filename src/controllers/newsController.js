const { default: axios } = require("axios");
var parseString = require("xml2js").parseString;
var processors = require("xml2js").processors;

module.exports = {
  getNews: async (req, res) => {
    let { type } = req.query;

    var config = {
      host: "news.google.com",
      headers: {
        "Content-Type": "text/xml",
      },
    };
    try {
      await axios
        .get(
          "https://news.google.com/rss/search?q=Industri+Mekanik+Elektrik&hl=id&gl=ID&ceid=ID:id",
          config
        )
        .then((response) => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.log(err);
            }

            var soapBody = result.rss.channel[0];

            // if (soapBody.$) {
            //   delete soapBody.$;
            // }
            console.log(soapBody);
            return res.status(200).send({ data: soapBody });
          });
        });

      // var data = response.data.toString().replace("\ufeff", "");
      // let parse = parseString(
      //   response.data,
      //   { explicitArray: false, tagNameProcessors: [processors.stripPrefix] },
      //   (err, res) => {
      //     if (err) {
      //       console.error(err);
      //       return;
      //     }

      //     return res;
      //   }
      // );
      // return res.status(200).send(parse);
      // console.log(parse);
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: e.message || e });
    }
  },
};
