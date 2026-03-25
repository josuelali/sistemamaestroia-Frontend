export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt vacío" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "Falta OPENAI_API_KEY en variables de entorno"
      });
    }

    const systemPrompt = `
Eres un arquitecto de proyectos digitales con IA.
Responde siempre en español, claro y estructurado.

Tu tarea es convertir la idea del usuario en una propuesta inicial útil y accionable.

La respuesta debe incluir exactamente estas secciones:

1. Nombre del sistema
2. Objetivo principal
3. Modelo de monetización recomendado
4. Estructura base del sistema
5. Primeros pasos de ejecución
6. Riesgos o errores a evitar

No uses introducciones largas.
No uses markdown complejo.
Sé práctico, directo y orientado a ingresos.
    `.trim();

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Idea del usuario: ${prompt.trim()}`
          }
        ],
        max_output_tokens: 700
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI error:", data);
      return res.status(openaiResponse.status).json({
        error: data?.error?.message || "Error al generar con OpenAI"
      });
    }

    const result =
      data.output_text ||
      "No se recibió contenido útil desde OpenAI.";

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}