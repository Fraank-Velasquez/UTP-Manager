document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btnAlternarMenu');
    const iconoMenu = document.getElementById('iconoMenu');
    const menuLateral = document.getElementById('menuLateral');
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');
    const enlacesMenu = document.querySelectorAll('.nav-link');

    // Alternar Menú
    btnMenu.addEventListener('click', () => {
        menuLateral.classList.toggle('collapsed');
        if (menuLateral.classList.contains('collapsed')) {
            iconoMenu.classList.replace('bi-arrow-left', 'bi-list');
        } else {
            iconoMenu.classList.replace('bi-list', 'bi-arrow-left');
        }
    });

    // Cargar módulo 
    const cargarModulo = async (nombreModulo) => {
        try {
            const respuesta = await fetch(`modulos/${nombreModulo}.html`);
            if (respuesta.ok) {
                const contenidoHtml = await respuesta.text();

                //Eliminar modales de módulos anteriores que se hayan movido al body
                const modalesPrevios = document.querySelectorAll('body > .modal:not(#modalConfirmarEliminacion)');
                modalesPrevios.forEach(m => m.remove());

                // Cargar el nuevo HTML en el contenedor principal
                contenedorPrincipal.innerHTML = contenidoHtml;

                // Mover los nuevos modales directamente al body
                const nuevosModales = contenedorPrincipal.querySelectorAll('.modal');
                nuevosModales.forEach(modal => {
                    document.body.appendChild(modal);
                });

                // Ejecutar la interactividad según el módulo cargado
                if (nombreModulo === 'proyectos') iniciarModuloProyectos();

                if (nombreModulo === 'calendario') iniciarModuloCalendario();
                if (nombreModulo === 'tareas') iniciarModuloTareas();
            } else {
                contenedorPrincipal.innerHTML = `<h3 class="text-danger">Error cargando el módulo para la exposición.</h3>`;
            }
        } catch (error) {
            console.error("Error al cargar el módulo:", error);
        }
    };

    // Navegación
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            enlacesMenu.forEach(nav => nav.classList.remove('active'));
            enlace.classList.add('active');

            const modulo = enlace.getAttribute('data-modulo');
            cargarModulo(modulo);
        });
    });

    // Cargar el inicio por defecto
    cargarModulo('inicio');
});