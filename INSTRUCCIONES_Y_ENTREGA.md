# 📖 Guía de Uso y Entrega Académica: Árbol Binario de Búsqueda (ABB) con IA

Esta guía detalla cómo utilizar todas las funciones de la aplicación interactiva y los métodos recomendados para compartir y presentar la práctica a tu profesor.

---

## 🔗 1. Enlace para Compartir con el Profesor

Para que el profesor pueda acceder directamente a la aplicación interactiva en cualquier momento y dispositivo (sin necesidad de instalar nada en su computadora), compártele el siguiente enlace:

* **Enlace Público para el Profesor:**  
  👉 **`https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app`**

*(Este enlace ejecuta la versión compartida y estable de la aplicación con todos los visualizadores, recorridos y casos de prueba listos para evaluación).*

---

## 🎯 2. Cómo Usar la Aplicación Paso a Paso

La aplicación está organizada en una barra de navegación superior con 6 secciones diseñadas para cubrir exactamente la rúbrica de la práctica:

### 🌳 Pestaña 1: Simulador y Visualizador en Vivo
1. **Entrada de Texto:**
   - Escribe cualquier palabra, frase o texto largo en el área de texto, o haz clic en los botones rápidos de **Presets** (como *Caso 1: gato perro casa*, *Caso 2: zorro árbol abeja*, etc.).
2. **Reglas de Procesamiento:**
   - **Normalizar a minúsculas:** Unifica términos como *Python* y *python* en un solo nodo.
   - **Limpiar signos ortográficos:** Elimina signos como `¡!`, `¿?`, `,`, `.`, sin alterar tildes ni la letra `ñ`.
   - **Orden español (localeCompare):** Compara usando las reglas del español. Si lo desmarcas, se activa la comparación ASCII estándar que demuestra el error de la tilde.
3. **Métricas en Tiempo Real:**
   - Observa inmediatamente el total de palabras procesadas, nodos únicos en el árbol, palabras duplicadas, nodos hoja (sin descendientes), nodos internos y altura del árbol.
4. **Visualizador Dinámico SVG:**
   - **Mover y Acercar:** Haz clic y arrastra sobre el lienzo para mover el árbol; usa los botones de lupa `+` y `-` para acercar o alejar.
   - **Inspeccionar Nodo:** Haz clic sobre cualquier círculo del árbol para ver su nivel, su frecuencia (`×N`), su clasificación (Raíz, Interno o Hoja) y sus hijos izquierdo y derecho.
   - **Buscar Palabra:** En la barra superior del visualizador, escribe una palabra (ej. *casa*) y pulsa **Buscar**. La ruta desde la raíz hasta el nodo se iluminará en color verde punteado paso a paso.
5. **Recorridos del Árbol:**
   - En la parte inferior, alterna entre las pestañas **Inorden (LNR)**, **Preorden (NLR)**, **Postorden (LRN)** y **Por Niveles (BFS)** para ver la secuencia exacta de nodos.

---

### 📘 Pestaña 2: Etapa 1 - Formular una Solicitud con Contexto
* Muestra el **prompt profesional estructurado** formulado para la IA.
* Explica los 4 pilares: Rol y dominio, Restricciones del español (tildes/diéresis/ñ), Invariante del ABB (duplicados por frecuencia) y Verificabilidad.
* Cuenta con un botón **"Copiar Solicitud para IA"** para copiar el texto exacto al portapapeles.

---

### 💻 Pestaña 3: Etapa 2 - Desarrollo Gradual
* Muestra las 5 fases incrementales de código:
  1. **Fase 2.1:** Diseño estructural del nodo (`BSTNode`).
  2. **Fase 2.2:** Tokenización y sanitización léxica con regex Unicode.
  3. **Fase 2.3:** Inserción y manejo de duplicados con `localeCompare('es')`.
  4. **Fase 2.4:** Recorridos clásicos (Inorden, Preorden, Postorden).
  5. **Fase 2.5:** Cálculo unificado de métricas en una sola pasada $O(n)$.
* Cada fase tiene su visor de código fuente con botón para copiar y notas para la defensa académica.

---

### 🔍 Pestaña 4: Etapa 3 - Verificación del Código Generado
* Contiene las respuestas profundas y rigurosas a las **7 preguntas obligatorias**:
  1. *¿Qué problema resuelve este código?*
  2. *¿Entendemos cómo funciona?*
  3. *¿Qué entradas necesita?*
  4. *¿Qué resultado produce?*
  5. *¿Encontramos algún error?* (Explica el bug de la tabla ASCII vs `localeCompare`).
  6. *¿Qué modificación realizamos?*
  7. *¿Por qué realizamos esa modificación?*
* **Laboratorio interactivo del error**: Incluye un comparador en vivo donde puedes ingresar palabras como `árbol` y `zorro` para demostrarle al profesor matemáticamente por qué `'á' (225) > 'z' (122)` falla en código ASCII tradicional y cómo `localeCompare('es')` lo resuelve.

