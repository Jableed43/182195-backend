# Conceptos de SQL: Selección, Filtrado y Agrupamiento

Este documento explica los comandos y operadores clave de SQL vistos durante la práctica.

## 1. Comandos Básicos

- **SELECT**: Es el comando principal para recuperar información de una base de datos. Sirve para especificar **qué columnas** queremos ver en el resultado final. Usar `*` indica que queremos traer *todas* las columnas.
- **FROM**: Acompaña a `SELECT` e indica **de qué tabla(s)** queremos obtener esos datos.
- **AS (Alias)**: Permite renombrar temporalmente una columna en el resultado de la consulta. Esto no cambia el nombre en la base de datos, solo cómo se muestra en la pantalla (ej. `SELECT nombre AS primer_nombre`).

## 2. Filtrado de Filas (WHERE)

El comando **WHERE** permite filtrar las filas antes de mostrarlas o de realizar cualquier cálculo, basándose en condiciones que definimos.

### Operadores de Comparación
- `=`: Igual a.
- `<>` o `!=`: Distinto de.
- `>` y `>=`: Mayor / Mayor o igual a.
- `<` y `<=`: Menor / Menor o igual a.

### Operadores Lógicos
- **AND**: Obliga a que se cumplan **todas** las condiciones al mismo tiempo.
- **OR**: Exige que se cumpla **al menos una** de las condiciones.
  > [!TIP]
  > Cuando combines AND y OR en una misma consulta, usa siempre **paréntesis `()`** para agrupar y evitar errores de lógica, ya que el motor evalúa el AND primero.

### Operadores Especiales de Búsqueda
- **LIKE**: Busca patrones de texto. Se usa con comodines:
  - `%`: Representa cualquier cantidad de caracteres (cero o más). Ej: `LIKE 'M%'` busca textos que empiecen con M.
  - `_`: Representa exactamente un solo carácter.
- **BETWEEN**: Sirve para buscar dentro de un rango determinado de valores (fechas, números, letras). **Incluye** ambos extremos en su búsqueda (equivale a `>= valor1 AND <= valor2`).
- **IN**: Verifica si un valor se encuentra dentro de una lista específica que damos entre paréntesis. Ej: `IN (1, 2)`. Es más limpio que usar múltiples `OR`.
- **NOT**: Se utiliza para negar otro operador.
  - **NOT IN**: Excluye los resultados que coincidan con la lista proporcionada.

### El caso de los valores Nulos (NULL)
En SQL, `NULL` no es un texto, ni un cero; representa un estado de **"desconocido"** o "vacío".
- **Nunca se usa `=` con NULL** (`WHERE columna = NULL` no devuelve ningún error, pero falla en encontrar algo porque desconocido no es igual a desconocido).
- **IS NULL**: Es la forma correcta de buscar filas donde el valor esté vacío o falte.
- **IS NOT NULL**: Busca filas donde efectivamente exista un valor (no esté vacío).

## 3. Ordenamiento y Paginación

- **DISTINCT**: Elimina las filas duplicadas del resultado, mostrando únicamente los valores únicos.
- **ORDER BY**: Ordena las filas del resultado final en base a una o más columnas.
  - **ASC**: Orden ascendente (de menor a mayor, o de A-Z). Es el comportamiento por defecto.
  - **DESC**: Orden descendente (de mayor a menor, o de Z-A).
- **LIMIT**: Restringe el número de filas que se muestran en el resultado. Es muy útil junto con `ORDER BY` (ej: ver el "Top 5").
- **OFFSET**: Se usa junto con LIMIT para saltear una determinada cantidad de filas iniciales. Es la clave para implementar **paginación**.

## 4. Agregación y Agrupamiento

Estas herramientas permiten generar resúmenes estadísticos en lugar de devolver filas individuales.

### Funciones de Agregación
Siempre retornan un solo valor calculado a partir de varias filas. **Importante: Ignoran los valores NULL**.
- **COUNT()**: Cuenta la cantidad de filas.
  - `COUNT(*)`: Cuenta todas las filas, independientemente de sus valores.
  - `COUNT(columna)`: Cuenta solo las filas donde `columna` **no sea NULL**.
- **SUM()**: Suma todos los valores numéricos de una columna.
- **AVG()**: Calcula el promedio (la media) de una columna numérica.
- **MIN() / MAX()**: Devuelven el valor mínimo y máximo de una columna, respectivamente.

### GROUP BY
Se usa junto con las funciones de agregación para agrupar filas que tienen los mismos valores en ciertas columnas. En vez de devolver el cálculo para toda la tabla, devuelve **un cálculo por cada grupo** (ej: cantidad de inscriptos *por materia*).
> [!IMPORTANT]
> Regla de oro: Cualquier columna normal que aparezca en tu `SELECT` y no esté dentro de una función de agregación (como COUNT o SUM), **debe estar presente obligatoriamente en el `GROUP BY`**.

### HAVING
- **HAVING** filtra **grupos**, no filas individuales.
- **Diferencia con WHERE**: `WHERE` se ejecuta *antes* de agrupar y filtrar filas individuales; `HAVING` se ejecuta *después* de que los grupos (GROUP BY) y las métricas agregadas ya se calcularon. Nunca puedes usar un COUNT o AVG dentro de un `WHERE`.
