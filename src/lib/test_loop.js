const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Macroeconomia/UNIDAD 2/premium-app/excel_data.json', 'utf-8'));
const pbiSheet = data['01_PBI_Y'];
const consumoSheet = data['02_Consumo_YD_T'];

let count = 0;
for (let i = 9; i < pbiSheet.length; i++) {
  const pbiRow = pbiSheet[i];
  const consRow = consumoSheet[i];
  
  if (!pbiRow || !consRow || !pbiRow['Y = PBI / INGRESO TOTAL']) {
    console.log(`Skipped row ${i}: pbiRow=${!!pbiRow}, consRow=${!!consRow}, key=${pbiRow ? pbiRow['Y = PBI / INGRESO TOTAL'] : 'N/A'}`);
    continue;
  }

  const periodStr = String(pbiRow['Y = PBI / INGRESO TOTAL']);
  const parts = periodStr.split('-Q');
  if (parts.length < 2) {
    console.log(`Invalid period at row ${i}:`, periodStr);
    continue;
  }

  count++;
}
console.log('Total processed:', count);
