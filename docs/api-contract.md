# Contrato de API (Frontend SistemaMaestroIA)

> Fecha de auditoría: 2026-04-27 (UTC)
>
> Este documento describe **el contrato que el frontend espera** actualmente.
> No describe implementación interna del backend.

## 1) Endpoint `/api/run` (Hub de Asistentes)

- **Uso en frontend**: `asistentes.html` y `public/asistentes.html`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`

### Request esperado

```json
{
  "assistantId": "oferta",
  "inputs": {
    "producto": "...",
    "cliente_ideal": "...",
    "precio": "..."
  }
}
```

- `assistantId`: `string` (id del asistente seleccionado).
- `inputs`: objeto `key/value` dinámico según los campos del asistente.

### Response esperado

- **Éxito (`2xx`)**:
  - Preferido: `{ "output": "...texto generado..." }`
  - Compatible: `{ "result": "...texto generado..." }`
- **Error (`4xx/5xx`)**:
  - Preferido: `{ "detail": "..." }`
  - Compatible: `{ "error": "..." }`

### Notas de compatibilidad frontend

- El frontend renderiza: `data.output || data.result`.
- Si no llega contenido visible, muestra fallback:
  - `"Respuesta generada, pero sin contenido visible."`
- Si la respuesta HTTP no es OK, intenta leer `detail` o `error`.

---

## 2) Endpoint `/api/generate` (Demo)

- **Uso en frontend**: `demo.html`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`

### Request esperado

```json
{
  "prompt": "Describe el contenido que quieres generar..."
}
```

### Response esperado

- **Éxito (`2xx`)**:
  - Esperado: `{ "result": "..." }`
- **Error de negocio (`2xx` con error lógico)**:
  - Compatible: `{ "error": "..." }`
- **Error HTTP (`4xx/5xx`)**:
  - El frontend intenta leer `response.text()` y lo muestra como error.

### Notas de compatibilidad frontend

- Si `result` parece HTML completo, lo inyecta en preview.
- Si no parece HTML, lo envuelve en un documento HTML mínimo.

---

## 3) Rewrites activos en Vercel

Según `vercel.json`:

- `/api/generate` -> `https://systema-maestro-backend.onrender.com/generate`
- `/api/run` -> `https://systema-maestro-backend.onrender.com/api/run`

Esto permite llamadas desde frontend a `/api/*` sin exponer directamente host remoto en el código de cada vista.

---

## 4) Recomendaciones de endurecimiento (siguiente iteración)

1. Normalizar contrato para ambos endpoints:
   - éxito: `{ ok: true, result: string }`
   - error: `{ ok: false, error: { code, message } }`
2. Versionar contrato (`x-api-version` o ruta `/v1/...`).
3. Añadir `requestId` en respuestas para trazabilidad.
4. Documentar límites (`rate-limit`, tamaño máximo de prompt/input).
5. Centralizar llamadas frontend en un módulo único para evitar divergencias.
