document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.element');
  const canvasContainer = document.getElementById('canvasContainer');
  const resetButton = document.getElementById('resetButton');
  const downloadButton = document.getElementById('downloadButton');

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.src);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const img = new Image();
    img.src = e.dataTransfer.getData('text/plain');
    img.classList.add('element');
    img.draggable = true;
    img.style.position = 'absolute';
    img.style.left = (e.clientX - canvasContainer.getBoundingClientRect().left - (img.width / 2)) + 'px';
    img.style.top = (e.clientY - canvasContainer.getBoundingClientRect().top - (img.height / 2)) + 'px';
    img.addEventListener('dragstart', handleDragStart);
    canvasContainer.appendChild(img);
  }

  function handleReset() {
    canvasContainer.innerHTML = '';
  }

  function handleDownload() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;

    const elementsInCanvas = canvasContainer.querySelectorAll('.element');
    elementsInCanvas.forEach((element) => {
      const x = parseInt(element.style.left, 10);
      const y = parseInt(element.style.top, 10);
      ctx.drawImage(element, x, y);
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'cenario.png';
    link.click();
  }

  elements.forEach((element) => {
    element.addEventListener('dragstart', handleDragStart);
  });

  canvasContainer.addEventListener('dragover', handleDragOver);
  canvasContainer.addEventListener('drop', handleDrop);
  resetButton.addEventListener('click', handleReset);
  downloadButton.addEventListener('click', handleDownload);
});
