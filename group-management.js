/**
 * GESTIÓN DE GRUPOS - FUNCIONALIDAD JAVASCRIPT
 * Funcionalidades específicas para el manual de gestión de grupos
 * Grupo Vanti - Gestión de Identidades y Accesos
 */

class GroupManagement {
    constructor() {
        this.currentManual = 'group-management';
        this.init();
    }
    
    init() {
        // Esperar a que el DOM esté cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        console.log('🔧 Inicializando funcionalidades de Gestión de Grupos...');
        
        // Configurar el sidebar para este manual
        this.configureSidebar();
        
        // Inicializar funcionalidades específicas
        this.initGroupTypeCards();
        this.initPermissionMatrix();
        this.initNamingConventions();
        this.initDocumentationChecklist();
        this.initCodeBlocks();
        
        console.log('✅ Gestión de Grupos inicializada correctamente');
    }
    
    /**
     * Configura el sidebar para este manual
     */
    configureSidebar() {
        // Actualizar el manual actual en el sidebar cuando esté disponible
        const checkSidebar = () => {
            if (window.globalSidebar && window.globalSidebar.sidebar) {
                window.globalSidebar.updateCurrentManual('group-management');
                console.log('📚 Sidebar configurado para Gestión de Grupos');
            } else {
                setTimeout(checkSidebar, 500);
            }
        };
        
        checkSidebar();
    }
    
    /**
     * Inicializa las tarjetas de tipos de grupos
     */
    initGroupTypeCards() {
        const groupCards = document.querySelectorAll('.group-type-card');
        
        groupCards.forEach((card, index) => {
            // Animación de entrada escalonada
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Efecto hover mejorado
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-6px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Click para expandir información
            card.addEventListener('click', () => {
                this.showGroupTypeDetails(card);
            });
        });
        
        console.log('👥 Tarjetas de tipos de grupos inicializadas');
    }
    
    /**
     * Muestra detalles adicionales de un tipo de grupo
     */
    showGroupTypeDetails(card) {
        const groupType = card.className.includes('security') ? 'security' : 
                         card.className.includes('distribution') ? 'distribution' : 'universal';
        
        const details = {
            security: {
                title: 'Grupos de Seguridad',
                description: 'Los grupos de seguridad son la base del sistema de permisos en Active Directory.',
                features: [
                    'Pueden ser asignados a recursos del sistema',
                    'Aparecen en las listas de control de acceso (ACL)',
                    'Pueden contener usuarios, computadoras y otros grupos',
                    'Soportan anidamiento de grupos'
                ],
                examples: [
                    'GRP_FINANZAS_LECTORES',
                    'GRP_RRHH_ADMINISTRADORES',
                    'GRP_TI_OPERADORES'
                ]
            },
            distribution: {
                title: 'Grupos de Distribución',
                description: 'Utilizados principalmente para listas de correo y comunicación.',
                features: [
                    'No pueden ser asignados a recursos de seguridad',
                    'Optimizados para sistemas de correo',
                    'Pueden ser convertidos a grupos de seguridad',
                    'Ideales para comunicaciones masivas'
                ],
                examples: [
                    'DL_COMUNICADOS_GENERALES',
                    'DL_NOTICIAS_DEPARTAMENTO',
                    'DL_ALERTAS_SISTEMA'
                ]
            },
            universal: {
                title: 'Grupos Universales',
                description: 'Disponibles en todo el bosque de Active Directory.',
                features: [
                    'Replican a todos los Global Catalogs',
                    'Pueden contener miembros de cualquier dominio',
                    'Ideales para organizaciones multi-dominio',
                    'Mayor impacto en replicación'
                ],
                examples: [
                    'UG_ADMIN_GLOBAL',
                    'UG_LECTURA_CORPORATIVA',
                    'UG_BACKUP_OPERATORS'
                ]
            }
        };
        
        // Crear modal o expandir la tarjeta
        this.showModal(details[groupType]);
    }
    
