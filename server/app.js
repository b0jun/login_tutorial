const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jwtMiddleware = require('./src/lib/jwtMiddleware');

const app = express();
const PORT = 5000;

app.set('PORT', PORT);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use(jwtMiddleware);
app.use('/api', require('./src/api'));

app.listen(5000, () => {
  console.log(`listening on ${app.settings.PORT}`);
});
