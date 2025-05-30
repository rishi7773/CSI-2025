const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Folder to manage files inside
const filesDir = path.join(__dirname, "files");

// Ensure the folder exists
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader("Content-Type", "text/plain");

    if (pathname === "/create") {
        const { filename, content } = query;
        if (!filename || !content) {
            res.statusCode = 400;
            return res.end("Missing filename or content");
        }

        const filePath = path.join(filesDir, filename);
        fs.writeFileSync(filePath, content);
        res.end(`File '${filename}' created successfully`);

    } else if (pathname === "/read") {
        const { filename } = query;
        if (!filename) {
            res.statusCode = 400;
            return res.end("Missing filename to read");
        }

        const filePath = path.join(filesDir, filename);
        if (!fs.existsSync(filePath)) {
            res.statusCode = 404;
            return res.end(`${filename} not found`);
        }

        const data = fs.readFileSync(filePath, "utf8");
        res.end(`Contents of ${filename}:\n${data}`);

    } else if (pathname === "/delete") {
        const { filename } = query;
        if (!filename) {
            res.statusCode = 400;
            return res.end("Missing filename to delete");
        }

        const filePath = path.join(filesDir, filename);
        if (!fs.existsSync(filePath)) {
            res.statusCode = 404;
            return res.end("File not found");
        }

        fs.unlinkSync(filePath);
        res.end(`File '${filename}' deleted successfully`);

    } else {
        res.statusCode = 404;
        res.end("Invalid route");
    }
});

server.listen(3006, () => {
    console.log("Server running on http://localhost:3006");
});