/**
 * Created by zproo on 2017/5/18.
 */
function route(pathname, handle, response, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, request);
    } else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write('404 Not Found');
        response.end();
    }

}

exports.route = route;