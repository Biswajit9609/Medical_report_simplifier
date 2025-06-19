document.getElementById("generateBtn").addEventListener("click", async () => {
  const file = document.getElementById("imageInput").files[0];
  const status = document.getElementById("status");
  const captionBox = document.getElementById("captionBox");
  const caption = document.getElementById("caption");

  if (!file) return alert("Please select a medical report image.");

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result.split(",")[1];
    document.getElementById("preview").src = reader.result;
    document.getElementById("preview").style.display = "block";
    status.innerText = "🧠 Analyzing report...";
    captionBox.style.display = "none";

    try {
      const response = await fetch("/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }

      const result = await response.json();
      const markdown = result.caption || "No summary generated.";
      caption.innerHTML = marked.parse(markdown);
      captionBox.style.display = "block";
      status.innerText = "";
    } catch (error) {
      console.error(error);
      status.innerText = "❌ Failed to analyze report.";
    }
  };

  reader.readAsDataURL(file);
});
