export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  const html = `
  <html>
    <head>
      <title>Web generada</title>
    </head>
    <body>
      <h1>${prompt}</h1>
      <p>Contenido generado automáticamente</p>
      <a href="https://systeme.io/?saas">Empieza a monetizar</a>
    </body>
  </html>
  `;

  res.status(200).json({ html });
}