const express = require('express');
const app = express();
const port = 8080;
app.listen(port, () => {
console.log('listening for request on port 8080');
});
app.get('/', (req, res) => {
console.log('request made');
res.sendFile("./documents/index.html", { root: __dirname })
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