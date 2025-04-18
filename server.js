// Import required core modules
const fs = require("fs"); // File system module to read files
const http = require("http"); // HTTP module to create a server
const path = require("path"); // Path module to handle file paths

const port = 3000; // Define the port the server will listen on

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Construct the file path based on the request URL
  // If root is requested ("/"), serve "index.html" by default
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );

  // Get the file extension in lowercase (e.g., .html, .css)
  const extName = String(path.extname(filePath).toLowerCase());

  // Define MIME types for supported file extensions
  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  // Determine the content type; default to 'application/octet-stream' for unknown types
  const contentType = mimeType[extName] || "application/octet-stream";

  // Read the requested file from the file system
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If the file is not found (ENOENT), return a 404 response
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: Error File Not Found");
      }
      // Additional error handling can be added here (e.g., permission errors)
    } else {
      // If file is found, return it with a 200 OK status and the correct content type
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// Start the server and listen on the defined port
server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});