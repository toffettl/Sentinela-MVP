# Referência da API Sentinela

## Base URL

```text
https://sentinela-production-129e.up.railway.app
```

Use HTTPS e envie JSON com o cabeçalho:

```http
Content-Type: application/json
```

> Atualmente não há autenticação configurada: todos os endpoints estão públicos.

## Resumo de endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Verifica se a API está disponível. |
| `GET` | `/api/dashboard/summary` | Retorna indicadores do dashboard. |
| `POST` | `/api/seed` | Cria dados de exemplo de usuários e ativos. |
| `GET` | `/api/users` | Lista usuários. |
| `GET` | `/api/users/{id}` | Busca usuário por ID. |
| `POST` | `/api/users` | Cria usuário. |
| `DELETE` | `/api/users/{id}` | Exclui usuário. |
| `GET` | `/api/assets` | Lista ativos. |
| `GET` | `/api/assets/{id}` | Busca ativo por ID. |
| `POST` | `/api/assets` | Cria ativo. |
| `PUT` | `/api/assets/{id}` | Atualiza ativo. |
| `DELETE` | `/api/assets/{id}` | Exclui ativo. |
| `GET` | `/api/events` | Lista eventos. |
| `GET` | `/api/events/{id}` | Busca evento pelo ID interno. |
| `POST` | `/api/events` | Cria evento pelo contrato interno da API. |
| `POST` | `/api/events/from-rust` | Recebe evento enviado pelo agente Rust. |
| `DELETE` | `/api/events` | Endpoint legado; não use. Utilize a exclusão por ID. |
| `DELETE` | `/api/events/{id}` | Exclui evento pelo ID interno. |
| `POST` | `/api/detections` | Registra Detection, soma Risk Points e pode criar Incident. |
| `GET` | `/api/incidents` | Lista Incidents, com filtros opcionais. |
| `GET` | `/api/incidents/{id}` | Busca Incident por ID. |
| `GET` | `/api/incidents/{id}/events` | Lista os eventos vinculados ao Incident. |
| `PATCH` | `/api/incidents/{id}` | Altera o status de um Incident. |
| `POST` | `/api/incidents/{id}/notes` | Adiciona nota a um Incident. |

## Saúde

### `GET /health`

Resposta `200 OK`:

```json
{
  "status": "UP"
}
```

## Dashboard

### `GET /api/dashboard/summary`

Resposta `200 OK`:

```json
{
  "totalEvents": 15,
  "totalIncidents": 2,
  "criticalIncidents": 1,
  "highIncidents": 0,
  "openIncidents": 1,
  "activeAssets": 3
}
```

## Dados de exemplo

### `POST /api/seed`

Cria dois usuários e dois ativos de exemplo. Use apenas para inicialização/desenvolvimento; uma nova execução pode falhar caso os e-mails ou ativos já existam.

Resposta `200 OK`:

```json
{
  "message": "Dados de seed criados com sucesso",
  "users": 2,
  "assets": 2
}
```

## Usuários

### `GET /api/users`

Lista todos os usuários. Resposta `200 OK`:

```json
[
  {
    "id": 1,
    "name": "Felipe Silva",
    "email": "felipe.silva@sentinela.local",
    "role": "ANALYST",
    "createdAt": "2026-09-22T20:15:30"
  }
]
```

### `GET /api/users/{id}`

Busca um usuário pelo ID numérico interno. Retorna `200 OK` ou `404 Not Found`.

### `POST /api/users`

Cria um usuário. Retorna `201 Created`.

```json
{
  "name": "Felipe Silva",
  "email": "felipe.silva@sentinela.local",
  "password": "Senha123",
  "role": "ANALYST"
}
```

| Campo | Obrigatório | Valores/observações |
|---|---:|---|
| `name` | Sim | Nome do usuário. |
| `email` | Sim | E-mail válido e único. |
| `password` | Sim | Pelo menos seis caracteres. |
| `role` | Sim | `ADMIN` ou `ANALYST`. |

