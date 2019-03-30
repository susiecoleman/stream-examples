const fs = require("fs");
const server = require("http").createServer();

const serverExample = () => {
  server.on("request", (req, res) => {
    const src = fs.createReadStream("./data.txt");

    //   Readable source piped to a writable destination
    src.pipe(res);
  });

  server.listen(8008, () => {
    console.log("Server listening on port 8008");
  });
};

module.exports = serverExample;
