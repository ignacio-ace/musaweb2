document.addEventListener('DOMContentLoaded', function() {
  const svgObject = document.getElementById('interactive-svg');
  const tooltip = document.getElementById('tooltip');

  svgObject.addEventListener('load', function() {
      const svgDoc = svgObject.contentDocument;

      if (!svgDoc) {
          console.error('Error: El contenido del SVG no se cargó correctamente.');
          return;
      }

      const pathIds = ['Path 123', 'Path 124', 'Path 125', 'Path 126', 'Path 127']; 

      const areaInfo = {
          'Path 123': 'Información del área 123',
          'Path 124': 'Información del área 124',
          'Path 125': 'Información del área 125',
          'Path 126': 'Información del área 126',
          'Path 127': 'Información del área 127',
          'Path 128': 'Información del área 128'
      };

      function createOverlay(pathId) {
          const path = svgDoc.getElementById(pathId);

          if (!path) {
              console.warn(`Advertencia: No se encontró el elemento <path> con el ID ${pathId}.`);
              return;
          }

          const bbox = path.getBBox();

          const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rectElement.setAttribute('x', bbox.x);
          rectElement.setAttribute('y', bbox.y);
          rectElement.setAttribute('width', bbox.width);
          rectElement.setAttribute('height', bbox.height);
          rectElement.setAttribute('fill', 'transparent');
          rectElement.classList.add('rect-overlay');

          path.parentNode.insertBefore(rectElement, path);

          const overlay = path.cloneNode(true);
          overlay.setAttribute('fill', 'red');
          overlay.setAttribute('opacity', '0');
          overlay.classList.add('overlay');

          path.parentNode.appendChild(overlay);

          let leaveTimeout;

          rectElement.addEventListener('mouseenter', function(event) {
              clearTimeout(leaveTimeout);
              overlay.setAttribute('opacity', '0.5'); 
              rectElement.setAttribute('fill', 'rgba(255, 0, 0, 0.3)'); 
              tooltip.innerHTML = areaInfo[pathId];
              tooltip.classList.add('show');
              tooltip.style.left = `${event.clientX + 15}px`;
              tooltip.style.top = `${event.clientY + 15}px`;
              rectElement.style.cursor = 'pointer';
          });

          rectElement.addEventListener('mousemove', function(event) {
              tooltip.style.left = `${event.clientX + 15}px`;
              tooltip.style.top = `${event.clientY + 15}px`;
          });

          rectElement.addEventListener('mouseleave', function() {
              leaveTimeout = setTimeout(() => {
                  overlay.setAttribute('opacity', '0'); 
                  rectElement.setAttribute('fill', 'transparent'); 
                  tooltip.classList.remove('show');
              }, 1000); 
          });
      }

     
      pathIds.forEach(createOverlay);
  });
});
