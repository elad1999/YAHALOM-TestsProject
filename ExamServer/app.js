const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Urls = require("./settings/staticUrls");
const questionRouter = require('./routes/questionRoutes');
const testRouter = require('./routes/testRoutes');

app.use(cors());

app.listen(Urls.serverPort, () =>
  console.log(`Exams server running at ${Urls.serverDomain}:${Urls.serverPort}`)
);

app.use(bodyParser.json());

app.use("/api/Questions", questionRouter);
app.use("/api/Tests", testRouter);
