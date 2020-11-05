const http = require('http');

//CREATING A SERVER ON PC
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    //set header content type

    res.setHeader("Content-Type", 'text/html');

    res.write("<head><link rel='stylesheet' href='#'></head>");
    res.write("<p>Hello,ninjas</p>");
    res.write("<p>Hello again,ninjas</p>");
    res.end();
});

//LISTENING BROWSER
server.listen(3000, 'localhost', () => {
    console.log("listening for request on port 3000");
});