    /**
     * Muestra un modal con información detallada
     */
    showModal(details) {
        // Crear modal si no existe
        let modal = document.getElementById('groupDetailsModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'groupDetailsModal';
            modal.className = 'group-modal';
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${details.title}</h3>
                    <button class="modal-close" onclick="this.closest('.group-modal').style.display='none'">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${details.description}</p>
                    <h4>Características:</h4>
                    <ul>
                        ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <h4>Ejemplos:</h4>
                    <ul>
                        ${details.examples.map(example => `<li><code>${example}</code></li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Cerrar con click fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    /**
     * Inicializa la matriz de permisos
     */
    initPermissionMatrix() {
        const permissionItems = document.querySelectorAll('.permission-item');
        
        permissionItems.forEach((item, index) => {
            // Animación de entrada
            item.style.animationDelay = `${index * 0.1}s`;
            
            // Efecto click para mostrar más información
            item.addEventListener('click', () => {
                this.showPermissionDetails(item);
            });
        });
        
        console.log('🔐 Matriz de permisos inicializada');
    }
    
    /**
     * Muestra detalles de un permiso específico
     */
    showPermissionDetails(item) {
        const permissionType = item.querySelector('h4').textContent;
        
        // Crear tooltip o expandir información
        let tooltip = item.querySelector('.permission-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'permission-tooltip';
            item.appendChild(tooltip);
        }
        
        const details = {
            '👁️ Lectura': 'Permite ver el contenido de archivos y carpetas sin poder modificarlos.',
            '✏️ Escritura': 'Permite crear nuevos archivos y carpetas en la ubicación especificada.',
            '🔧 Modificación': 'Permite cambiar el contenido y propiedades de archivos existentes.',
            '🔒 Control total': 'Otorga todos los permisos disponibles sobre el recurso.'
        };
        
        tooltip.textContent = details[permissionType] || 'Información no disponible';
        tooltip.style.display = 'block';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 3000);
    }
    
    /**
     * Inicializa las convenciones de nomenclatura
     */
    initNamingConventions() {
        const conventions = document.querySelectorAll('.convention-item');
        
        conventions.forEach(convention => {
            const codeElement = convention.querySelector('code');
            if (codeElement) {
                // Agregar funcionalidad de copia
                codeElement.addEventListener('click', () => {
                    this.copyToClipboard(codeElement.textContent);
                    this.showCopyFeedback(codeElement);
                });
                
                // Agregar cursor pointer
                codeElement.style.cursor = 'pointer';
                codeElement.title = 'Click para copiar';
            }
        });
        
        console.log('📝 Convenciones de nomenclatura inicializadas');
    }
    
    /**
     * Inicializa el checklist de documentación
     */
    initDocumentationChecklist() {
        const checklistItems = document.querySelectorAll('.checklist-item');
        
        checklistItems.forEach((item, index) => {
            // Animación de entrada
            item.style.animationDelay = `${index * 0.1}s`;
            
            // Efecto de completado
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                item.classList.add('completed');
            }
        });
        
        console.log('✅ Checklist de documentación inicializado');
    }
    
    /**
     * Inicializa los bloques de código
     */
    initCodeBlocks() {
        const codeBlocks = document.querySelectorAll('.code-block pre');
        
        codeBlocks.forEach(block => {
            // Agregar botón de copia
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-code-btn';
            copyBtn.innerHTML = '📋 Copiar';
            copyBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: var(--pwc-light-blue);
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // Hacer el contenedor relativo
            block.parentElement.style.position = 'relative';
            
            // Agregar el botón
            block.parentElement.appendChild(copyBtn);
            
            // Mostrar botón al hacer hover
            block.parentElement.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });
            
            block.parentElement.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });
            
            // Funcionalidad de copia
            copyBtn.addEventListener('click', () => {
                this.copyToClipboard(block.textContent);
                this.showCopyFeedback(copyBtn);
            });
        });
        
        console.log('💻 Bloques de código inicializados');
    }
    
    /**
     * Copia texto al portapapeles
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('📋 Texto copiado al portapapeles');
        }).catch(err => {
            console.error('❌ Error al copiar:', err);
        });
    }
    
    /**
     * Muestra feedback visual de copia
     */
    showCopyFeedback(element) {
        const originalText = element.textContent || element.innerHTML;
        const originalBackground = element.style.backgroundColor;
        
        // Cambiar temporalmente el contenido
        if (element.tagName === 'BUTTON') {
            element.innerHTML = '✅ Copiado!';
        }
        element.style.backgroundColor = '#10b981';
        
        // Restaurar después de 2 segundos
        setTimeout(() => {
            element.innerHTML = originalText;
            element.style.backgroundColor = originalBackground;
        }, 2000);
    }
    
    /**
     * Funciones para el inventario de grupos
     */
    
    /**
     * Muestra una categoría específica de grupos
     */
    showGroupCategory(category) {
        // Ocultar todas las categorías
        document.querySelectorAll('.group-category-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remover clase active de todos los botones
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // Mostrar la categoría seleccionada
        const selectedContent = document.getElementById(`${category}-groups`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Activar el botón correspondiente
        event.target.classList.add('active');
        
        // Actualizar estadísticas
        this.updateGroupStatistics(category);
        
        console.log(`📂 Mostrando categoría: ${category}`);
    }
    
    /**
     * Copia el nombre de un grupo al portapapeles
     */
    copyGroupName(groupName) {
        navigator.clipboard.writeText(groupName).then(() => {
            // Mostrar feedback visual
            this.showCopyFeedback(event.target, 'Copiado!');
        }).catch(err => {
            console.error('Error al copiar:', err);
            this.showCopyFeedback(event.target, 'Error');
        });
    }
    
    /**
     * Muestra feedback visual de copia
     */
    showCopyFeedback(button, message) {
        const originalText = button.innerHTML;
        button.innerHTML = message;
        button.style.background = '#10b981';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
    
    /**
     * Actualiza las estadísticas de grupos en una categoría
     */
    updateGroupStatistics(category) {
        const categoryElement = document.getElementById(`${category}-groups`);
        const totalGroups = categoryElement.querySelectorAll('tbody tr').length;
        
        // Actualizar el contador si existe
        const statsElement = categoryElement.querySelector('.group-stats');
        if (statsElement) {
            statsElement.textContent = `Total de grupos: ${totalGroups}`;
        }
    }
    
    /**
     * Busca grupos en todas las categorías
     */
    searchGroups() {
        const searchTerm = document.getElementById('groupSearch').value.toLowerCase();
        const activeCategory = document.querySelector('.group-category-content.active');
        const rows = activeCategory.querySelectorAll('tbody tr');
        
        let visibleCount = 0;
        
        rows.forEach(row => {
            const groupName = row.querySelector('td:first-child').textContent.toLowerCase();
            const description = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            
            if (groupName.includes(searchTerm) || description.includes(searchTerm)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Actualizar contador de resultados
        this.updateSearchResults(visibleCount);
    }
    
    /**
     * Actualiza el contador de resultados de búsqueda
     */
    updateSearchResults(count) {
        let resultsElement = document.getElementById('searchResults');
        if (!resultsElement) {
            resultsElement = document.createElement('div');
            resultsElement.id = 'searchResults';
            resultsElement.className = 'search-results';
            document.querySelector('.group-search-container').appendChild(resultsElement);
        }
        
        if (document.getElementById('groupSearch').value.trim() !== '') {
            resultsElement.textContent = `${count} grupo(s) encontrado(s)`;
            resultsElement.style.display = 'block';
        } else {
            resultsElement.style.display = 'none';
        }
    }
    
    /**
     * Limpia el campo de búsqueda y muestra todos los grupos
     */
    clearSearch() {
        document.getElementById('groupSearch').value = '';
        this.searchGroups();
    }
}

// Estilos CSS dinámicos para el modal
const modalStyles = `
    .group-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
    }
    
    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 0;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        animation: modalSlideIn 0.3s ease-out;
    }
    
    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-radius: 12px 12px 0 0;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--pwc-dark-blue);
        font-size: 1.3rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }
    
