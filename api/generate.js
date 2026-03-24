export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  // Validación básica
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    // Prompt optimizado para generar valor real
    const aiPrompt = `
Actúa como un sistema experto en crear negocios automatizados con inteligencia artificial.

Tu objetivo es generar sistemas prácticos que puedan generar dinero.

Devuelve SIEMPRE esta estructura:

1. IDEA DE NEGOCIO
2. SISTEMA (cómo funciona)
3. PASOS ACCIONABLES (paso a paso claro)
4. AUTOMATIZACIÓN (cómo hacerlo automático)
5. MONETIZACIÓN (cómo gana dinero)

Sé directo, práctico y sin teoría innecesaria.

Usuario: ${prompt}
`;

    // Llamada a OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: aiPrompt
          }
        ],
        temperature: 0.7
      })
    });

    // Control de errores de OpenAI
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", errorText);
      return res.status(500).json({ error: "OpenAI API error" });
    }

    const data = await response.json();

    // Extraer resultado de forma segura
    const result =
      data?.choices?.[0]?.message?.content ||
      "Error generando resultado";

    // Log (para mejorar luego)
    console.log("INPUT:", prompt);
    console.log("OUTPUT:", result);

    return res.status(200).json({ result });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}