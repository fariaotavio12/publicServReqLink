const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

async function req(path, opts) {
  const r = await fetch(API_BASE + path, opts);
  const ct = r.headers.get('content-type') || '';
  const body = ct.includes('application/json') ? await r.json() : await r.text();
  if (!r.ok) throw new Error(typeof body === 'string' ? body : JSON.stringify(body));
  return body;
}

export const api = {
  base: () => API_BASE,
  health: () => req('/health'),
  listTasks: () => req('/tasks'),
  getTask: (id) => req('/tasks/' + encodeURIComponent(id)),
  createTask: (task) => req('/tasks', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(task) }),
  act: (id, action) => req(`/tasks/${encodeURIComponent(id)}/${action}`, { method: 'POST' }),
};
