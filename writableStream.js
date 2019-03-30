const { Writable } = require("stream");

module.exports = writeExample = () => {
  const write = Writable();
  write._write = function(chunk, enc, next) {
    console.dir(chunk);
    next();
  };

  process.stdin.pipe(write);
};
