¡Me parece una idea espectacular! Esta guía les va a venir increíble a todos los alumnos, porque estas dudas suelen ser de las que frenan mucho el aprendizaje al principio (y muchos no se animan a preguntar).

Acá tenés la guía armada y estructurada con el mismo tono docente, lista para que la copies y la pegues en el canal de anuncios, Discord o el campus virtual:

***

# 🚀 Guía: Cómo estructurar tus proyectos en TypeScript (y no morir en el intento)

¡Hola a todos! A partir de varias consultas súper interesantes que me estuvieron haciendo, preparé esta guía rápida. Si al arrancar un proyecto desde cero no saben por dónde empezar, o sienten que al escribir código el editor se les llena de errores rojos por todos lados, ¡esto es para ustedes!

### 1. El fantasma del `tsconfig.json` ⚙️
Muchos se preocupan porque no saben configurar el `tsconfig.json` desde cero. **Les doy una buena noticia: es 100% normal.**
Cuando corren `npx tsc --init`, se genera un archivo gigante lleno de opciones. En la industria, es moneda corriente copiar un `tsconfig.json` ya pulido de un proyecto anterior (como el "custom" que les pasé, que está configurado exacto para nuestro entorno). Con el tiempo van a ir aprendiendo qué hace cada regla, pero hoy, copiarlo y enfocarse en la lógica está perfecto.

### 2. Identifiquen las "Entidades" antes de tipear 🧠
Antes de escribir la primera línea de código, tómense 5 minutos para pensar quiénes son las **Entidades** de su sistema. Una entidad es cualquier objeto o concepto clave de la realidad que están modelando (ej: `Auto`, `Motor`, `Concesionaria`). 

Acá está el secreto: aprendan a separar las entidades **Principales** de las **Menores**:
- **Principales:** Son el corazón del sistema (ej: `Concesionaria` o `Auto`). Si faltan, el problema que queremos resolver pierde sentido.
- **Menores / Secundarias:** Son piezas satélite o complementarias (ej: `TipoCombustible`, `Rueda`). Si falta una, el sistema general de la concesionaria no se rompe por completo.

### 3. La regla de oro: Codear de Menor a Mayor 🧱
Para que TypeScript no les tire errores extraños por usar cosas que "todavía no existen", tienen que construir su sistema desde las piezas más chiquitas e independientes hacia las más grandes. Mi receta recomendada es:
1. **Enums y Tipos:** Arrancan acá porque no dependen de nadie (ej: `TipoCombustible`).
2. **Interfaces:** Arman los contratos o "esqueletos" (pueden usar los enums acá adentro).
3. **Clases Menores / Base:** Arman las piezas individuales que implementan las interfaces (como `MotorBase` o `Chasis`).
4. **Clases Principales (Hijas / Contenedoras):** Arman el `Auto`, que al momento de crearlo ya va a tener listas todas sus partes (motor, ruedas, chasis) sin tirar error.
5. **App / Ejecución:** El archivo principal donde hacen sus `new Auto(...)` y ponen el sistema a funcionar.

### 4. Amíguense con los errores en rojo 🚨
El desarrollo de software **casi nunca es una línea recta**. Es lo más normal del mundo que estén armando el `Auto` y se den cuenta de que les faltó agregarle una propiedad a la interfaz del `Motor`, o que necesiten cambiar algo de privado a público.

Volver sobre sus pasos para adaptar una clase **no es un "error de aprendizaje"** ni significa que pensaron mal el diseño inicial; es la forma natural en la que trabajamos iterando el código. 

De hecho, cuando TypeScript les marca varias cosas en rojo tras hacer un cambio, no los está "retando". Véanlo como un asistente que les dice: *"Che, modificaste esta pieza acá, acordate de ir a ajustar esto otro para que siga encajando"*. TypeScript es una red de seguridad, ¡aprovéchenla!

¡Espero que les sirva este esquema para sus próximas prácticas! A seguir metiéndole.