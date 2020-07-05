const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const keys = require("./config/dev");
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(keys.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected mongoDB');
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Open port ${PORT}`));