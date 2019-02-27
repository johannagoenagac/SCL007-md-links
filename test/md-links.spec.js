// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const index = require('../index.js');

describe('Leer un directorio', () => {
    //Así se testea algo con promesas
    test('Debería ser capaz de leer el directorio del programa', () => {
        expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
        return App.readDirPromise(__dirname)
            .then((files) => {
                expect(files).toContain('app.test.js');
            }).catch((error) => {

            });
    });

  });