# Puppeteer Queue – React (Vite)

Frontend React + Vite para testar sua API de fila com Puppeteer.

## Rodar
```bash
npm i
cp .env.example .env   # edite se quiser apontar para outra API
npm run dev            # abre em http://localhost:5173
```

## Config
- `VITE_API_BASE`: base da API (padrão: `http://localhost:3000`).

## Recursos
- Criar tarefas (repeat, intervalMs, timeoutMs, userAgent, waitUntil, screenshot)
- Listar e ver detalhes
- Pausar / Retomar / Cancelar
- Auto-refresh (polling 1s, sem recarregar a página)
