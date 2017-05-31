/**
 * Created by zproo on 2017/5/18.
 */
var http = require("http");
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + "  received.");
        route(pathname, handle, response,request);    // index中的回调函数

    }

    http.createServer(onRequest).listen(8888);
    console.log("Server  has  started.");
}

exports.start = start;