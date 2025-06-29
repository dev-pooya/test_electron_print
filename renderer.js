async function savePDF() {
  const result = await window.electronAPI.printToPDF();
  if (result.success) {
    alert("PDF saved to: " + result.path);
  } else {
    alert("PDF save cancelled.");
  }
}
