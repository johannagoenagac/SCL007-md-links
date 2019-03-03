const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
let routeMd;



const mdLinks = (pathLinks, options) => {

    routeMd = path.resolve(pathLinks)

    let stats = null;
    try {
        stats = fs.statSync(pathLinks)
    } catch (error) {
        return Promise.resolve([]);
    }
    extension = path.extname(pathLinks)

    if (extension === '.md') {

        const markdown = fs.readFileSync(routeMd).toString();
        const links = markdownLinkExtractor(markdown);

        let result = [];

        //recorriendo las lineas de los links
        for (let i = 0; i < links.length; i++) {
            const url = links[i];
            const text = links[i].text;

            // buscando resultados en los links que nos muestran cuales estan ok y rotos  
            const arrayLinks = fetch(links[i])
                .then((res) => {
                    if (options === '--validate') {
                        const objectLinks = {
                            href: res.url,
                            text: text,
                            path: routeMd,
                            statusLinks: res.status,
                            statusText: res.statusText,
                        }
                        return objectLinks

                    } else {
                        const objectLink = {
                            href: res.url,
                            text: text,
                            path: routeMd,
                        }
                        return objectLink
                    }
                })

                .catch((error) => {

                    const objectFail = { urlLinks: url, statusLinks: 'Fail', text: text };

                    return objectFail
                });

            result.push(arrayLinks)
        }

        return Promise.all(result);

    } else if (stats.isDirectory() === true) {

        let repeat = fs.readdirSync(pathLinks)
        return (Promise.all(repeat.map(element => {
            let arrayInfo = path.join(pathLinks, element)
            return mdLinks(arrayInfo)
        }))).then(arrRes => {
            let sum = [];
            arrRes.forEach(element => {
                sum = sum.concat(element)

            })
            return sum;
        }
        )


    } else {
        console.log("error, este no es un arcivo .md")
    }


}

module.exports = mdLinks;