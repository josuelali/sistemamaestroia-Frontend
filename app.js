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