export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  // HTML base seguro
  const html = `
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Web generada</title>
  <style>
    body { font-family: Arial; padding:40px; background:#0b1220; color:white; }
    h1 { color:#38bdf8; }
    .cta { margin-top:20px; display:inline-block; padding:12px 20px; background:#22c55e; color:white; text-decoration:none; border-radius:8px; }
  </style>
</head>
<body>
  <h1>${prompt}</h1>
  <p>Contenido generado automáticamente con Sistema Maestro IA.</p>
  <a class="cta" href="https://systeme.io/?saas" target="_blank">Empezar a monetizar</a>
</body>
</html>
  `;

  return res.status(200).json({ html });
}