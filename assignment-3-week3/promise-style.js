const fs = require('fs');

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('sample.txt', 'utf-8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

readFile()
    .then((data) => {
        console.log('Promise File Content:', data);
    })
    .catch((err) => {
        console.error('Error:', err);
    });