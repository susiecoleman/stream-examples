const { createReadStream, createWriteStream } = require("fs");
const { PassThrough, Duplex, Writable } = require("stream");

const readStream = createReadStream("./data.txt");
const writeStream = createWriteStream(`./output.txt`);

// Duplex Streams - implement readable and writable interfaces. For composing streams.

// PassThrough an example of a Duplex Stream.
// Just passes the input to the output. Used for inspection of the data.
const reporter = new PassThrough();
reporter.on("data", chunk => {
  console.log("data received");
});

// Implementing a Duplex stream. Need to implement the read and write methods
class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _read() {}

  // Clear out writeable stream when no more data is coming in on the read stream
  _final() {
    this.push(null);
  }
}

const throttle = new Throttle(1000);

const duplexExample = () => {
  readStream
    .pipe(throttle)
    .pipe(reporter)
    .pipe(writeStream);
};

module.exports = duplexExample;