    .modal-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .modal-body h4 {
        color: var(--pwc-dark-blue);
        margin: 1rem 0 0.5rem 0;
        font-size: 1.1rem;
    }
    
    .modal-body ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
    }
    
    .modal-body li {
        margin-bottom: 0.5rem;
        color: var(--pwc-text);
    }
    
    .modal-body code {
        background: #f3f4f6;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
    }
    
    .permission-tooltip {
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1000;
        display: none;
    }
    
    .permission-tooltip::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #1f2937;
    }
    
    .permission-item {
        position: relative;
        cursor: pointer;
    }
    
    .checklist-item.completed {
        background: #f0f9ff;
        border-color: #0ea5e9;
    }
    
    @keyframes modalSlideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
        
        .modal-header, .modal-body {
            padding: 1rem;
        }
        
        .permission-tooltip {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            margin-top: 0.5rem;
            white-space: normal;
        }
        
        .permission-tooltip::before {
            display: none;
        }
    }
`;

// Agregar estilos al DOM
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
let groupManagement;

function initGroupManagement() {
    console.log('🔄 Inicializando Group Management...');
    groupManagement = new GroupManagement();
    
    // Configurar el manual current en el sidebar global
    setTimeout(() => {
        if (window.globalSidebar) {
            window.globalSidebar.currentManual = 'group-management';
        }
    }, 1000);
}

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGroupManagement);
} else {
    initGroupManagement();
}

// Funciones para el inventario de grupos
function showGroupCategory(category) {
    // Ocultar todas las categorías
    document.querySelectorAll('.group-category-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostrar la categoría seleccionada
    document.getElementById(category + '-groups').classList.add('active');
    
    // Activar el botón correspondiente
    event.target.classList.add('active');
    
    // Actualizar estadísticas
    updateGroupStatistics(category);
}

function copyGroupName(groupName) {
    navigator.clipboard.writeText(groupName).then(() => {
        // Mostrar feedback visual
        showCopyFeedback(event.target, 'Copiado!');
    }).catch(err => {
        console.error('Error al copiar:', err);
        showCopyFeedback(event.target, 'Error');
    });
}

function showCopyFeedback(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = message;
    button.style.background = '#10b981';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 2000);
}

function updateGroupStatistics(category) {
    const categoryElement = document.getElementById(category + '-groups');
    const totalGroups = categoryElement.querySelectorAll('tbody tr').length;
    
    // Actualizar el contador si existe
    const statsElement = categoryElement.querySelector('.group-stats');
    if (statsElement) {
        statsElement.textContent = `Total de grupos: ${totalGroups}`;
    }
}

function searchGroups() {
    const searchTerm = document.getElementById('groupSearch').value.toLowerCase();
    const activeCategory = document.querySelector('.group-category-content.active');
    const rows = activeCategory.querySelectorAll('tbody tr');
    
    let visibleCount = 0;
    
    rows.forEach(row => {
        const groupName = row.querySelector('td:first-child').textContent.toLowerCase();
        const description = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        
        if (groupName.includes(searchTerm) || description.includes(searchTerm)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Actualizar contador de resultados
    updateSearchResults(visibleCount);
}

function updateSearchResults(count) {
    let resultsElement = document.getElementById('searchResults');
    if (!resultsElement) {
        resultsElement = document.createElement('div');
        resultsElement.id = 'searchResults';
        resultsElement.className = 'search-results';
        document.querySelector('.group-search-container').appendChild(resultsElement);
    }
    
    if (document.getElementById('groupSearch').value.trim() !== '') {
        resultsElement.textContent = `${count} grupo(s) encontrado(s)`;
        resultsElement.style.display = 'block';
    } else {
        resultsElement.style.display = 'none';
    }
}

function clearSearch() {
    document.getElementById('groupSearch').value = '';
    searchGroups();
}

// Inicializar funciones del inventario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el buscador
    const searchInput = document.getElementById('groupSearch');
    if (searchInput) {
        searchInput.addEventListener('input', searchGroups);
    }
    
    // Configurar estadísticas iniciales
    updateGroupStatistics('ad');
    
    // Agregar eventos de teclado para el buscador
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchGroups();
            }
        });
    }
});

// Exportar funciones para uso global
window.showGroupCategory = showGroupCategory;
window.copyGroupName = copyGroupName;
window.searchGroups = searchGroups;
window.clearSearch = clearSearch;

// Exportar para uso global
window.GroupManagement = GroupManagement;
window.groupManagement = groupManagement;
