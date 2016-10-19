(function() {
    'use strict';

    var express = require('express');
    var proxy = require('express-http-proxy');
    var http = require('http');

    console.error('******* SERVER *******');
    const app = express();
    const server = http.createServer(app);

    app.use('/api/customers', function(request, response) {
      response.send([
        { id: 1, name: 'AAA Corporation', numSales: 500},
        { id: 2, name: 'Go get bikes!', numSales: 50},
        { id: 3, name: 'Faster Company', numSales: 4}
      ]);
    });

    app.use('/', proxy('localhost:4200', {
         forwardPath: function(req, res) {
            return require('url').parse(req.url).path;
         }}));

    server.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });

}());
