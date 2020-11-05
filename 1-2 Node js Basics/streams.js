const fs = require('fs');

const readStreams = fs.createReadStream("./blog.txt", {
    encoding: "utf-8"
});
const writeStream = fs.createWriteStream("./blog2.txt");

// 1st type 
// readStreams.on("data", (chunk) => {
//     console.log("written");
//     // console.log(chunk);
//     writeStream.write("New Chunk\n");
//     writeStream.write(chunk);
// })

//2nd type

readStreams.pipe(writeStream);