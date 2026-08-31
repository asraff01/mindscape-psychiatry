const fs = require('fs');

// Let's check the size and see if we can use a script
console.log('doctor_portrait.jpg size:', fs.statSync('images/doctor_portrait.jpg').size);
