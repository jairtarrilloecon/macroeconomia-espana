const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const sheet = data['05_Sector_Externo_XN'];
for (let i = 0; i <= 10; i++) {
  console.log(`Row ${i}:`, sheet[i] ? sheet[i]['EXPORTACIONES NETAS COMO FUNCION'] : 'N/A', sheet[i] ? sheet[i]['Unnamed: 1'] : 'N/A');
}
