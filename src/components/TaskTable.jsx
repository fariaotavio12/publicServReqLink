import React from 'react'

function fmtStatus(s){ return <span className={'status-'+s}>{s}</span> }
function fmtTime(ts){ return ts ? new Date(ts).toLocaleTimeString() : '-' }
function progress(t){ return `${t.doneCount}/${t.repeat} (${t.failedCount} falhas)` }

export default function TaskTable({ tasks, onAction, onView }){
  return (
    <div className="section">
      <h2 style={{margin:'0 0 12px'}}>Tarefas</h2>
      <div className="toolbar" style={{marginBottom:8}}>
        <span className="small muted">Atualização sem recarregar a página</span>
      </div>
      <div style={{overflow:'auto'}}>
        <table aria-label="Tabela de tarefas">
          <thead>
            <tr><th>ID</th><th>URL</th><th>Status</th><th>Progresso</th><th>Próxima</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td><code>{t.id}</code></td>
                <td className="small">{t.url}</td>
                <td>{fmtStatus(t.status)}</td>
                <td>{progress(t)}</td>
                <td className="small muted">{fmtTime(t.nextRunAt)}</td>
                <td className="small">
                  <div className="toolbar">
                    <button type="button" onClick={()=>onView(t.id)}>Ver</button>
                    <button type="button" onClick={()=>onAction(t.id,'pause')}>Pausar</button>
                    <button type="button" onClick={()=>onAction(t.id,'resume')}>Retomar</button>
                    <button type="button" className="ghost" onClick={()=>onAction(t.id,'cancel')}>Cancelar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
