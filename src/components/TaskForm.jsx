import React, { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [url, setUrl] = useState('https://example.org')
  const [repeat, setRepeat] = useState(3)
  const [intervalMs, setIntervalMs] = useState(1000)
  const [timeoutMs, setTimeoutMs] = useState(30000)
  const [userAgent, setUA] = useState('')
  const [navigationWait, setWait] = useState('networkidle2')
  const [screenshot, setShot] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    onCreate({ url, repeat: Number(repeat), intervalMs: Number(intervalMs), timeoutMs: Number(timeoutMs), userAgent: userAgent || undefined, navigationWait, screenshot })
  }

  return (
    <form onSubmit={submit} className="section">
      <h2 style={{margin:'0 0 12px'}}>Criar tarefa</h2>
      <div className="row" style={{marginBottom:10}}>
        <div style={{flex:1}}>
          <label>URL</label>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.org" />
        </div>
      </div>
      <div className="grid" style={{marginBottom:10}}>
        <div>
          <label>Repetições</label>
          <input type="number" min="1" step="1" value={repeat} onChange={e=>setRepeat(e.target.value)} />
        </div>
        <div>
          <label>Intervalo (ms)</label>
          <input type="number" min="100" step="100" value={intervalMs} onChange={e=>setIntervalMs(e.target.value)} />
        </div>
        <div>
          <label>Timeout (ms)</label>
          <input type="number" min="1000" step="500" value={timeoutMs} onChange={e=>setTimeoutMs(e.target.value)} />
        </div>
      </div>
      <div className="grid" style={{marginBottom:10}}>
        <div>
          <label>User-Agent (opcional)</label>
          <input value={userAgent} onChange={e=>setUA(e.target.value)} placeholder="MyBot/1.0" />
        </div>
        <div>
          <label>WaitUntil</label>
          <select value={navigationWait} onChange={e=>setWait(e.target.value)}>
            <option value="networkidle2">networkidle2</option>
            <option value="load">load</option>
            <option value="domcontentloaded">domcontentloaded</option>
            <option value="networkidle0">networkidle0</option>
          </select>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10, marginTop:22}}>
          <label className="small muted">Screenshot?</label>
          <input type="checkbox" checked={screenshot} onChange={e=>setShot(e.target.checked)} />
        </div>
      </div>
      <div className="row" style={{justifyContent:'flex-end'}}>
        <button type="submit" className="primary">Criar</button>
      </div>
    </form>
  )
}
