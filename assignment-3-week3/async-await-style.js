const fs = require('fs');

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('sample.txt', 'utf-8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const run = async() => {
    try {
        const data = await readFile();
        console.log('Async/Await File Content:', data);
    } catch (err) {
        console.error('Error:', err);
    }
};

run();