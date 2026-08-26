param(
    [string]$InputFile
)

<#
SINOPSIS:
    Script para generar diagramas SVG y PNG (Alta Calidad) desde archivos Mermaid (.mmd o .md).

USO:
    1. Ejecución por defecto (Actualiza el proyecto SePrise):
       .\generate_diagrams.ps1

    2. Para un archivo específico (el archivo puede estar en cualquier ubicación):
       .\generate_diagrams.ps1 -InputFile "archivo.mmd"
       .\generate_diagrams.ps1 -InputFile "C:\Ruta\Absoluta\diagrama.mmd"
       .\generate_diagrams.ps1 -InputFile "..\Ruta\Relativa\notas.md"

REQUISITOS:
    - Node.js instalado (utiliza npx para ejecutar mermaid-cli).
#>

# Validar que Node.js y npx estén disponibles
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js no está instalado o no se encuentra en el PATH. Instalalo desde https://nodejs.org"
    exit 1
}
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Error "npx no está disponible. Asegurate de tener Node.js >= 5.2 instalado correctamente."
    exit 1
}

# Configuración de comando
$mermaid_cli = "npx -y @mermaid-js/mermaid-cli"

if ($InputFile) {
    if (Test-Path $InputFile) {
        $BaseName = [System.IO.Path]::GetFileNameWithoutExtension($InputFile)
        Write-Host "Procesando: $InputFile" -ForegroundColor Cyan
        
        # Generar SVG y PNG (Escala 3 para alta calidad)
        Invoke-Expression "$mermaid_cli -i $InputFile -o ${BaseName}.svg"
        Invoke-Expression "$mermaid_cli -i $InputFile -o ${BaseName}.png -s 3"
        
        # Corregir sufijos -1 que agrega mermaid-cli al extraer de archivos .md
        if (Test-Path "${BaseName}-1.svg") { Move-Item "${BaseName}-1.svg" "${BaseName}.svg" -Force }
        if (Test-Path "${BaseName}-1.png") { Move-Item "${BaseName}-1.png" "${BaseName}.png" -Force }
        
        Write-Host "Generados: ${BaseName}.svg y ${BaseName}.png" -ForegroundColor Green
    } else {
        Write-Error "El archivo '$InputFile' no existe."
    }
} else {
    # Comportamiento por defecto (Proyecto SePrise)
    Write-Host "Generando diagramas del proyecto..." -ForegroundColor Cyan
    Invoke-Expression "$mermaid_cli -i diagrama.mmd -o db/esquema_db_seprise.svg"
    Invoke-Expression "$mermaid_cli -i diagrama.mmd -o db/esquema_db_seprise.png -s 3"
    Invoke-Expression "$mermaid_cli -i diagrama_final.md -o diagrama_logico_final.svg"
    Invoke-Expression "$mermaid_cli -i diagrama_final.md -o diagrama_logico_final.png -s 3"
    
    if (Test-Path diagrama_logico_final-1.svg) { Move-Item diagrama_logico_final-1.svg diagrama_logico_final.svg -Force }
    if (Test-Path diagrama_logico_final-1.png) { Move-Item diagrama_logico_final-1.png diagrama_logico_final.png -Force }
    
    Write-Host "Diagramas del proyecto actualizados." -ForegroundColor Green
}
