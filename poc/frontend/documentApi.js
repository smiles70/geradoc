export async function processDocument(file) {
  const form = new FormData();
  form.append('document', file);
  const response = await fetch('http://localhost:8000/api/process', { method: 'POST', body: form });
  if (!response.ok) throw new Error('The document could not be processed.');
  return response.json();
}
