const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////


module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    res.end(messageQueue.dequeue());
    // let commands = ['up', 'down', 'left', 'right'];
    // let randomNum = Math.floor(Math.random() * (4));
    // res.end(commands[randomNum]);

  } else {
    res.end();
  };

  next();// invoke next() at the end of a request to help with testing!
}