const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const sheet = data['05_Sector_Externo_XN'];
console.log('Row 10:', sheet[10]);
