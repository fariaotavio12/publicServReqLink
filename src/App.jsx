import React, { useEffect, useRef, useState } from 'react'
import { api } from './api'
import TaskForm from './components/TaskForm.jsx'
import TaskTable from './components/TaskTable.jsx'

export default function App(){
  const [base, setBase] = useState(api.base())
  const [health, setHealth] = useState('')
  const [tasks, setTasks] = useState([])
  const [auto, setAuto] = useState(true)
  const timer = useRef(null)

  const poll = async () => {
    try { const list = await api.listTasks(); setTasks(list) } catch {}
  }

  useEffect(() => {
    poll()
    if (auto && !timer.current){
      timer.current = setInterval(poll, 10000)
    }
    return () => { if (timer.current){ clearInterval(timer.current); timer.current = null } }
  }, [auto])

  const create = async (body) => {
    try { await api.createTask(body); await poll(); } catch (e) { alert('Erro: ' + e.message) }
  }

  const action = async (id, act) => {
    try { await api.act(id, act); await poll(); } catch (e) { alert('Erro: ' + e.message) }
  }

  const view = async (id) => {
    try {
      const t = await api.getTask(id);
      const runs = (t.runs||[]).map(r => {
        let s = `#${r.n} ${r.status}`
        if (r.httpStatus) s += ` [${r.httpStatus}]`
        if (r.title) s += ` – ${r.title}`
        if (r.finalUrl) s += ` (${r.finalUrl})`
        return s
      }).join('\n')
      alert(`Task ${t.id}
Status: ${t.status}
Progresso: ${t.doneCount}/${t.repeat} (falhas ${t.failedCount})
Próxima: ${t.nextRunAt ? new Date(t.nextRunAt).toLocaleTimeString() : '-'}

Execuções:
${runs || '(sem execuções)'}
`)
    } catch(e){ alert('Erro ao obter task: ' + e.message) }
  }

  const testHealth = async () => {
    setHealth('testando...')
    try { const j = await api.health(); setHealth('OK: ' + JSON.stringify(j)) }
    catch(e){ setHealth('Falhou: ' + e.message) }
  }

  return (
    <div className="wrap">
      <div className="card">
        <div className="section">
          <h1>Puppeteer Queue – React Tester</h1>
          <p className="sub">Base: <code>{base}</code> (altere via VITE_API_BASE)</p>
          <div className="row" style={{gap:8, marginBottom:10}}>
            <button type="button" className="ghost" onClick={testHealth}>/health</button>
            <span className="small muted" aria-live="polite">{health}</span>
            <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
              <label className="small muted">Auto-refresh</label>
              <input type="checkbox" checked={auto} onChange={e=>setAuto(e.target.checked)} />
            </div>
          </div>
        </div>

        <TaskForm onCreate={create} />
        <TaskTable tasks={tasks} onAction={action} onView={view} />
      </div>
    </div>
  )
}
