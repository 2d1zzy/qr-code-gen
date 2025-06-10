/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
// Function to prompt user for a URL

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Please enter a URL to generate a QR code:",
      validate: function (value) {
        var pass = value.match(
          /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid URL.";
      },
    },
  ])
  .then((answers) => {
    const url = answers.url;
    // Generate QR code image
    const qrImage = qr.image(url, { type: "png" });
    const qrCodePath = "qrcode.png";

    // Save QR code image to file
    qrImage.pipe(fs.createWriteStream(qrCodePath));

    // Save URL to a text file
    fs.writeFileSync("url.txt", url);

    console.log(`QR code generated and saved as ${qrCodePath}`);
    console.log(`URL saved to url.txt`);
  });