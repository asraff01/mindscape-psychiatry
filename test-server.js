const http = require('http');

const routes = [
  '/',
  '/styles.css',
  '/app.js',
  '/images/dr_manivannan_clean.jpg',
  '/images/mindscape_logo_highres.png',
  '/images/mindscape_art.jpg',
  '/images/sanctuary.jpg'
];

let completed = 0;

routes.forEach(route => {
  http.get(`http://localhost:3000${route}`, (res) => {
    let size = 0;
    res.on('data', chunk => size += chunk.length);
    res.on('end', () => {
      console.log(`Route ${route} -> Status: ${res.statusCode}, Type: ${res.headers['content-type']}, Size: ${size} bytes`);
      completed++;
      if (completed === routes.length) {
        process.exit(0);
      }
    });
  }).on('error', (err) => {
    console.error(`Route ${route} -> Error: ${err.message}`);
    process.exit(1);
  });
});
