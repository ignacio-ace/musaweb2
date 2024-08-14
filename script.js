document.addEventListener('DOMContentLoaded', function() {
    const svgObject = document.getElementById('interactive-svg');

    svgObject.addEventListener('load', function() {
        const svgDoc = svgObject.contentDocument;

        if (!svgDoc) {
            console.error('Error: El contenido del SVG no se cargó correctamente.');
            return;
        }

        const path = svgDoc.getElementById('Path 16');

        if (!path) {
            console.warn('Advertencia: No se encontró el elemento <path> con el ID especificado.');
            return;
        }

        const maskId = 'path-mask';
        const mask = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'mask');
        mask.setAttribute('id', maskId);

        const rect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '171.5'); 
        rect.setAttribute('y', '601.6');
        rect.setAttribute('width', '100'); 
        rect.setAttribute('height', '100');
        rect.setAttribute('fill', 'white');

        mask.appendChild(rect);
        svgDoc.querySelector('defs').appendChild(mask);

        path.setAttribute('mask', `url(#${maskId})`);

        path.addEventListener('mouseenter', function() {
            
            path.style.fill = 'red'; 
        });

        path.addEventListener('mouseleave', function() {
            
            path.style.fill = ''; 
        });
    });
});
