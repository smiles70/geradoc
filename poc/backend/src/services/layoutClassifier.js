const LAYOUTS = ['single_column_prose', 'multi_column', 'form', 'table_heavy', 'mixed'];

function classifyLayout({ text = '', pages = [] } = {}) {
  const value = `${text} ${pages.map(page => page.text || '').join(' ')}`;
  const tables = (value.match(/\|/g) || []).length;
  const formFields = (value.match(/_{3,}|\[\s*\]/g) || []).length;
  const columns = pages.some(page => (page.text || '').split(/\s{4,}/).length > 1);
  if (tables >= 5 && formFields > 2) return 'mixed';
  if (tables >= 5) return 'table_heavy';
  if (formFields > 2) return 'form';
  if (columns) return 'multi_column';
  return 'single_column_prose';
}

module.exports = { LAYOUTS, classifyLayout };
