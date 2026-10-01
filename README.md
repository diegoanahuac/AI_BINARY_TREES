# Árbol Binario de Búsqueda (ABB) con Procesamiento de Texto
### Universidad Anáhuac Mayab • Estructuras de Datos
**Estudiante:** Diego Olea (`diego.olea@anahuacmayab.edu.mx`)  
**Fecha:** Octubre 2026  
**Enlace Público:** [https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app](https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app)  
**Enlace de Desarrollo:** [https://ai.studio/apps/208c133e-18a1-4679-98a4-3f632346f331](https://ai.studio/apps/208c133e-18a1-4679-98a4-3f632346f331)

---

## Lista de Comprobación de Evidencia Final

| Estado | Requerimiento Solicitado | Sección |
|:---:|---|---|
| [x] | 1. Programa funcional | [Sección 1: Arquitectura y enlaces](#1-programa-funcional) |
| [x] | 2. Diagrama o representación del árbol con una oración de prueba | [Sección 2: Diagramas de casos clave](#2-diagrama-o-representación-del-árbol-con-oración-de-prueba) |
| [x] | 3. Capturas o registro de las interacciones relevantes con la IA | [Sección 3: Prompts y auditoría técnica](#3-registro-de-interacciones-relevantes-con-la-ia) |
| [x] | 4. Tabla de verificación de las respuestas obtenidas | [Sección 4: Tabla de registro de la Etapa 5](#4-tabla-de-verificación-de-las-respuestas-obtenidas) |
| [x] | 5. Casos de prueba y resultados | [Sección 5: Suite de 13 pruebas ejecutadas](#5-casos-de-prueba-y-resultados) |
| [x] | 6. Reflexión individual del integrante | [Sección 6: Reflexión analítica](#6-reflexión-individual-del-integrante) |

---

## 1. Programa Funcional

El sistema está implementado en TypeScript y React, y se encuentra desplegado y accesible en la web.

* **Enlace Público:** [https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app](https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app)
* **Enlace de Desarrollo:** [https://ai.studio/apps/208c133e-18a1-4679-98a4-3f632346f331](https://ai.studio/apps/208c133e-18a1-4679-98a4-3f632346f331)

### Interfaz del Sistema
![Panel General de la Aplicación](assets/01_app_dashboard.svg)

### Módulos del Código Fuente
* `src/utils/bstEngine.ts`: Inserción recursiva, ordenamiento lexicográfico en español con `localeCompare('es')`, recorridos Inorden/Preorden/Postorden/BFS, cálculo de métricas en $O(n)$ y asignación de coordenadas vectoriales para SVG.
* `src/types/bst.ts`: Definición de interfaces (`BSTNode`, `TreeMetrics`, `TestCase`, `InteractionRecord`).
* `src/components/TreeVisualizer.tsx`: Visualizador vectorial interactivo con controles de zoom, paneo y resaltado de nodos.
* `src/components/InteractivePlayground.tsx`: Entorno interactivo con selectores de normalización, extracción de tokens y cálculo métrico inmediato.

---

## 2. Diagrama o Representación del Árbol con Oración de Prueba

Representaciones topológicas del árbol obtenidas a partir de oraciones de prueba procesadas por el motor del ABB:

### Oración de Prueba 1: "gato perro casa"
* **Raíz:** `gato`
* **Hojas:** `casa` (subárbol izquierdo, menor alfabéticamente), `perro` (subárbol derecho, mayor alfabéticamente)
* **Inorden:** `casa` -> `gato` -> `perro`

![Árbol para gato perro casa](assets/02_arbol_gato_perro_casa.svg)

---

### Oración de Prueba 2: "zorro árbol abeja" (Orden alfabético con tildes)
* **Raíz:** `zorro`
* **Comprobación:** Valida el uso de `localeCompare('es')`. Tanto `árbol` (con acento diacrítico) como `abeja` se ordenan a la izquierda de `zorro`. Esto corrige la discrepancia de la tabla ASCII tradicional, donde el código Unicode de `á` (225) se ordenaba de forma errónea después de `z` (122).
* **Inorden:** `abeja` -> `árbol` -> `zorro`

![Árbol para zorro árbol abeja](assets/03_arbol_zorro_arbol_abeja.svg)

---

### Oración de Prueba 3: "sol luna sol estrella luna sol" (Tratamiento de duplicados)
* **Comprobación:** Las palabras recurrentes acumulan su frecuencia en la propiedad `count` (`sol` count=3, `luna` count=2, `estrella` count=1) sin insertar nodos redundantes en la estructura ni alterar el orden del árbol.
* **Palabras procesadas:** 6
* **Nodos únicos en el árbol:** 3

![Árbol con Tratamiento de Duplicados](assets/04_arbol_duplicados_sol.svg)

---

### Oración de Prueba 4: "madrid barcelona sevilla valencia bilbao zaragoza cadiz" (Estructura multinivel)
* **Raíz:** `madrid` (Nivel 0)
* **Nodos Internos:** `barcelona`, `bilbao`, `sevilla`, `valencia` (Nodos con al menos un hijo)
* **Nodos Hoja:** `cadiz`, `zaragoza` (Nodos sin descendientes)
* **Altura:** 4 niveles
* **Total de nodos únicos:** 7

![Árbol Multinivel con Nodos Internos y Hojas](assets/05_arbol_multinivel_madrid.svg)

---

## 3. Registro de Interacciones Relevantes con la IA

### Prompt Estructurado de la Etapa 1 (Solicitud con Contexto)
Se formuló la solicitud a la IA definiendo el rol técnico y las restricciones del lenguaje en español:

![Terminal del Prompt de la Etapa 1](assets/06_prompt_etapa1.svg)

Texto exacto del prompt utilizado:
```text
Actúa como un Ingeniero de Software Senior y Docente de Estructuras de Datos.
Necesito diseñar e implementar un sistema de Árbol Binario de Búsqueda (ABB) en TypeScript/JavaScript para el
procesamiento, indexación y análisis de frecuencias de palabras en textos en español.

Requisitos y Restricciones Técnicas:
1. Estructura del Nodo:
   - Almacenar la palabra léxica, su frecuencia de ocurrencia (para duplicados), referencias a subárbol izquierdo y
     derecho, y propiedades de clasificación (nivel, esHoja, esInterno).
2. Sanitización y Normalización de Texto:
   - Limpiar signos de puntuación típicos del español (¡!, ¿?, comas, puntos, etc.) sin eliminar vocales con tilde (á,
     é, í, ó, ú), diéresis (ü) ni la letra 'ñ'.
   - Opción para normalizar a minúsculas para unificar variantes de un mismo término.
3. Inserción y Ordenamiento en Español:
   - Resolver la comparación lexicográfica con reglas del español (localeCompare('es')), evitando el error común de la
     tabla ASCII donde 'á' (225) se ordena erróneamente después de 'z' (122).
   - Manejo de duplicados: Si la palabra ya existe, incrementar su contador de frecuencia sin crear nodos redundantes ni
     romper las propiedades del ABB.
4. Recorridos y Métricas:
   - Proveer recorridos Inorden (alfabético ascendente), Preorden y Postorden.
   - Calcular en una sola pasada: total de palabras ingresadas, nodos únicos, nodos hoja, nodos internos y altura del
     árbol.
5. Desarrollo Gradual:
   - Estructurar la solución paso a paso (Nodo -> Sanitización -> Inserción -> Recorridos -> Métricas) para facilitar su
     verificación académica.
```

---

### Auditoría Crítica de la Etapa 3 (Preguntas de Verificación)

1. **¿Qué problema resuelve este código?**  
   Indexación lexicográfica, conteo de frecuencias y análisis estructural de vocabulario en español a partir de texto libre.
2. **¿Cómo funciona?**  
   1) Limpieza y extracción de tokens Unicode.  
   2) Inserción recursiva mediante `localeCompare('es')` con acumulación de frecuencia en caso de igualdad.  
   3) Recorridos Inorden (LNR), Preorden (NLR) y Postorden (LRN).  
   4) Recolección de métricas estructurales en una sola pasada $O(n)$.
3. **¿Qué entradas necesita?**  
   Cadenas de texto arbitrarias en español con signos de puntuación, mayúsculas, tildes y repeticiones.
4. **¿Qué resultado produce?**  
   Estructura jerárquica del ABB, recorridos ordenados, frecuencias léxicas y métricas cuantitativas (altura, hojas, internos, duplicados).
5. **¿Qué errores se detectaron en la propuesta de la IA?**  
   - Comparación primitiva con `<` y `>`, la cual clasifica `árbol` (código 225) después de `zorro` (código 122).  
   - Expresión regular `[^a-zA-Z]` que eliminaba tildes y la letra `ñ`.  
   - Tres funciones recursivas independientes para contar nodos, hojas e internos, triplicando el costo temporal ($O(3n)$).
6. **¿Qué modificaciones se realizaron?**  
   - Implementación de `localeCompare('es')`.  
   - Uso de regex Unicode `/[^\p{L}\p{N}\s]/gu`.  
   - Unificación de métricas en una única función recursiva $O(n)$.
7. **¿Por qué se realizaron esas modificaciones?**  
   Para garantizar el ordenamiento alfabético formal en español, preservar la integridad de las palabras acentuadas y optimizar la complejidad algorítmica.

---

## 4. Tabla de Verificación de las Respuestas Obtenidas

Registro de interacción con la IA (Etapa 5):

![Tabla de Evidencia de Interacción con IA](assets/07_tabla_evidencia_etapa5.svg)

| # | Pregunta realizada a la IA | Respuesta obtenida | ¿Se utilizó? | Modificaciones realizadas | Justificación |
|---|---|---|:---:|---|---|
| **1** | **Diseño del nodo:** Estructura de un nodo de ABB que almacene palabras, frecuencia de duplicados y clasificación topológica. | Propuso clase `Node` con atributos: `word`, `count`, punteros `left`, `right` y métodos booleanos. | **Sí** | Se adaptó a TypeScript con `id`, `word`, `count`, `rawWords`, `left`, `right`, `level`, `isLeaf`, `isInternal`, `isRoot`. | Almacenar `rawWords` y `level` permite conservar las formas con mayúsculas e inspeccionar la jerarquía sin recalcular niveles en cada render. |
| **2** | **Inserción:** Función de inserción en el ABB con normalización y duplicados. | Propuso recursión utilizando `<` y `>`, descartando duplicados o insertándolos a la izquierda. | **Sí** | Se sustituyó `<` por `localeCompare('es')` y en caso de igualdad se incrementa `node.count += 1`. | En español, la comparación nativa ASCII clasifica `árbol` (225) después de `zorro` (122). Acumular la frecuencia mantiene claves únicas y conserva la definición estricta del ABB. |
| **3** | **Conteo de nodos:** Métodos para contar nodos totales, hojas e internos. | Sugirió 3 métodos recursivos independientes (`countNodes`, `countLeaves`, `countInternal`). | **No** | Se descartaron las tres llamadas separadas y se reemplazaron por `calculateTreeMetrics(root)` en una sola pasada $O(n)$. | Ejecutar 3 funciones recursivas recorre el árbol 3 veces de forma innecesaria ($O(3n)$). La pasada unificada optimiza el cómputo. |
| **4** | **Casos de prueba:** Batería de pruebas para validar signos ortográficos, tildes y repeticiones. | Entregó oraciones básicas con comas y repeticiones simples. | **Sí** | Se implementaron los 8 casos de la rúbrica y se complementaron con 5 casos límite adicionales propuestos por la IA. | Permite verificar la estabilidad del sistema ante árboles degenerados y cadenas vacías. |
| **5** | **Normalización lingüística:** Limpieza de signos ortográficos sin alterar tildes ni la letra `ñ`. | Sugirió `text.replace(/[^a-zA-Z ]/g, '')`, eliminando vocales acentuadas y la letra `ñ`. | **Sí** | Se corrigió la expresión regular a `/[^\p{L}\p{N}\s]/gu` con clases de caracteres Unicode. | La expresión regular ASCII destruía términos como `árbol` convirtiéndolos en `rbol` y `ñandú` en `and`. |
| **6** | **Detección de Árboles Degenerados:** Detección de árboles convertidos en listas enlazadas. | Sugirió comprobar si la altura es igual al número de nodos únicos cuando $N > 2$. | **Sí** | Se integró la métrica `isDegenerate` y el cálculo de `balanceScore` respecto a $\lceil \log_2(N+1) \rceil$. | Permite evaluar la degradación del tiempo de búsqueda de $O(\log n)$ a $O(n)$ en casos ordenados. |

---

## 5. Casos de Prueba y Resultados

Panel de ejecución y verificación automatizada:

![Panel de Pruebas y Recorridos](assets/08_casos_prueba_etapa4.svg)

### Casos de la Rúbrica Oficial

| Caso | Entrada | Aspecto a comprobar | Resultado Obtenido | Estado |
|:---:|---|---|---|:---:|
| **1** | `gato perro casa` | Inserción y recorridos | Inorden: `casa` -> `gato` -> `perro`. Raíz: `gato`. Hojas: `casa`, `perro`. | Pasado |
| **2** | `zorro árbol abeja` | Orden alfabético con tilde | Inorden: `abeja` -> `árbol` -> `zorro`. `localeCompare('es')` ubica `árbol` antes de `zorro`. | Pasado |
| **3** | `computadora` | Árbol con un nodo | 1 nodo único, 1 hoja, 0 internos, altura 1. La raíz es la única hoja. | Pasado |
| **4** | `sol luna sol estrella luna sol` | Tratamiento de duplicados | 3 nodos únicos: `estrella` (x1), `luna` (x2), `sol` (x3). Total palabras: 6. | Pasado |
| **5** | `manzana pera uva sandia platano kiwi fresa mango limon naranja` | Conteo exacto de nodos | 10 palabras ingresadas = 10 nodos únicos generados. | Pasado |
| **6** | `madrid barcelona sevilla valencia bilbao zaragoza cadiz` | Nodos internos y hojas | Raíz: `madrid`. Hojas: `bilbao`, `cadiz`, `zaragoza`. Internos: `barcelona`, `sevilla`, `valencia`. Altura: 4. | Pasado |
| **7** | `Python PYTHON python PyThOn java JAVA Java C C c` | Normalización (Mayúsculas) | 3 nodos únicos: `c` (x3), `java` (x3), `python` (x4). Total palabras: 10. | Pasado |
| **8** | `¡Hola, mundo! ¿El árbol binario funciona? Sí; ¡funciona muy, muy bien!` | Limpieza de datos | Signos de puntuación retirados; palabras acentuadas (`árbol`, `sí`) preservadas intactas. | Pasado |

---

### Casos Límite Propuestos por la IA

| Caso Límite | Entrada | Propósito del Caso | Análisis de Pertinencia | Estado |
|:---:|---|---|---|:---:|
| **9** | `   \n\t   ` | Entrada vacía o compuesta únicamente por espacios. | **Alta:** Evita excepciones de referencia nula y la creación de nodos vacíos. | Pasado |
| **10** | `abeja casa dedo elefante foca gato hormiga` | Inserción en orden estrictamente ascendente. | **Alta:** Ilustra el peor caso del ABB (árbol degenerado en lista con altura = 7 y búsqueda $O(n)$). | Pasado |
| **11** | `árbol 🌳 123 ñandú cañón café 🚀` | Texto con emojis, caracteres numéricos y letra `ñ`. | **Alta:** Valida que la sanitización filtre símbolos y conserve el repertorio ortográfico del español. | Pasado |
| **12** | `auto-servicio socio-económico rock-and-roll` | Palabras compuestas con guion. | **Media:** Define el criterio de tokenización para separar términos compuestos en palabras independientes. | Pasado |
| **13** | `árbol árbol árbol árbol árbol árbol árbol árbol` | Repetición masiva de un único término. | **Alta:** Comprueba que el espacio de memoria permanezca en $O(1)$ sin incrementar la altura. | Pasado |

---

## 6. Reflexión Individual del Integrante

**Estudiante:** Diego Olea  
**Correo:** `diego.olea@anahuacmayab.edu.mx`  
**Institución:** Universidad Anáhuac Mayab  
**Asignatura:** Estructuras de Datos  

### ¿Qué parte del programa me ayudó a resolver la IA?
La IA facilitó la estructuración inicial de las interfaces en TypeScript y el código base para los algoritmos clásicos de recorrido recursivo (Inorden, Preorden y Postorden). Asimismo, aportó sugerencias útiles en la propuesta de casos límite, en particular el análisis del árbol degenerado cuando las entradas se insertan en orden alfabético estricto y la gestión de cadenas con caracteres de escape o espacios en blanco.

### ¿Qué tuve que verificar o corregir?
Fue necesario auditar y corregir tres aspectos técnicos donde la respuesta inicial de la IA era errónea o deficiente:
1. **Comparación lexicográfica en español:** La propuesta inicial empleaba los operadores de comparación de cadenas `<` y `>`, lo que causaba que `árbol` se colocara a la derecha de `zorro` debido al orden numérico de Unicode (`á` = 225 vs `z` = 122). Se reemplazó por `localeCompare('es')`.
2. **Sanitización de caracteres:** La expresión regular sugerida `/[^a-zA-Z]/g` eliminaba tildes y la letra `ñ`. Se implementó la expresión regular `/[^\p{L}\p{N}\s]/gu` para preservar el alfabeto en español.
3. **Complejidad del conteo de nodos:** La IA generó tres funciones recursivas distintas para contar nodos totales, hojas e internos, lo que recorría la estructura tres veces consecutivas. Se unificó el cálculo en una única pasada de complejidad $O(n)$.

### ¿Qué aprendí durante el proceso?
El desarrollo demostró que las herramientas de IA aceleran la creación del código inicial, pero requieren validación analítica rigurosa. Se comprobó la importancia del manejo de esquemas de codificación de caracteres en estructuras de datos de búsqueda, la necesidad de manejar duplicados mediante contadores de frecuencia para no violar las propiedades del árbol, y el impacto de los datos ordenados en la degradación de un ABB.

---

## Generación del Reporte en PDF

1. Acceder al sistema en: [https://ai.studio/apps/208c133e-18a1-4679-98a4-3f632346f331](https://ai.studio/apps/208c133e-18a1-4679-98a4-3f632346f331)
2. En la barra superior, pulsar el botón **"Ver Reporte Académico"**.
3. Seleccionar **"Imprimir / Guardar en PDF"** para exportar el documento con el formato visual completo.
