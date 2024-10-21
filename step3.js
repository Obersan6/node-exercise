/* STEP 3:
Copy over your 'step2.js' code to 'step3.js'.

Add a feature where, on the command line, you can 'optionally' provide an argument to output to a file instead of printing to the console. The argument should look like this: `--out output-filename.txt readfile-or-url`.

Current features should still work the same.

However, if `--out` follows your script name, it should take the next argument and use that as the path to write to.

For example:
$node step3.js --out new.txt one.txt
$# no output, but new.txt contains contents of one.txt

$node step3.js --out new.txt  http://google.com
$# no output, but new.txt contains google's HTML

Make sure you handle errors trying to write to the file:

$node step3.js --out /no/dir/new.txt one.txt
Couldn't write /no/dir/new.txt:
  Error: ENOENT: no such file or directory, open '/no/dir/new.txt'

It may be the case at this point that you have functions like this:

function cat(path) { }

function catWrite(path, filename) { }

function webCat(url) { }

function webCatWrite(path, filename) { }

**If so, you probably have a lot of duplicated code among these functions. Try to structure your code so that:**

- your functions are small, could be tested, and do one thing
- you minimize duplication of code throughout
*/

// Function to read a file and write to another file
function catWrite(path, filename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`, err);
            process.exit(1);
        }
        fs.writeFile(filename, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${filename}:\n  ${err}`);
                process.exit(1);
            }
        });
    });
}

// Function to fetch a URL and write to a file
async function webCatWrite(url, filename) {
    try {
        const response = await axios.get(url);
        fs.writeFile(filename, response.data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${filename}:\n  ${err}`);
                process.exit(1);
            }
        });
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

// Updated pathType function to use separate write functions
function pathType(pathOrUrl, outFile) {
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
        if (outFile) {
            webCatWrite(pathOrUrl, outFile);
        } else {
            webCat(pathOrUrl, null);
        }
    } else {
        if (outFile) {
            catWrite(pathOrUrl, outFile);
        } else {
            cat(pathOrUrl, null);
        }
    }
}
