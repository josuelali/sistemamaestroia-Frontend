export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "Eres un experto en crear sistemas para ganar dinero online con IA. Responde con pasos claros y accionables."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content ||
      "Error generando resultado";

    return res.status(200).json({ result });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en servidor" });
  }
}