---

### 🧪 Pestaña 5: Etapa 4 - Batería de Pruebas (13 Casos)
* **Los 8 Casos Obligatorios de la Rúbrica:**
  - Caso 1: `gato perro casa` (Inserción y recorridos)
  - Caso 2: `zorro árbol abeja` (Orden alfabético con tilde)
  - Caso 3: `Una sola palabra` (Árbol de un solo nodo)
  - Caso 4: `Palabras repetidas` (Frecuencia en nodo)
  - Caso 5: `Varias palabras` (Conteo exacto)
  - Caso 6: `Árbol con diferentes niveles` (Hojas e internos)
  - Caso 7: `Palabras con mayúsculas` (Normalización)
  - Caso 8: `Oración con signos de puntuación` (Limpieza de datos)
* **Los 5 Casos Límite Propuestos por la IA (Requisito adicional de la rúbrica):**
  - Caso 9: *Cadena vacía o solo espacios*
  - Caso 10: *Inserción en orden alfabético estricto (Árbol degenerado en lista enlazada O(n))*
  - Caso 11: *Caracteres especiales, emojis y letra ñ*
  - Caso 12: *Palabras compuestas con guiones*
  - Caso 13: *Hiper-redundancia de una sola palabra*
* Cada caso límite cuenta con su **Evaluación Crítica de Pertinencia** (¿Es pertinente?, Nivel de pertinencia, Justificación docente y Riesgo mitigado).
* Puedes pulsar el botón **"Cargar en Simulador"** en cualquiera de ellos para ver su árbol en el visualizador gráfico.

---

### 📋 Pestaña 6: Etapa 5 - Registro de Interacción con IA (Tabla de Evidencia)
* Es la réplica exacta de la tabla solicitada en la imagen del profesor:
  - Columnas: `#` | `Pregunta realizada a la IA` | `Respuesta obtenida` | `¿Se utilizó?` | `Modificaciones realizadas` | `Justificación`.
* Incluye los 4 temas mostrados en la imagen:
  1. *Diseño del nodo* (Sí)
  2. *Inserción* (Sí)
  3. *Conteo de nodos* (No - Explicando por qué se descartó la función recursiva triple ineficiente y se unificó en una pasada $O(n)$)
  4. *Casos de prueba* (Sí)
  * Más temas de soporte (Normalización lingüística y Árboles degenerados).
* **Opciones de Exportación:**
  - **Copiar Tabla en Markdown:** Copia la tabla lista para pegarse en Google Docs, Microsoft Word o Notion.
  - **Exportar CSV:** Descarga un archivo `.csv` para abrir en Excel.
  - **Añadir Fila:** Te permite registrar preguntas adicionales que tu equipo haya realizado.

---

## 📄 3. Cómo Generar el Reporte Formal en PDF

1. En la esquina superior derecha de la aplicación, haz clic en el botón azul **"Ver Reporte Académico"**.
2. Se abrirá una ventana con el reporte completo y formal que integra:
   - Carátula institucional (Universidad Anáhuac Mayab, tu correo, asignatura, fecha).
   - Resumen ejecutivo.
   - Evidencia completa de las Etapas 1, 2, 3, 4 y 5 en formato de lectura académica.
3. Haz clic en **"Imprimir / Guardar en PDF"**:
   - En el destino de impresión de tu navegador, selecciona **"Guardar como PDF"**.
   - ¡Listo! Tendrás un documento PDF impecable para subir a la plataforma del curso (Canvas / Brightspace / Moodle / Classroom).

---

## 💡 4. Resumen para la Entrega al Profesor

Al enviar tu tarea, puedes incluir el siguiente texto en tu entrega o correo:

> **Asunto:** Entrega de Práctica: Árbol Binario de Búsqueda (ABB) con Procesamiento de Texto e Interacción con IA  
> **Alumno:** Diego Olea (diego.olea@anahuacmayab.edu.mx)  
> **Enlace de la Aplicación en Vivo:** https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app  
> 
> Estimado profesor:
> 
> Adjunto el enlace a la aplicación interactiva donde se pueden comprobar las 5 etapas solicitadas en la práctica:
> 1. **Etapa 1:** Formulación del prompt contextual con restricciones de idioma y estructuras de datos.
> 2. **Etapa 2:** Desarrollo gradual en 5 fases con código modular.
> 3. **Etapa 3:** Respuestas fundamentadas a las 7 preguntas de verificación y demostración práctica del error de comparación ASCII con tildes (`árbol` vs `zorro`).
> 4. **Etapa 4:** Pruebas interactivas de los 8 casos obligatorios + 5 casos límite sugeridos por la IA con análisis crítico de pertinencia.
> 5. **Etapa 5:** Tabla de registro de interacción con la IA con las decisiones de adopción y justificaciones técnicas.
