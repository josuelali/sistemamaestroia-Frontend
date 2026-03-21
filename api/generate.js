export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return res.status(200).json({
        ok: true,
        message: "API generate activa"
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        ok: false,
        error: "Method not allowed"
      });
    }

    const body = req.body || {};
    const prompt = String(body.prompt || "").trim();

    if (!prompt) {
      return res.status(400).json({
        ok: false,
        error: "Prompt vacío"
      });
    }

    const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Web generada | SISTEMA MAESTRO IA</title>
  <style>
    body{
      margin:0;
      font-family:Arial,sans-serif;
      background:#0b1020;
      color:#ffffff;
      padding:40px 20px;
    }
    .wrap{
      max-width:900px;
      margin:0 auto;
      background:#11172a;
      border:1px solid #22304d;
      border-radius:16px;
      padding:32px;
    }
    h1{
      margin-top:0;
      font-size:32px;
      line-height:1.2;
    }
    p{
      color:#c9d4e5;
      line-height:1.6;
      font-size:16px;
    }
    .cta{
      display:inline-block;
      margin-top:20px;
      padding:12px 18px;
      border-radius:10px;
      background:#1e6bff;
      color:#fff;
      text-decoration:none;
      font-weight:700;
    }
    .tag{
      display:inline-block;
      margin-bottom:16px;
      padding:6px 10px;
      border-radius:999px;
      background:#1a2338;
      color:#8fb6ff;
      font-size:12px;
      border:1px solid #2a3b61;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="tag">Demo backend real conectada</div>
    <h1>${escapeHtml(prompt)}</h1>
    <p>Contenido generado automáticamente por el backend de SISTEMA MAESTRO IA.</p>
    <p>Este flujo ya está funcionando con petición real desde el frontend hacia <strong>/api/generate</strong>.</p>
    <a class="cta" href="https://systeme.io/?saas" target="_blank" rel="noopener noreferrer">Empezar a monetizar</a>
  </div>
</body>
</html>`;

    return res.status(200).json({
      ok: true,
      html,
      result: html
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor"
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}