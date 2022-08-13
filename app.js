const express = require('express');
const app = express();
const port = 8080;
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'documents/index.html');

app.listen(port, () => {
    console.log('listening for request on port 8080');
});
app.get('/', (req, res) => {
    //console.log('request made');
    //res.sendFile("./documents/index.html", { root: __dirname })
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            //console.log('received data: ' + data);
            console.log('MY_POD_NAMESPACE: ' + process.env.MY_POD_NAMESPACE);
            console.log('MY_POD_NAME: ' + process.env.MY_POD_NAME);
            console.log('MY_POD_IP: ' + process.env.MY_POD_IP);
            var newData = data.replace(/MY_POD_NAME/g, process.env.MY_POD_NAME);
            newData = newData.replace(/MY_POD_IP/g, process.env.MY_POD_IP);
            newData = newData.replace(/MY_NAME_SPACE/g, process.env.MY_POD_NAMESPACE);
            newData = newData.replace(/MY_NODE_NAME/g, process.env.MY_NODE_NAME);
            newData = newData.replace(/MY_POD_SERVICE_ACCOUNT/g, process.env.MY_POD_SERVICE_ACCOUNT);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(newData);
            res.end();
        } else {
            console.log(err);
        }
    });
});
app.get('/about', (req, res) => {
    res.sendFile('./documents/about.html', { root: __dirname });
});
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});
app.use((req, res) => {
    res.status(404).sendFile('./documents/404.html', { root: __dirname });
});