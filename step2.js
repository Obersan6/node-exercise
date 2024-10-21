/* STEPT 2
Copy over your ***step1.js*** code to ***step2.js***

Add a new function, ***webCat***. This should take a URL and, using [axios](https://github.com/axios/axios#installing), should read the content of that URL and print it to the console.

Modify the code that invoked ***cat*** so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either ***cat*** or ***webCat***, respectively.
*/

const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile('one.txt', 'utf8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}:`, err);
            process.exit(1); // Exit the process with an error code
        }
        console.log('Data:', data); // Print the file contents
    })
}

// Fetch url from GitHub repo
async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data); // Print content of the URL
  } catch (error) {
    console.error(`Error fetching ${url}`, err);
    process.exit(1);
  }
}

// Determine whether the argument is a file or a URL
function pathType(pathOrUrl) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl);
  } else {
    cat(pathOrUrl);
  }
}

// Get the file path from the command line arguments
const path = process.argv[2];

// cal pathType
pathType(path);









