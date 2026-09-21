# Sentinela - API Java

## Endpoints

### Auth
- `POST /auth/login` - Autenticar

### Users
- `GET /api/users` - Listar usuários
- `GET /api/users/{id}` - Buscar usuário
- `POST /api/users` - Criar usuário
- `DELETE /api/users/{id}` - Deletar usuário

### Assets
- `GET /api/assets` - Listar ativos
- `GET /api/assets/{id}` - Buscar ativo
- `POST /api/assets` - Criar ativo
- `PUT /api/assets/{id}` - Atualizar ativo
- `DELETE /api/assets/{id}` - Deletar ativo

### Incidents
- `GET /api/incidents` - Listar incidentes (filtros: `status`, `severity`, `user`)
- `GET /api/incidents/{id}` - Buscar incidente
- `PATCH /api/incidents/{id}` - Atualizar status
- `GET /api/incidents/{id}/events` - Eventos do incidente
- `POST /api/incidents/{id}/notes` - Adicionar nota

### Events
- `GET /api/events` - Listar eventos
- `GET /api/events/{id}` - Buscar evento

### Dashboard
- `GET /api/dashboard/summary` - Resumo

### Seed
- `POST /api/seed` - Popular dados de teste