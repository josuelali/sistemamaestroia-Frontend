async function generarWeb() {
  const textarea = document.getElementById("prompt");
  const resultado = document.getElementById("resultado");

  if (!textarea || !resultado) {
    alert("Falta el campo prompt o el bloque resultado");
    return;
  }

  const prompt = textarea.value.trim();

  if (!prompt) {
    alert("Escribe una idea antes de generar");
    return;
  }

  resultado.textContent = "Generando...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al generar");
    }

    resultado.textContent = data.html;
  } catch (error) {
    console.error(error);
    resultado.textContent = "Error: " + error.message;
  }
}