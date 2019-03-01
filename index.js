const mdLinks = require("./module.js")
const pathLinks = process.argv[2]
const options = process.argv[3]

if (require.main === module){
  mdLinks(pathLinks,options).then(console.log);
};

mdLinks(pathLinks, options)
