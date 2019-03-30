const { Readable } = require("stream");

module.exports = readExample = () => {
  const read = new Readable();
  //   Pushing data straight to the stream
  //   read.push("a");
  //   read.push("b");
  //   read.push(null);

  // Better approach the data is only pushed when a consumer is ready for them
  read._read = () => {
    read.push("123");
    read.push(null);
  };

  read.pipe(process.stdout);
};
