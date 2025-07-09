// Script para el Manual de Proceso - Creación de Usuario en Active Directory

document.addEventListener('DOMContentLoaded', function() {
    // Agregar funcionalidad de impresión
    addPrintButton();
    
    // Agregar animaciones suaves al scroll
    addSmoothScrolling();
    
    // Agregar funcionalidad de copiado para bloques de código
    addCopyCodeFunctionality();
    
    // Agregar navegación suave para los botones de navegación rápida
    addQuickNavigation();
    
    // Agregar indicador de progreso de lectura
    addReadingProgress();
});

function addPrintButton() {
    const header = document.querySelector('.pwc-header');
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Imprimir Manual';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: var(--pwc-orange);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.3s ease;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseover', function() {
        this.style.background = '#FF7A00';
    });
    
    printButton.addEventListener('mouseout', function() {
        this.style.background = 'var(--pwc-orange)';
    });
    
    header.style.position = 'relative';
    header.appendChild(printButton);
}

function addSmoothScrolling() {
    // Agregar navegación suave entre secciones
    const sections = document.querySelectorAll('.process-step');
    
    sections.forEach((section, index) => {
        section.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                this.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

function addCopyCodeFunctionality() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copiar';
        copyButton.className = 'copy-btn';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--pwc-light-blue);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        block.addEventListener('mouseenter', function() {
            copyButton.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', function() {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('pre').textContent;
            navigator.clipboard.writeText(code).then(function() {
                copyButton.innerHTML = '✅ Copiado';
                copyButton.style.background = '#10B981';
                
                setTimeout(function() {
                    copyButton.innerHTML = '📋 Copiar';
                    copyButton.style.background = 'var(--pwc-light-blue)';
                }, 2000);
            });
        });
    });
}

function addQuickNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addReadingProgress() {
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: var(--pwc-orange);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Actualizar progreso al hacer scroll
    window.addEventListener('scroll', function() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}
