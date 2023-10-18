const fs = require("fs");

// row data
const rowData = `
zakaria, 19, male
ahmed, 15, male
sagal, 22, female
`;

// create a writable stream to the file
const writeStream = fs.createWriteStream("data.csv");
// Define a function to write data in chunks
function writeData() {
    let i = 0;
    const writeNextChunk = () => {
      let canContinue = true;
      while (i < 1e4 && canContinue) {
        const newData = rowData + rowData;
        canContinue = writeStream.write(newData);
        i++;
      }
      if (i < 1e4) {
        // If the stream's buffer is full, pause the loop until it drains
        writeStream.once("drain", writeNextChunk);
      } else {
        // If all data has been written, end the stream
        writeStream.end();
      }
    };
  
    // Initiate the data writing process
    writeNextChunk();
  }
  
  // Call the function to start writing data
  writeData();