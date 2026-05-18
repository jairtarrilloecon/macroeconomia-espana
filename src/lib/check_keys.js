const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const sheet = data['01_PBI_Y'];
console.log('Total rows:', sheet.length);
for (let i = 0; i < sheet.length; i++) {
  console.log(`Row ${i}:`, sheet[i]['Y = PBI / INGRESO TOTAL']);
}
