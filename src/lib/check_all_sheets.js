const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const sheets = ['01_PBI_Y', '02_Consumo_YD_T', '03_Inversion', '04_Gasto_Publico', '05_Sector_Externo_XN'];

sheets.forEach(name => {
  const sheet = data[name] || [];
  console.log(`Sheet ${name} length:`, sheet.length);
  if (sheet.length > 0) {
    console.log(`  Keys of row 9:`, Object.keys(sheet[9]));
    console.log(`  Row 46 value:`, sheet[46] ? sheet[46]['Unnamed: 1'] || sheet[46]['Unnamed: 2'] : 'N/A');
    console.log(`  Row 47 value:`, sheet[47] ? sheet[47]['Unnamed: 1'] || sheet[47]['Unnamed: 2'] : 'N/A');
  }
});
