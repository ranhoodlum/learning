const express = require("express");
const app = express();
const { query, validationResult, matchedData } = require("express-validator");

// encode the incoming http requests and put them in req.body
// this means parsing (using javascript to parse)
app.use(express.json());

// notEmpty is the validator that validates "person" query to
// not be empty
// and sanitize it by escaping the html tags with others that
// can be represented as text.
app.get("/hello", query("person").notEmpty().escape(), (req, res) => {
  // result of applying validation middlewares defined so
  // far in the middleware chain
  //
  // the validations are wrapped in a result object
  const result = validationResult(req);

  // result provides many methods, one of which is `isEmpty`
  // that tells if the result has any errors, or is empty?
  if (result.isEmpty()) {
    // returns all the data that has been matched (validated
    // and sanitized) wrapped into an object.
    const data = matchedData(req);

    // not safe because this needs to be parsed (meaning
    // running javascript) and html code could be injected
    // which will run during parsing in your app (vulnerable)
    //
    // safe after using validators
    res.send(`Hello, ${data.person}`);
  }

  // create an array of the results and send that
  // instead of the object. (run it without the array())
  // method to know what happens.
  res.send({ errors: result.array() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
