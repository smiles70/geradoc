const { classifyLayout } = require('./layoutClassifier');

test('classifies document layout signals for routing', () => {
  expect(classifyLayout({ text: 'plain document' })).toBe('single_column_prose');
  expect(classifyLayout({ text: 'Name ________\n[ ] yes\n[ ] no' })).toBe('form');
  expect(classifyLayout({ text: 'A | B | C | D | E | F | G' })).toBe('table_heavy');
});
