async function generarWeb() {
  const textarea = document.getElementById("prompt");
  const resultado = document.getElementById("resultado");

  if (!textarea) {
    console.error("No existe #prompt");
    return;
  }

  if (!resultado) {
    console.error("No existe #resultado");
    return;
  }

  const prompt = textarea.value.trim();

  if (!prompt) {
    resultado.textContent = "Escribe una idea antes de generar.";
    return;
  }

  resultado.textContent = "Generando...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    if (!res.ok) {
      resultado.textContent = data.error || "Error al generar la respuesta.";
      return;
    }

    resultado.textContent = data.result || "No se recibió respuesta.";
  } catch (err) {
    console.error(err);
    resultado.textContent = "Error de conexión con la IA.";
  }
}