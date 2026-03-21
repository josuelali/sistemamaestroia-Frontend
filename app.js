function generarWeb() {
  const textarea = document.getElementById("prompt");
  const resultado = document.getElementById("resultado");

  alert("botón funciona");

  if (!textarea || !resultado) {
    alert("Falta textarea o resultado");
    return;
  }

  const prompt = textarea.value.trim();

  if (!prompt) {
    alert("Escribe algo");
    return;
  }

  resultado.textContent = "Generando...";

  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    resultado.textContent = data.html;
  })
  .catch(err => {
    console.error(err);
    resultado.textContent = "Error";
  });
}