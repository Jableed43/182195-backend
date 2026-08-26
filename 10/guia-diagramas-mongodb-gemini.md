# Guía: Diseño de esquema MongoDB con IA + Mermaid

Esta guía te ayuda a diseñar el esquema de tu base de datos NoSQL con ayuda de una IA (Gemini u otra), validarlo visualmente como diagrama, y recién después traducirlo a código MongoDB.

## Flujo de trabajo

1. Describís tu sistema en texto plano.
2. La IA te ayuda a definir colecciones, relaciones (referencia vs. embebido), enums y entidades transaccionales.
3. La IA te genera el código Mermaid del diagrama.
4. Lo renderizás en tu máquina con `generate_diagrams.ps1` para ver el resultado real.
5. Iterás con la IA mostrándole el resultado, hasta aprobar el diagrama.
6. Recién ahí le pedís el script de MongoDB basado en el diagrama ya aprobado.

No saltees pasos: pedir el código Mongo antes de validar el diagrama suele producir esquemas mal pensados (campos que deberían ser arrays, relaciones fijas que deberían ser transaccionales, etc.).

## Requisitos

- Node.js instalado (el script usa `npx` para correr `mermaid-cli`).
- El archivo `generate_diagrams.ps1`.

## Uso del script

```bash
.\generate_diagrams.ps1 -InputFile "ruta\al\archivo.mmd"
```

Esto genera `nombre-del-archivo.svg` y `nombre-del-archivo.png` en la misma carpeta.

---

## Prompt para usar con Gemini (u otra IA)

Copiá y pegá esto en el chat de la IA, completando el contexto de tu sistema:

```
Actuá como un asistente de modelado de bases de datos NoSQL (MongoDB). Vamos a trabajar en 3 etapas. No avances de una etapa a la siguiente hasta que yo te lo confirme.

CONTEXTO DEL SISTEMA
[Acá describís tu sistema: qué entidades tiene, qué hace cada una,
qué operaciones se necesitan. Ejemplo: "Es un sistema de turnos para un
consultorio. Hay Profesionales, Pacientes, Agenda de disponibilidad, Citas y
un Plan de indicaciones por paciente con detalles por día."]

ETAPA 1 — Modelo conceptual
Ayudame a identificar:
1. Qué colecciones necesito.
2. Para cada relación entre colecciones: ¿debería ser referencia (ObjectId)
   o subdocumento embebido? Explicame el criterio que usaste en cada caso
   (¿el dato vive y muere con el padre? ¿crece sin límite? ¿se consulta
   siempre junto o por separado?).
3. Si detectás algún atributo que debería ser un array de valores fijos
   (por ejemplo, "un campo por día de la semana"), proponeme convertirlo
   en un array de subdocumentos en vez de campos sueltos.
4. Si detectás algún atributo de tipo texto libre que en realidad tiene un
   conjunto cerrado de valores posibles (ej. un "estado"), avisame para
   tratarlo como Enum.
5. Si dos entidades deberían relacionarse pero no tiene sentido que una
   dependa fija de la otra, preguntame si hace falta una entidad
   intermedia/transaccional que las vincule.

Dame la lista de colecciones con sus atributos y el tipo de relación
(referencia o embebido) antes de escribir el diagrama.

ETAPA 2 — Diagrama Mermaid
Con el modelo ya acordado, generame el código Mermaid (formato classDiagram
o erDiagram) que representa el esquema, usando:
- +tipo nombreAtributo por cada campo
- <<embedded>> para subdocumentos embebidos
- notas (note for X) para aclarar los Enum
- flechas de composición (*--) para lo embebido, y flechas normales (-->)
  con cardinalidad ("1" / "N") para las referencias

Quiero poder pegar ese código en un archivo .mmd y generar el SVG/PNG con
mermaid-cli. Si el código tiene algún error de sintaxis Mermaid, avisame
antes de dártelo.

[Copiás el código en un archivo .mmd y corrés en tu máquina:]
.\generate_diagrams.ps1 -InputFile "ruta\al\archivo.mmd"

Te va a devolver un .svg y un .png. Revisá el resultado y volvé
con ajustes o preguntas.

ETAPA 3 — De Mermaid a MongoDB
Una vez que el diagrama esté validado y le confirmes a la IA "diagrama aprobado",
pedile que te ayude a traducirlo a:
1. Un script de MongoDB (mongosh) con db.createCollection() y validadores
   $jsonSchema que reflejen fielmente los tipos y Enums del diagrama.
2. Documentos de ejemplo (2 o 3 por colección) coherentes con las
   relaciones definidas (mismos ObjectId referenciados donde corresponda).

No inventes campos que no estén en el diagrama aprobado.
```

---

## Checklist antes de aprobar el diagrama

- [ ] ¿Cada relación embebida tiene sentido (el subdocumento no tiene entidad propia fuera del padre)?
- [ ] ¿Cada relación por referencia usa ObjectId y cardinalidad clara (1:1, 1:N, N:N)?
- [ ] ¿No quedaron campos "Lunes, Martes, Miercoles..." sueltos que deberían ser un array?
- [ ] ¿Los campos de texto libre que en realidad son un conjunto cerrado de opciones están marcados como Enum?
- [ ] ¿Las relaciones N:N tienen una entidad transaccional en el medio (no una FK fija de un lado al otro)?
