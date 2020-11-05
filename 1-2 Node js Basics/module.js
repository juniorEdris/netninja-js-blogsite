// const {
//     people,
//     ages
// } = require('./people');

// console.log(people, ages);

const fs = require('fs');


//Reading file

// fs.readFile('./blog.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// });

//writing file

// fs.writeFile('./blog1.txt', "Hello world", () => {
//     console.log("file was writen");
// })

// directories

// if (!fs.existsSync("./assets")) {

//     fs.mkdir("./assets", (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log("folder created.");
//     });
// } else {
//     fs.rmdir("./assets", err => {
//         if (err) {
//             console.log(err);

//         }
//         console.log("folder removed");
//     });
// }

if (fs.existsSync('./blog1.txt')) {
    fs.unlink("./blog1.txt", (err) => {
        if (err) {
            console.log(err);

        }
        console.log("file removed");
    });
}