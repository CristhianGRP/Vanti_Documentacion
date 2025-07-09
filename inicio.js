/**
 * INICIO - JAVASCRIPT
 * PwC - Seguridad y Control de Identidades
 * Grupo Vanti - Gestión de Identidades y Accesos
 */

// Funciones de navegación
function navigateToManual(url) {
    // Mostrar indicador de carga
    showLoadingIndicator();
    
    // Navegar después de una breve animación
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

function showLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'loading-indicator';
    indicator.innerHTML = `
        <div class="spinner"></div>
        <span>Cargando manual...</span>
    `;
    document.body.appendChild(indicator);
    
    // Remover después de 2 segundos máximo
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 2000);
}

// Navegación suave a secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animaciones de entrada
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll(
        '.service-card, .team-card, .manual-card, .contact-method, .mission-content'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando PwC - Seguridad y Control de Identidades');
    
    // Inicializar funcionalidades
    initializeAnimations();
    
    // Mensaje de bienvenida en consola
    console.log(`
    ╔══════════════════════════════════════╗
    ║        PwC - Grupo Vanti             ║
    ║    Seguridad y Control de            ║
    ║        Identidades                   ║
    ║                                      ║
    ║    Desarrollado por:                 ║
    ║    Cristhian G. Rodriguez Parra     ║
    ╚══════════════════════════════════════╝
    `);
});

// Exportar funciones para uso global
window.navegacion = {
    navigateToManual,
    scrollToSection,
    showNotification
};

// Estilos dinámicos para las notificaciones
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.info {
        background: linear-gradient(135deg, #3b82f6, #1e40af);
    }

    .notification.success {
        background: linear-gradient(135deg, #10b981, #059669);
    }

    .notification.error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    .loading-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(31, 41, 55, 0.95);
        color: white;
        padding: 2rem 3rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        border: 1px solid var(--pwc-orange);
    }

    .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid rgba(255,165,0,0.3);
        border-top: 3px solid var(--pwc-orange);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Agregar estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);