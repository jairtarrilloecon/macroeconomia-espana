const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const sheets = ['01_PBI_Y', '02_Consumo_YD_T', '03_Inversion', '04_Gasto_Publico', '05_Sector_Externo_XN'];

sheets.forEach(name => {
  const sheet = data[name] || [];
  console.log(`Sheet ${name} Row 8:`, sheet[8]);
});
