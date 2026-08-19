const spanishMonths = {
  enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
  julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
};

function detectLanguage(text) {
  const value = String(text || '').toLowerCase();
  const spanishSignals = [' el ', ' la ', ' de ', ' para ', ' usted ', ' fecha '];
  return spanishSignals.filter(signal => value.includes(signal)).length >= 2 ? 'es' : 'en';
}

function normalizeSpanishDate(value) {
  const match = String(value).toLowerCase().match(/(\d{1,2}) de ([a-záéíóú]+) de (\d{4})/);
  if (!match) return null;
  const month = spanishMonths[match[2].normalize('NFD').replace(/[\u0300-\u036f]/g, '')];
  return month ? `${match[3]}-${month}-${match[1].padStart(2, '0')}` : null;
}

function normalizeAmount(value, language = 'en') {
  const raw = String(value).replace(/[^0-9,.-]/g, '');
  return language === 'es'
    ? Number(raw.replace(/\./g, '').replace(',', '.'))
    : Number(raw.replace(/,/g, ''));
}

module.exports = { detectLanguage, normalizeSpanishDate, normalizeAmount };
