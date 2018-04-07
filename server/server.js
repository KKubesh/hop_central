const express = require('express');
const bodyParser = require('body-parser');
const rabRouter = require('./routes/rabbits.router');
const checkRouter = require('./routes/checkin.router');
const newRouter = require('./routes/new.router')
const colonyRouter = require('./routes/colony.router')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('server/public'));

app.use(bodyParser.json());

app.use('/checkin', checkRouter);
app.use('/rabbits', rabRouter);
app.use('/new', newRouter);
app.use('/colony', colonyRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});