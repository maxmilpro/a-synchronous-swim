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
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
  } else if (req.method === 'GET' && req.url === '/image') {
    if (fs.existsSync(module.exports.backgroundImageFile)) {
      res.writeHead(200, headers);
      res.end(module.exports.backgroundImageFile);
    } else {
      res.writeHead(404, headers);
      res.end();
    }
  } else {
    res.writeHead(200, headers);
    res.end();
  }
  next();// invoke next() at the end of a request to help with testing!
}