### `DELETE /api/users/{id}`

Exclui o usuário. Retorna `204 No Content`.

## Ativos

### `GET /api/assets`

Lista todos os ativos. Retorna `200 OK`.

### `GET /api/assets/{id}`

Busca um ativo pelo ID. Retorna `200 OK` ou `404 Not Found`.

### `POST /api/assets`

Cria um ativo. Retorna `201 Created`.

```json
{
  "name": "Servidor de Aplicação",
  "hostname": "srv-app-01",
  "ip": "192.168.1.50",
  "operatingSystem": "Ubuntu 22.04",
  "status": "MONITORING"
}
```

| Campo | Obrigatório | Valores/observações |
|---|---:|---|
| `name` | Sim | Nome do ativo. |
| `hostname` | Sim | Hostname do ativo. |
| `ip` | Sim | Endereço IP do ativo. |
| `operatingSystem` | Não | Sistema operacional. |
| `status` | Não | `ACTIVE`, `INACTIVE` ou `MONITORING`. |

### `PUT /api/assets/{id}`

Atualiza um ativo. Use o mesmo corpo de `POST /api/assets`. Retorna `200 OK` ou `404 Not Found`.

### `DELETE /api/assets/{id}`

Exclui o ativo. Retorna `204 No Content`.

## Eventos

Os eventos possuem dois identificadores:

- `id`: número interno, gerado pelo banco.
- `external_id`: UUID gerado pelo Rust, usado para rastreabilidade e idempotência.

### `GET /api/events`

Lista todos os eventos. Retorna `200 OK`.

### `GET /api/events/{id}`

Busca um evento pelo seu ID interno numérico. Retorna `200 OK` ou `404 Not Found`.

### `POST /api/events/from-rust`

Endpoint destinado ao agente Rust. Retorna `200 OK`. Se o UUID já tiver sido recebido, retorna o evento existente sem duplicá-lo.

```json
{
  "id": "66ba7b11-9dad-11d1-80b4-00c04fd430c8",
  "event_type": "LOGIN_FAILED",
  "timestamp": "2026-09-22T20:15:30",
  "source": "ssh",
  "user": "felipe.silva@sentinela.local",
  "ip": "192.168.1.50",
  "asset": "srv-app-01"
}
```

| Campo | Obrigatório | Descrição |
|---|---:|---|
| `id` | Sim | UUID gerado pelo Rust. |
| `event_type` | Sim | Tipo de evento. |
| `timestamp` | Sim | Formato `YYYY-MM-DDTHH:mm:ss`. |
| `source` | Sim | Origem do evento, como `ssh`. |
| `user` | Sim | E-mail de usuário já cadastrado. |
| `ip` | Sim | IP envolvido. |
| `asset` | Sim | Nome ou hostname de ativo já cadastrado. |

Valores aceitos para `event_type`:

```text
LOGIN_FAILED
LOGIN_SUCCESS
PASSWORD_CHANGE
ADMIN_ACESS
DATABASE_ACESS
FILE_DOWNLOAD
LOGOUT
```

Exemplo de resposta:

```json
{
  "id": 1,
  "external_id": "66ba7b11-9dad-11d1-80b4-00c04fd430c8",
  "event_type": "LOGIN_FAILED",
  "timestamp": "2026-09-22T20:15:30",
  "source": "ssh",
  "user": "Felipe Silva",
  "ip": "192.168.1.50",
  "asset": "Servidor de Aplicação"
}
```

### `POST /api/events`

Cria um evento pelo contrato interno. Retorna `200 OK`.

```json
{
  "source": "auth-service",
  "ip": "192.168.1.50",
  "event_type": "LOGIN_FAILED",
  "timestamp": "2026-09-22T20:15:30",
  "userId": 1,
  "assetId": 1
}
```

É necessário informar, para cada relação, o ID ou a alternativa textual:

- `userId` **ou** `user` (e-mail);
- `assetId` **ou** `asset` (nome ou hostname).

