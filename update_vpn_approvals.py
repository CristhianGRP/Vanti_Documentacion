import re

# Leer el archivo HTML
with open('group-management.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Definir las aprobaciones para grupos VPN específicos
vpn_approvals = {
    'GUSAVPNVEFGERESFE': 'Supervisor Finanzas',
    'GUSAVPNVGCGNVTE': 'Supervisor Grandes Clientes',
    'GUSAVPNVTIPERIFE': 'Supervisor TI',
    'GUSAVPNVTIIKUNACE': 'Supervisor TI',
    'GUSAVPNADMTIDA': 'Administrador TI',
    'GUSAVPNVTDOCSAPE': 'Supervisor SAP',
    'GUSAVPNVTDOCSAPC4CE': 'Supervisor SAP',
    'GUSAVPNVTDME': 'Supervisor Técnico',
    'GUSAVPNVTPCGAACTCARE': 'Supervisor Técnico',
    'GUSAVPNVTPCGACAPREDE': 'Supervisor Técnico',
    'GUSAVPNVTGMPCCE': 'Supervisor Técnico',
    'GUSAVPNVHCSINTCAPE': 'Supervisor Comercial',
    'GUSAVPNVHCSINTCECE': 'Supervisor Comercial',
    'GUSAVPNVHCECMPSE': 'Supervisor Comercial',
    'GUSAVPNVHCOCSUSPRECE': 'Supervisor Comercial',
    'GUSAVPNVHCDNNROE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRGZGNSATSNE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRGZOSATSNE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRGZOSATE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRVANTSATSNE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRGCUNSATSNE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRALTCUNSATE': 'Supervisor Comercial',
    'GUSAVPNVHCDMRNUEDFSATE': 'Supervisor Comercial',
    'GUSAVPNVHCPGROUPCOSTEMPE': 'Supervisor Comercial',
    'GUSAVPNVTMTOCALGE': 'Javier Cañón',
    'GUSAVPNVTOREME': 'Javier Cañón',
    'GUSAVPNVTCE': 'Javier Cañón',
    'GUSAVPNTILBUTG400E': 'Javier Cañón',
    'GUSAVPNTLBANMETE': 'Javier Cañón',
    'GUSAVPNTLBGMPMIE': 'Javier Cañón',
    'GUSAVPNVHCDMRE': 'Javier Cañón',
    'GUSAVPNVTITIVADME': 'Supervisor TIVIT',
    'GUSAVPNPRESIDENTP': 'Asistente Presidencia',
    'GUSAVPNVGCPQR': 'Supervisor Grandes Clientes',
    'GUSAVPNVTIPWCE': 'Supervisor PWC',
    'GUSAVPNVTIAYESAE': 'Supervisor AYESA',
    'GUSAVPNVTIPWCSLSE': 'Supervisor PWC'
}

# Actualizar cada grupo VPN con su aprobación correspondiente
for group_name, approver in vpn_approvals.items():
    # Patrón para encontrar la fila del grupo VPN que no tiene columna de aprobación
    pattern = f'(<td><code>{re.escape(group_name)}</code></td>.*?<td>.*?</td>)(\s*<td><button class="action-btn")'
    replacement = f'$1<td><span class="approval-tag person">{approver}</span></td>$2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Escribir el archivo actualizado
with open('group-management.html', 'w', encoding='utf-8') as file:
    file.write(content)

print("Actualización completada - Todas las filas VPN ahora tienen columna de aprobación")
