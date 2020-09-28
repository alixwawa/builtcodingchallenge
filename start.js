// start.js
const app = require("./server.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});