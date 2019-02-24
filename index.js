// import { fstat } from "fs";

// module.exports = () => {
//   // ...
// };



// const readFile = fs.readFile("./README.md", "utf-8", (error, data)=>{
//   if(error){
//     console.log("error")
//   }else{
//     console.log(data)  
//   }
// });

// const fs = require("fs");

// fs.readFile('./README.md', function (err, data){
//   if(err){
//     console.log(err);
//   }
//   console.log(data.toString());
// })

const fs = require('fs'),
readline = require('readline');
const fetch = require('node-fetch');

const rd = readline.createInterface({
    input: fs.createReadStream('./README.md'),
    // output: process.stdout,
    // console: false
});

let counterLine = 0;

rd.on('line', function(line) {
    // console.log(line);

counterLine ++;
const filePattern = line
const pattern = /((telnet:\/\/|file:\/\/|https:\/\/|http:\/\/|ftp:\/\/|www\.)[^\s]+)/;
const lineMatch = filePattern.match(pattern);
if (lineMatch != null){

let result=[]
result.push(lineMatch[0])
for (let i=0; i<result.length;i++){
  // console.log(+counterLine + ': '   +result[i]);  }

fetch(result[i])
.then((res)  =>{
  
  console.log( res.url)
  console.log(res.status, res.statusText)
});

     

    } 

  }

});


// path.extname('README.md');
// // Returns: '.md'

