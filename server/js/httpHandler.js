const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'js','background.jpg');
////////////////////////////////////////////////////////


module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
    next();
  } else if (req.method === 'GET' && req.url === '/js/background.jpg') {
    // if (fs.existsSync(module.exports.backgroundImageFile)) {
    //   fs.readFile()
    //   res.writeHead(200, headers);
    //   res.end(module.exports.backgroundImageFile);
    // } else {
    //   res.writeHead(404, headers);
    //   res.end();
    // }
    fs.readFile(module.exports.backgroundImageFile, function(err, data) {
      if (err) {
        res.writeHead(404, headers);
        res.end();
        next();
      } else {
      res.writeHead(200, headers);
      res.write(data);
      res.end();
      next();
      }
    })
  } else if (req.method === 'POST' && req.url === '/') {
    fs.writeFile(module.exports.backgroundImageFile, multipart.getFile(req._postData), function() {
      res.writeHead(201, headers);
      res.end();
      next();
    });
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
}