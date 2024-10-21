/* STEP 1

In step1.js, write a function,' cat'.

It should take one argument,'path', and it should read the file with that path, and print the contents of that file.

Then, write some code that calls that function, allowing you to specify the path argument via the command line. For example:

$node step1.js one.txt
This is file one.
*/

const fs = require('fs');

// Get the file path from the command line arguments
const path = process.argv[2];

function cat(path) {
    fs.readFile('one.txt', 'utf8', (err, data) => {
        if(err) {
            console.error('Error reading ${path}:', err);
            process.exit(1); // Exit the process with an error code
        }
        console.log('Data:', data); // Print the file contents
    })
}

cat('/step1.js');




