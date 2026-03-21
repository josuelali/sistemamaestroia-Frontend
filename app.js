async function runTask() {
  try {
    const response = await fetch("https://TU-URL-RENDER/run-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assistant: "SEO",
        task: "crear_articulo",
        input: "automatizar negocios con inteligencia artificial"
      })
    });

    const data = await response.json();

    console.log(data);

    document.getElementById("resultado").innerText = data.result;

  } catch (error) {
    console.error(error);
    alert("Error conectando con backend");
  }
}

async function generarWeb() {
  const textarea = document.querySelector("textarea");
  const resultado = document.querySelector("#resultado");

  if (!textarea || !resultado) {
    alert("Falta el textarea o el contenedor #resultado");
    return;
  }

  const prompt = textarea.value.trim();

  if (!prompt) {
    alert("Escribe una idea antes de generar");
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
      throw new Error(data.error || "Error generando la web");
    }

    resultado.textContent = data.html;
  } catch (error) {
    resultado.textContent = "Error: " + error.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.querySelector("button");
  if (boton) {
    boton.addEventListener("click", generarWeb);
  }
});