const spawn = require('child_process').spawn;

init();

function init() {
    // We spawn the server detached, and then we kill it with all its children
    // See http://azimi.me/2014/12/31/kill-child_process-node-js.html
    let server = spawn("npm", ["start"], {detached: true});
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);
    let giveUp = setTimeout(() => process.kill(-server.pid), 30000);
    server.stderr.on("data", data => {
        data = data.toString();
        if (data.includes("Selenium Server is up and running")) {
            clearTimeout(giveUp);
            startTests(server);
        }
    });
}

function startTests (server) {
    let tests = spawn("npm", ["test"]);
    tests.stdout.pipe(process.stdout);
    tests.stderr.pipe(process.stderr);
    tests.on("close", () => {
        // kills the entire processes group
        process.kill(-server.pid);
    });
}