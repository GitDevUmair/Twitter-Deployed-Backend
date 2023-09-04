const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tweets", require("./routes/tweet"));
app.use("/api/relationship", require("./routes/relationship"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/searchusers", require("./routes/search"));
app.use("/api/newsfeed", require("./routes/newsfeed"));

app.listen(PORT, () => {
  console.log(`Twitter backend listening at http://localhost:${PORT}`);
});
