const fs = require('fs');
const path = require('path');
const os = require('os');

const baseDir = "d:\\downloads\\supermusic";
const outputDir = "parsed";

fs.readdir(baseDir, (error, files) => {
    if (error) {
        console.log(error);
        return;
    }

    files.map(file => {
        const fileNameParts = file.replace('.txt', '').split(' - ');
        const artist = fileNameParts[0];
        const title = fileNameParts[1];

        fs.readFile(path.join(baseDir, file), 'utf8', (err, data) => {
            console.log(`Processing ${file}`);

            if (err) {
                console.log(err);
                console.log('---');
                return;
            }

            let newFile = data.substring(data.indexOf('\n\n') + 2);
            newFile = `${title}${os.EOL}${artist}${os.EOL}${os.EOL}${newFile}`;

            const newPath = path.join(baseDir, outputDir, file);
            console.log(newPath);

            fs.writeFile(newPath, newFile, (writeErr) => {
                if (err) {
                    console.log(writeErr);
                    return;
                }

                console.log('File parsed');
            })

            console.log('---');
        })
    })
})
