const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const sheet = data['02_Consumo_YD_T'];
for (let i = 0; i <= 15; i++) {
  console.log(`Row ${i}:`, sheet[i]);
}
