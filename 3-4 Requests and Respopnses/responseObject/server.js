const http = require('http');
const fs = require('fs');

//CREATING A SERVER ON PC
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", 'text/html');

    //send html file
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data); //data can be send by this call
        }
    });

});

//LISTENING BROWSER
server.listen(3000, 'localhost', () => {
    console.log("listening for request on port 3000");
});