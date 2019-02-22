// import { fstat } from "fs";

// module.exports = () => {
//   // ...
// };

const fs = require("fs");

// const readFile = fs.readFile("./README.md", "utf-8", (error, data)=>{
//   if(error){
//     console.log("error")
//   }else{
//     console.log(data)  
//   }
// });

fs.readFile('./README.md', function (err, data){
  if(err){
    console.log(err);
  }
  console.log(data.toString());
})




