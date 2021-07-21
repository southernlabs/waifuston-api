const express = require("express");
require('dotenv').config()

const app = express();

const docs = __dirname + '/docs/'
app.use('/docs',express.static(docs));

const routes = require("./routes");
app.use(routes);

app.get("/", (req, res)=>{
  res.redirect('/docs')
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});