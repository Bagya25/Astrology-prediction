document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("astroForm");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const data = {
      name: document.getElementById("name").value.trim(),
      dob: document.getElementById("dob").value,
      tob: document.getElementById("tob").value,
      pob: document.getElementById("pob").value.trim(),
      gender: document.getElementById("gender").value,
      focus: document.getElementById("focus").value,
      email: document.getElementById("email").value.trim()
    };

    // Basic validation
    if (
      !data.name ||
      !data.dob ||
      !data.pob ||
      !data.gender ||
      !data.focus ||
      !data.email
    ) {
      showMessage("Please fill in all required fields.", "red");
      return;
    }

    showMessage("🔮 Sending your details...", "#4f46e5");

    try {
      const response = await fetch(
        "https://coderbagya.app.n8n.cloud/webhook/Astro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        showMessage("✨ Prediction will be emailed to you soon!", "green");
        form.reset();
      } else {
        showMessage("❌ Unable to send request. Please try again.", "red");
      }
    } catch (error) {
      console.error(error);
      showMessage("⚠️ Network error. Please check your connection.", "red");
    }
  });

  // Utility function for messages
  function showMessage(text, color) {
    messageDiv.innerText = text;
    messageDiv.style.color = color;
  }
});
