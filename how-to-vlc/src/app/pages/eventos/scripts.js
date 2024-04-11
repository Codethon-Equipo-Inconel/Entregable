function initGallery() {
  const galerias = document.querySelectorAll('#galeria');
  galerias.forEach(galeria => {
    let isDragging = false;
    let initialX = 0;

    galeria.addEventListener('mousedown', (event) => {
      if (event.target.closest('.imagen')) {
        event.preventDefault();
      }

      if (event.target.closest('#galeria')) {
        isDragging = true;
        initialX = event.clientX;
        galeria.style.cursor = 'grabbing';
      }
    });

    galeria.addEventListener('mouseup', () => {
      isDragging = false;
      galeria.style.cursor = 'grab';
    });

    galeria.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const scrollSpeed = 1;
        const deltaX = initialX - event.clientX;
        galeria.scrollLeft += deltaX * scrollSpeed;
        initialX = event.clientX;
      }
    });
  });
}

function checkAndApplyLayout() {
  const windowWidth = window.innerWidth;
  const galerias = document.querySelectorAll('#galeria');

  if (windowWidth > 800) {
    initGallery();
  } else {
    galerias.forEach(galeria => {
      galeria.style.display = 'grid';
      galeria.style.gridTemplateColumns = '1fr';
      galeria.style.gap = '10px';

      const imagenes = galeria.querySelectorAll('.imagen img');
      imagenes.forEach(imagen => {
        imagen.style.width = '100%';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', checkAndApplyLayout);
window.addEventListener('resize', () => {
  // Utilizando setTimeout para ejecutar la función cada 500 milisegundos
  setTimeout(checkAndApplyLayout, 500);
});
