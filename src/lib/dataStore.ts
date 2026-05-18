import rawData from '../../excel_data.json';

export interface QuarterData {
  quarter: string;
  year: number;
  q: number;
  Y: number; // PBI
  C: number; // Consumo
  I: number; // Inversión
  G: number; // Gasto
  XN: number; // Exportaciones netas
  YD: number; // Ingreso Disponible
  T: number; // Impuestos
  t: number; // Presion fiscal
  r: number; // Tasa de interes real
  Yext: number; // Ingreso externo
  M: number; // Importaciones
  er: number; // Tipo de cambio real
}

type ExcelCell = string | number | null | undefined;
type ExcelRow = Record<string, ExcelCell>;
type ExcelWorkbook = Record<string, ExcelRow[]>;

const workbook = rawData as ExcelWorkbook;
const pbiSheet = workbook['01_PBI_Y'] ?? [];
const consumoSheet = workbook['02_Consumo_YD_T'] ?? [];
const inversionSheet = workbook['03_Inversion'] ?? [];
const gastoSheet = workbook['04_Gasto_Publico'] ?? [];
const externoSheet = workbook['05_Sector_Externo_XN'] ?? [];

function numberFrom(cell: ExcelCell) {
  return typeof cell === "number" ? cell : parseFloat(String(cell ?? "")) || 0;
}

const pbiMap = new Map<string, ExcelRow>();
pbiSheet.forEach(row => {
  const period = row['Y = PBI / INGRESO TOTAL'];
  if (period && typeof period === 'string' && period.includes('-Q')) {
    pbiMap.set(period, row);
  }
});

const consMap = new Map<string, ExcelRow>();
consumoSheet.forEach(row => {
  const period = row['CONSUMO, INGRESO DISPONIBLE E IMPUESTOS'];
  if (period && typeof period === 'string' && period.includes('-Q')) {
    consMap.set(period, row);
  }
});

const invMap = new Map<string, ExcelRow>();
inversionSheet.forEach(row => {
  const period = row['INVERSION'];
  if (period && typeof period === 'string' && period.includes('-Q')) {
    invMap.set(period, row);
  }
});

const gastoMap = new Map<string, ExcelRow>();
gastoSheet.forEach(row => {
  const period = row['GASTO PUBLICO'];
  if (period && typeof period === 'string' && period.includes('-Q')) {
    gastoMap.set(period, row);
  }
});

const extMap = new Map<string, ExcelRow>();
externoSheet.forEach(row => {
  const period = row['EXPORTACIONES NETAS COMO FUNCION'];
  if (period && typeof period === 'string' && period.includes('-Q')) {
    extMap.set(period, row);
  }
});

export const macroData: QuarterData[] = [];
const periods = Array.from(pbiMap.keys()).sort();

periods.forEach(period => {
  const pbiRow = pbiMap.get(period);
  const consRow = consMap.get(period);
  const invRow = invMap.get(period);
  const gastoRow = gastoMap.get(period);
  const extRow = extMap.get(period);

  if (!pbiRow) return;

  const [yearStr, qStr] = period.split('-Q');

  macroData.push({
    quarter: period,
    year: parseInt(yearStr),
    q: parseInt(qStr),
    Y: numberFrom(pbiRow['Unnamed: 1']),
    C: consRow ? numberFrom(consRow['Unnamed: 2']) : 0,
    YD: consRow ? numberFrom(consRow['Unnamed: 3']) : 0,
    T: consRow ? numberFrom(consRow['Unnamed: 4']) : 0,
    t: consRow ? numberFrom(consRow['Unnamed: 5']) : 0,
    I: invRow ? numberFrom(invRow['Unnamed: 1']) : 0,
    G: gastoRow ? numberFrom(gastoRow['Unnamed: 1']) : 0,
    XN: extRow ? numberFrom(extRow['Unnamed: 6']) : 0, // XN observado
    r: invRow ? numberFrom(invRow['Unnamed: 4']) : 0,
    Yext: extRow ? numberFrom(extRow['Unnamed: 1']) : 0,
    M: extRow ? numberFrom(extRow['Unnamed: 5']) : 0,
    er: extRow ? numberFrom(extRow['Unnamed: 3']) : 0
  });
});

// Multiplier constants derived from the regression
export const multiplierConstants = {
  c: 0.584,
  t: 0.398,
  m: 0.312,
  k: 1.04
};
