// INICIO
const port = process.env.PORT || 3000;

const {inicio} = require("./src/index");

const app = inicio(port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
