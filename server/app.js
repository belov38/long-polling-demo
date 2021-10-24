const express = require('express');

const app = express();
const events = require('events');
const cors = require('cors');

const port = 3000;
const hostname = '0.0.0.0';

const emitter = new events.EventEmitter();
app.use(express.json());
app.use(cors());

app.get('/msg', (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  });
});

app.post('/newmsg', (req, res) => {
  const message = req.body;
  message.at = Date.now();
  message.from = req.ip;
  emitter.emit('newMessage', message);
  console.log('New message:', message);
  res.status(200).send();
});

app.listen(port, hostname, () => {
  console.log(`Example app listening at ${hostname}:${port}`);
});
