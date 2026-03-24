export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  // 🔥 RESPUESTA FIJA (para probar frontend)
  return res.status(200).json({
    result: `Sistema generado para: "${prompt}"

1. Crear contenido con IA
2. Publicar en TikTok y YouTube
3. Monetizar con afiliados
4. Automatizar con herramientas

👉 Este sistema puede empezar a generar ingresos en pocos días.`
  });
}