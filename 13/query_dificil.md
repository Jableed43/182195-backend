Aquí tienes el resumen completo del *pipeline* de agregación explicado paso a paso, integrando el flujo de ejecución y las analogías trabajadas:

```javascript
db.producto.aggregate([
  { $group: { _id: "$precio" } },
  { $sort: { _id: 1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "producto",
      localField: "_id",
      foreignField: "precio",
      as: "productos"
    }
  },
  { $unwind: "$productos" },
  {
    $project: {
      _id: 0,
      nombre: "$productos.nombre",
      precio: "$productos.precio"
    }
  }
])

```

---

### ¿Qué resuelve la consulta?

Obtiene **el nombre y el precio de los productos correspondientes a los 5 precios más bajos** de la colección.

---

### Paso a paso del proceso

1. **`$group: { _id: "$precio" }`**
* **Acción:** Agrupa la colección por el valor del campo `precio`.
* **Efecto:** Elimina precios repetidos y devuelve una lista de valores únicos de precio.


2. **`$sort: { _id: 1 }`**
* **Acción:** Ordena los valores agrupados de forma ascendente (`1`).
* **Efecto:** Coloca los precios más bajos al principio de la lista.


3. **`$limit: 5`**
* **Acción:** Recorta la transmisión de datos a las primeras 5 filas.
* **Efecto:** Se conserva únicamente un listado con los 5 precios más chicos.


4. **`$lookup` (Equivalente a un `LEFT JOIN` / Subconsulta)**
* **Acción:** Toma cada uno de esos 5 precios (`localField: "_id"`) y realiza una búsqueda cruzada sobre la misma colección `producto` (`foreignField: "precio"`).
* **Efecto:** Trae los datos completos de todos los artículos que valen ese monto y los guarda dentro de un array llamado `productos`.


5. **`$unwind: "$productos"` (Aplanado de arrays)**
* **Acción:** Desempaqueta el array `productos`. A diferencia del *spread operator* en JS (que expande valores dentro de una misma estructura), `$unwind` **duplica el documento contenedor** por cada elemento del array.
* **Efecto:** Convierte las listas internas en documentos independientes de nivel superior.


6. **`$project`**
* **Acción:** Define la estructura final de salida.
* **Efecto:** Oculta el identificador (`_id: 0`) y mapea únicamente las propiedades `nombre` y `precio` de cada producto extraído.