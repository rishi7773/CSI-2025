const fs = require('fs');

const readFile = (callback) => {
    fs.readFile('sample.txt', 'utf-8', (err, data) => {
        if (err) return callback(err);
        callback(null, data);
    });
};

readFile((err, data) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Callback File Content:', data);
    }
});