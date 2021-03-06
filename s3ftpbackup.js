var s3ftpd = require('./s3ftpd.js');

var server = s3ftpd.createServer("127.0.0.1", "ssit-ftpbackup");

// this event passes in the client socket which emits further events
// but should recommend they don't do socket operations on it
// so should probably encapsulate and hide it
server.on("client:connected", function(socket) {
    var username = null;
    console.log("client connected: " + socket.remoteAddress);
    socket.on("command:user", function(user, success, failure) {
        if (user == "josh") {
            username = user;
            success();
        } else failure();
    });

    socket.on("command:pass", function(pass, success, failure) {
        if (pass == "password") success(username);
        else failure();
    });
});
server.debugging = 4;
server.listen(7001);
