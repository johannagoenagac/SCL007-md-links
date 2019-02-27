// import { fstat } from "fs";

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const pathLinks = process.argv[2]
const markdownLinkExtractor = require('markdown-link-extractor');
let routeMd;

const route = (pathLinks)=> {
  if (path.isAbsolute(pathLinks)){
    routeMd=pathLinks;
  }else{
    routeMd=path.resolve(pathLinks)
  }
  return routeMd
}
route(pathLinks);

const mdLinks = (routeMd) => {

  
  const markdown = fs.readFileSync(routeMd).toString();
  const links = markdownLinkExtractor(markdown);

  let result = []

  //recorriendo las lineas de los links
  for (let i = 0; i < links.length; i++) {
    const url = links[i]

    // buscando resultados en los links que nos muestran cuales estan ok y rotos  
    const arrayLinks = fetch(links[i])
      .then((res) => {
        const objectLinks = { url: `${res.url}`, statusNumber: `${res.status}`, statusText: `${res.statusText}` }

        return objectLinks
      })
      .catch((error) => {
        const objectFail = { urlLinks: `${url}`, statusLinks: 'Fail' };
        return objectFail
      });

    result.push(arrayLinks)
  }


  Promise.all(result)
    .then((lineLinks) => {
      console.log(lineLinks)
    })

    .catch(console.error)
    
}
mdLinks(routeMd)






// module.exports = {mdLinks};



// path.extname('README.md');
// // Returns: '.md'


// fs.readFile(pathLinks, (err, data) =>{
//   if(pathLinks.exname === '.md'){
//     console.log(err);
//   }
//   console.log(data.toString());
// })



//Buscando match en cada linea para encontrar links
  // const filePattern = line
  // const pattern = /((telnet:\/\/|file:\/\/|https:\/\/|http:\/\/|ftp:\/\/|www\.)[^\s][^\)]+)/;
  // const lineMatch = filePattern.match(pattern);

  // console.log(lineMatch)
  // if (lineMatch != null) {

  //   // let result = []
  //   // result.push(lineMatch)

  //   let arrayFetch=[]

  
  // let counterLine = 0;
  // counterLine ++;