# Sentinela API — integração Rust

## Endereço da API

```text
https://sentinela-production-129e.up.railway.app
```

Todas as requisições devem enviar o cabeçalho:

```http
Content-Type: application/json
```

## Enviar evento

```http
POST /api/events/from-rust
```

Exemplo de payload:

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

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Obrigatório. Gerado pelo Rust; identifica o evento externamente. Reenviar o mesmo UUID não duplica o evento. |
| `event_type` | String | Tipo do evento. |
| `timestamp` | String | Data/hora no formato `YYYY-MM-DDTHH:mm:ss`. |
| `source` | String | Origem, como `ssh` ou `auth-service`. |
| `user` | String | E-mail de um usuário já cadastrado na API. |
| `ip` | String | IP relacionado ao evento. |
| `asset` | String | Nome ou hostname de um ativo já cadastrado na API. |

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

A API armazena um `id` numérico interno e associa o UUID enviado pelo Rust como `external_id`.

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

## Enviar detecção

Quando forem identificados, por exemplo, cinco eventos `LOGIN_FAILED` para o mesmo IP, envie uma detecção:

```http
POST /api/detections
```

Exemplo de payload:

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

| Campo | Tipo | Descrição |
|---|---|---|
| `pattern` | String | Padrão detectado. Deve existir como uma `SecurityRule` cadastrada na API. |
| `ip` | String | IP envolvido. |
| `event_count` | Número | Quantidade de eventos relacionados. |
| `event_ids` | Lista de UUIDs | UUIDs enviados anteriormente no campo `id` dos eventos. A lista não pode ser vazia. |

Ao receber uma detecção, a API salva a Detection, busca a regra pelo `pattern`, soma os Risk Points daquele IP e cria um Incident ao alcançar 150 pontos.

## Exemplo em Rust

```rust
let response = client
    .post("https://sentinela-production-129e.up.railway.app/api/events/from-rust")
    .header("Content-Type", "application/json")
    .json(&event)
    .send()
    .await?;
```

## Erros comuns

| Status | Causa provável |
|---|---|
| `400 Bad Request` | JSON inválido ou UUID `id` ausente/inválido. |
| `404 Not Found` | O e-mail em `user` ou o valor em `asset` não foi encontrado. |
| `500 Internal Server Error` | Compartilhe a resposta e o payload enviado com o time Java. |
