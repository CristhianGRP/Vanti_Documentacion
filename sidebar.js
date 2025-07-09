/**
 * SIDEBAR GLOBAL - FUNCIONALIDAD JAVASCRIPT
 * Sistema de navegación modular para manuales de proceso
 * Grupo Vanti - Gestión de Identidades y Accesos
 */

class GlobalSidebar {
    constructor() {
        this.sidebar = null;
        this.overlay = null;
        this.openBtn = null;
        this.closeBtn = null;
        this.isOpen = false;
        this.currentManual = 'user-creation'; // Manual actual por defecto
        
        this.init();
    }
    
    /**
     * Inicializa el sidebar
     */
    init() {
        // Esperar a que el DOM esté cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    /**
     * Configuración inicial del sidebar
     */
    setup() {
        // Como el HTML ya está incluido en la página, solo obtenemos las referencias
        this.getElements();
        
        // Si no encontramos los elementos, intentamos cargar desde archivo
        if (!this.sidebar) {
            this.loadSidebarContent();
        } else {
            this.bindEvents();
            console.log('✅ Global Sidebar inicializado correctamente');
        }
    }
    
    /**
     * Crea los elementos del DOM si no existen
     */
    createElements() {
        // Verificar si ya existe el sidebar en el DOM
        if (document.getElementById('globalSidebar')) {
            this.getElements();
            this.bindEvents();
            return true;
        }
        
        // Si no existe, intentar cargar desde archivo
        this.loadSidebarContent();
        return false;
    }
    
    /**
     * Obtiene las referencias a los elementos del DOM
     */
    getElements() {
        this.sidebar = document.getElementById('globalSidebar');
        this.overlay = document.getElementById('sidebarOverlay');
        this.openBtn = document.getElementById('openSidebar');
        this.closeBtn = document.getElementById('closeSidebar');
    }
    
    /**
     * Carga el contenido HTML del sidebar
     */
    loadSidebarContent() {
        // Si existe un archivo sidebar.html, cargarlo
        fetch('./sidebar.html')
            .then(response => response.text())
            .then(html => {
                // Crear un contenedor temporal
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Agregar los elementos al body
                document.body.appendChild(tempDiv);
                
                // Obtener las referencias después de cargar
                setTimeout(() => {
                    this.getElements();
                    this.bindEvents();
                }, 100);
            })
            .catch(error => {
                console.warn('No se pudo cargar sidebar.html:', error);
                this.createFallbackSidebar();
            });
    }
    
    /**
     * Crea un sidebar básico si no se puede cargar el archivo HTML
     */
    createFallbackSidebar() {
        const sidebarHTML = `
            <div id="globalSidebar" class="global-sidebar">
                <div class="sidebar-header">
                    <h3>📚 Manuales</h3>
                    <button id="closeSidebar" class="close-btn">&times;</button>
                </div>
                <div class="sidebar-content">
                    <div class="sidebar-section">
                        <h4>🔧 Manual Actual</h4>
                        <div class="manual-item active">
                            <span class="manual-icon">🆔</span>
                            <div class="manual-info">
                                <div class="manual-title">Creación de Usuario en AD</div>
                                <div class="manual-subtitle">Active Directory</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button id="openSidebar" class="sidebar-toggle-btn">
                <span class="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <span class="toggle-text">Manuales</span>
            </button>
            <div id="sidebarOverlay" class="sidebar-overlay"></div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        this.getElements();
    }
    
    /**
     * Vincula los eventos del sidebar
     */
    bindEvents() {
        // Intentar obtener elementos si no los tenemos
        if (!this.sidebar || !this.overlay || !this.openBtn || !this.closeBtn) {
            this.getElements();
        }
        
        // Si aún no tenemos los elementos, esperar un poco más
        if (!this.sidebar || !this.overlay || !this.openBtn || !this.closeBtn) {
            console.warn('⚠️ Elementos del sidebar no encontrados, reintentando...');
            setTimeout(() => this.bindEvents(), 500);
            return;
        }
        
        console.log('🔗 Vinculando eventos del sidebar...');
        
        // Abrir sidebar
        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🖱️ Click en botón abrir sidebar');
            this.open();
        });
        
        // Cerrar sidebar
        this.closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🖱️ Click en botón cerrar sidebar');
            this.close();
        });
        
        // Cerrar con overlay
        this.overlay.addEventListener('click', () => {
            console.log('🖱️ Click en overlay');
            this.close();
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                console.log('⌨️ Tecla Escape presionada');
                this.close();
            }
        });
        
        // Navegación entre manuales
        this.bindManualNavigation();
        
        // Prevenir scroll del body cuando el sidebar está abierto
        this.preventBodyScroll();
        
        console.log('✅ Eventos del sidebar vinculados correctamente');
    }
    
    /**
     * Vincula la navegación entre manuales
     */
    bindManualNavigation() {
        const manualItems = document.querySelectorAll('.manual-item[data-manual]');
        
        manualItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (item.classList.contains('disabled')) {
                    this.showComingSoon(item);
                    return;
                }
                
                const manualId = item.dataset.manual;
                this.navigateToManual(manualId, item);
            });
        });
    }
    
    /**
     * Navega a un manual específico
     */
    navigateToManual(manualId, itemElement) {
        // Agregar estado de carga
        itemElement.classList.add('loading');
        
        // Obtener la URL del manual
        const manualUrl = itemElement.dataset.url;
        
        if (manualUrl) {
            // Simular navegación con delay para mostrar el loading
            setTimeout(() => {
                // Remover estado de carga
                itemElement.classList.remove('loading');
                
                // Actualizar manual actual
                this.updateCurrentManual(manualId);
                
                // Cerrar sidebar
                this.close();
                
                // Navegar a la nueva página
                console.log(`📋 Navegando al manual: ${manualId} -> ${manualUrl}`);
                window.location.href = manualUrl;
            }, 800);
        } else {
            // Si no hay URL, mantener el comportamiento anterior
            setTimeout(() => {
                itemElement.classList.remove('loading');
                this.updateCurrentManual(manualId);
                this.close();
                console.log(`📋 Manual seleccionado: ${manualId} (mismo archivo)`);
            }, 800);
        }
    }
    
    /**
     * Actualiza el manual actual
     */
    updateCurrentManual(manualId) {
        // Remover clase active de todos los items
        document.querySelectorAll('.manual-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Agregar clase active al item seleccionado
        const selectedItem = document.querySelector(`[data-manual="${manualId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }
        
        this.currentManual = manualId;
    }
    
    /**
     * Muestra mensaje de "próximamente"
     */
    showComingSoon(itemElement) {
        const originalSubtitle = itemElement.querySelector('.manual-subtitle').textContent;
        const subtitleElement = itemElement.querySelector('.manual-subtitle');
        
        // Animar el mensaje
        subtitleElement.style.color = '#f59e0b';
        subtitleElement.textContent = '🚧 Próximamente disponible';
        
        // Agregar efecto visual
        itemElement.style.transform = 'scale(0.98)';
        
        // Restaurar después de 2 segundos
        setTimeout(() => {
            subtitleElement.style.color = '';
            subtitleElement.textContent = originalSubtitle;
            itemElement.style.transform = '';
        }, 2000);
    }
    
    /**
     * Previene el scroll del body cuando el sidebar está abierto
     */
    preventBodyScroll() {
        const originalOverflow = document.body.style.overflow;
        
        // Observer para cambios en la clase active del sidebar
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (this.sidebar.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = originalOverflow;
                    }
                }
            });
        });
        
        if (this.sidebar) {
            observer.observe(this.sidebar, { attributes: true });
        }
    }
    
    /**
     * Abre el sidebar
     */
    open() {
        console.log('🚀 Intentando abrir sidebar...', {
            isOpen: this.isOpen,
            sidebar: !!this.sidebar,
            overlay: !!this.overlay
        });
        
        if (this.isOpen) {
            console.log('⚠️ Sidebar ya está abierto');
            return;
        }
        
        if (!this.sidebar || !this.overlay) {
            console.error('❌ Elementos del sidebar no encontrados');
            return;
        }
        
        this.sidebar.classList.add('active');
        this.overlay.classList.add('active');
        this.isOpen = true;
        
        // Ocultar el botón de apertura
        if (this.openBtn) {
            this.openBtn.style.opacity = '0';
            this.openBtn.style.visibility = 'hidden';
            this.openBtn.style.transform = 'translateX(-100px)';
            this.openBtn.style.pointerEvents = 'none';
        }
        
        console.log('✅ Sidebar abierto correctamente');
        
        // Analytics o tracking
        this.trackEvent('sidebar_opened');
    }
    
    /**
     * Cierra el sidebar
     */
    close() {
        if (!this.isOpen) return;
        
        this.sidebar.classList.remove('active');
        this.overlay.classList.remove('active');
        this.isOpen = false;
        
        // Mostrar el botón de apertura nuevamente
        if (this.openBtn) {
            this.openBtn.style.opacity = '1';
            this.openBtn.style.visibility = 'visible';
            this.openBtn.style.transform = 'translateX(0)';
            this.openBtn.style.pointerEvents = 'auto';
        }
        
        // Analytics o tracking
        this.trackEvent('sidebar_closed');
        
        console.log('✅ Sidebar cerrado correctamente');
    }
    
    /**
     * Alterna el estado del sidebar
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    /**
     * Tracking de eventos (opcional)
     */
    trackEvent(eventName, data = {}) {
        // Aquí puedes agregar tu sistema de analytics
        console.log(`📊 Evento: ${eventName}`, data);
        
        // Ejemplo para Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, {
        //         event_category: 'sidebar',
        //         ...data
        //     });
        // }
    }
    
    /**
     * Métodos públicos para uso externo
     */
    
    /**
     * Agrega un nuevo manual al sidebar
     */
    addManual(config) {
        const { id, title, subtitle, icon, category, enabled = true, url } = config;
        
        // Buscar o crear la sección de categoría
        let section = document.querySelector(`[data-category="${category}"]`);
        if (!section) {
            section = this.createSection(category);
        }
        
        // Crear el item del manual
        const manualItem = document.createElement('div');
        manualItem.className = `manual-item ${enabled ? '' : 'disabled'}`;
        manualItem.setAttribute('data-manual', id);
        if (url) manualItem.setAttribute('data-url', url);
        
        manualItem.innerHTML = `
            <span class="manual-icon">${icon}</span>
            <div class="manual-info">
                <div class="manual-title">${title}</div>
                <div class="manual-subtitle">${subtitle}</div>
            </div>
        `;
        
        section.appendChild(manualItem);
        this.bindManualNavigation(); // Re-vincular eventos
    }
    
    /**
     * Crea una nueva sección en el sidebar
     */
    createSection(categoryName) {
        const section = document.createElement('div');
        section.className = 'sidebar-section';
        section.setAttribute('data-category', categoryName);
        
        const header = document.createElement('h4');
        header.textContent = categoryName;
        
        section.appendChild(header);
        this.sidebar.querySelector('.sidebar-content').appendChild(section);
        
        return section;
    }
}

// Inicializar el sidebar global cuando se carga el script
let globalSidebar;

// Función de inicialización
function initSidebar() {
    console.log('🔄 Inicializando Global Sidebar...');
    globalSidebar = new GlobalSidebar();
    
    // Verificar que se inicializó correctamente
    setTimeout(() => {
        if (globalSidebar.sidebar && globalSidebar.openBtn) {
            console.log('✅ Global Sidebar listo para usar');
        } else {
            console.error('❌ Error al inicializar Global Sidebar');
        }
    }, 1000);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
} else {
    initSidebar();
}

// Exportar para uso global
window.GlobalSidebar = GlobalSidebar;
window.globalSidebar = globalSidebar;
