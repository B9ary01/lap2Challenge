const app = require("./server");

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send(' Welcome to the Post App!'))

app.listen(port, () => console.log(`listening to port -  ${port}`))