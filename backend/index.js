const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = require('./router.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/public', express.static(__dirname + '/public'));

app.use('/api', router);


app.listen(5000, () => {
  console.log('Server is up on port ', 5000);
})