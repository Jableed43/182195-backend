¿Que es npx?
Cuando vos instalas algo usas npm (node package manager)
Cuando vos lo tenes instalado en la maquina usas npx, que accede a los paquetes instalados globalmente

1- Directa (recomendada para desarrollo):
tsx -> se instala de forma global con "npm i --global tsx"
npx tsx index.ts

2- Clasica pero es mas lenta (necesita un proyecto de node)
ts-node -> se instala de forma global con "npm i --global ts-node"

3- Tradicional
tsc -> Prepara el codigo antes de mandarlo a produccion, hace dos pasos.
Crea un archivo en js desde ts para poder ejecutarlo.
tsc se instala con "npm i --global tsc"