O campo `id` não deve ser enviado: ele é gerado pelo banco.

### `DELETE /api/events/{id}`

Exclui pelo ID interno. Retorna o evento removido com `200 OK`, ou `404 Not Found`.

### `DELETE /api/events`

Endpoint legado presente na API. Não o utilize: a exclusão suportada é `DELETE /api/events/{id}`.

## Detections e Risk Points

### `POST /api/detections`

Registra uma Detection e retorna `201 Created`.

```json
{
  "pattern": "BRUTE_FORCE",
  "ip": "192.168.1.50",
  "event_count": 5,
  "event_ids": [
    "66ba7b11-9dad-11d1-80b4-00c04fd430c8",
    "66ba7b11-9dad-11d1-80b4-00c04fd430c9",
    "66ba7b11-9dad-11d1-80b4-00c04fd430ca",
    "66ba7b11-9dad-11d1-80b4-00c04fd430cb",
    "66ba7b11-9dad-11d1-80b4-00c04fd430cc"
  ]
}
```

| Campo | Obrigatório | Descrição |
|---|---:|---|
| `pattern` | Sim | Regra a aplicar; precisa existir como Security Rule no banco. |
| `ip` | Sim | IP envolvido na Detection. |
| `event_count` | Sim | Quantidade de eventos correlacionados. |
| `event_ids` | Sim | Lista não vazia dos UUIDs dos eventos recebidos do Rust. |

A API soma os Risk Points das Detections ativas por IP. Ao atingir ou superar 150 pontos, cria um Incident crítico e inicia um novo ciclo de pontuação para aquele IP. As Detections antigas permanecem armazenadas, mas não entram no próximo cálculo.

> Não existe endpoint de Security Rules atualmente. Antes de enviar uma Detection, a regra do `pattern` precisa ser cadastrada diretamente no banco.

## Incidents

Incidents são criados automaticamente pelo processamento de Detections. Não existe endpoint de criação manual.

### `GET /api/incidents`

Lista Incidents. Parâmetros opcionais:

```text
status    OPEN | INVESTIGATING | RESOLVED | FALSE_POSITIVE
severity  LOW | MEDIUM | HIGH | CRITICAL
user      trecho do nome do usuário envolvido
```

Exemplo:

```text
GET /api/incidents?status=OPEN&severity=CRITICAL
```

### `GET /api/incidents/{id}`

Busca um Incident. Retorna `200 OK` ou `404 Not Found`.

### `GET /api/incidents/{id}/events`

Lista eventos vinculados manualmente ao Incident. Retorna `200 OK` ou `404 Not Found`.

> Incidents criados automaticamente por Detections ainda não possuem eventos vinculados na relação `incident_events`; nesse caso, a resposta será uma lista vazia.

### `PATCH /api/incidents/{id}`

Atualiza o status do Incident. Retorna `200 OK`.

```json
{
  "status": "INVESTIGATING"
}
```

Transições permitidas:

```text
OPEN          → INVESTIGATING, RESOLVED, FALSE_POSITIVE
INVESTIGATING → RESOLVED, FALSE_POSITIVE
RESOLVED      → nenhuma
FALSE_POSITIVE → nenhuma
```

### `POST /api/incidents/{id}/notes`

Adiciona uma nota. Retorna `201 Created`.

```json
{
  "content": "Análise iniciada pelo time de segurança."
}
```

## Formato de erros

Erros de validação, regra de negócio ou recurso inexistente são retornados no formato:

```json
{
  "timestamp": "2026-09-22T20:15:30",
  "status": 404,
  "error": "Ativo não encontrado",
  "path": "/api/assets/999"
}
```

| Status | Significado |
|---|---|
| `400 Bad Request` | Corpo inválido, campo obrigatório ausente ou transição de status inválida. |
| `404 Not Found` | Usuário, ativo, evento ou Incident não encontrado. |
| `500 Internal Server Error` | Erro não tratado; valide o payload, a existência da Security Rule e consulte os logs da API. |
