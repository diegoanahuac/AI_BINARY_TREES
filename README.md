# 🌳 Árbol Binario de Búsqueda (ABB) con Procesamiento de Texto
### Universidad Anáhuac Mayab &bull; Estructuras de Datos
**Estudiante:** Diego Olea (`diego.olea@anahuacmayab.edu.mx`)  
**Fecha:** Octubre 2026  
**Enlace de la Aplicación en Vivo (Web):** [https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app](https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app)

---

## ✅ Lista de Comprobación de Evidencia Final

| Estado | Requerimiento Solicitado | Sección en el Documento |
|:---:|---|---|
| ☑ | **1. Programa funcional (app desplegada ✅)** | [Ver Sección 1](#1-programa-funcional-app-desplegada-) |
| ☑ | **2. Diagrama o representación del árbol con una oración de prueba** | [Ver Sección 2](#2-diagrama-o-representación-del-árbol-generado) |
| ☑ | **3. Capturas o registro de las interacciones relevantes con la IA** | [Ver Sección 3](#3-capturas-y-registro-de-interacciones-relevantes-con-la-ia) |
| ☑ | **4. Tabla de verificación de las respuestas obtenidas** | [Ver Sección 4](#4-tabla-de-verificación-de-las-respuestas-obtenidas) |
| ☑ | **5. Casos de prueba y resultados** | [Ver Sección 5](#5-casos-de-prueba-y-resultados) |
| ☑ | **6. Reflexión individual del integrante** | [Ver Sección 6](#6-reflexión-individual-del-integrante) |

---

## 1. Programa Funcional (App Desplegada ✅)

El sistema se encuentra completamente implementado en **TypeScript** y **React**, desplegado y disponible en la nube. Incluye un motor de Árbol Binario de Búsqueda (ABB), procesamiento de texto en español (tildes, diéresis, letra «ñ»), sanitización ortográfica, renderizado vectorial SVG interactivo y módulo de recorridos.

* **Enlace Público para el Profesor:**  
  👉 **`https://ais-pre-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app`**
* **Enlace de Desarrollo en Vivo:**  
  👉 `https://ais-dev-patzul5jrew5jg5a2pivai-181795296148.us-west2.run.app`

### 📸 Evidencia de la App Desplegada y Funcional:

#### Vista General: Entrada de texto, tokens extraídos y métricas en tiempo real
![Simulador y Visualizador del ABB](Screenshot 2026-09-30 at 12.38.29 p.m..png)

#### Entorno Integral: Barra de navegación, topología y recorridos
![Entorno de la Aplicación en Vivo](Screenshot 2026-09-30 at 12.38.35 p.m..png)

---

## 2. Diagrama o Representación del Árbol Generado

Se validó la topología dinámica del árbol bajo múltiples oraciones y frases de prueba. A continuación se presentan las representaciones obtenidas directamente en el visualizador gráfico SVG:

### 🟢 Oración de Prueba 1 (Básica): `"gato perro casa"`
* **Raíz:** `gato`
* **Subárbol Izquierdo (menor alfabéticamente):** `casa` (Hoja)
* **Subárbol Derecho (mayor alfabéticamente):** `perro` (Hoja)
* **Nivel 0:** `gato` (Raíz) | **Nivel 1:** `casa`, `perro`
* **Inorden:** `casa` $\rightarrow$ `gato` $\rightarrow$ `perro`

![Diagrama del Árbol con gato perro casa](Screenshot 2026-09-30 at 12.39.28 p.m..png)

---

### 🟢 Oración de Prueba 2 (Orden Alfabético con Tildes): `"zorro árbol abeja"`
* **Raíz:** `zorro`
* **Comprobación:** Demuestra el uso correcto de `localeCompare('es')`. Tanto `árbol` como `abeja` descienden a la izquierda de `zorro`.
* **Inorden:** `abeja` $\rightarrow$ `árbol` $\rightarrow$ `zorro`

![Diagrama del Árbol con zorro árbol abeja](Screenshot 2026-09-30 at 12.39.35 p.m..png)

---

### 🟢 Oración de Prueba 3 (Tratamiento de Duplicados): `"sol luna sol estrella luna sol"`
* **Comprobación:** Las palabras repetidas no crean nodos redundantes ni deforman el árbol, sino que acumulan su frecuencia con badges visibles:
  - `sol` (Raíz, Frecuencia: `×3`)
  - `luna` (Nodo Interno, Frecuencia: `×2`)
  - `estrella` (Nodo Hoja, Frecuencia: `×1`)
* **Total de palabras procesadas:** 6 | **Nodos únicos en el árbol:** 3

![Diagrama del Árbol con Frecuencia de Duplicados](Screenshot 2026-09-30 at 12.39.41 p.m..png)

---

### 🟢 Oración de Prueba 4 (Árbol Multinivel - Hojas e Internos):
> `"madrid barcelona sevilla valencia bilbao zaragoza cadiz"`

* **Raíz:** `madrid` (Azul)
* **Nodos Internos:** `barcelona`, `bilbao`, `sevilla`, `valencia` (Violeta)
* **Nodos Hoja:** `cadiz`, `zaragoza` (Verde)
* **Altura:** 4 niveles | **Nodos Únicos:** 7

![Diagrama Multinivel con Nodos Internos y Hojas](Screenshot 2026-09-30 at 12.39.47 p.m..png)

---

## 3. Capturas y Registro de Interacciones Relevantes con la IA

Se formuló una solicitud estructurada con contexto profesional (Etapa 1) y se sometió a auditoría técnica el código generado (Etapa 3).

### 📸 Evidencia de la Etapa 1: Formular una Solicitud con Contexto
Se proporcionó al modelo de IA un rol docente y restricciones lingüísticas estrictas para evitar los errores comunes de comparación ASCII:

![Prompt Estructurado de Contexto a la IA](Screenshot 2026-09-30 at 12.40.16 p.m..png)

### 📸 Evidencia de la Etapa 3: Verificación y Auditoría Crítica
Se analizaron las 7 preguntas obligatorias de la rúbrica para identificar bugs ocultos en el código inicial generado por la IA:

![Verificación y Auditoría de las 7 Preguntas](Screenshot 2026-09-30 at 12.40.41 p.m..png)

---

## 4. Tabla de Verificación de las Respuestas Obtenidas

A continuación se muestra la evidencia formal de la **Etapa 5** (Registro de interacción con IA) que evalúa la pertinencia, uso y modificaciones aplicadas a las respuestas de la IA:

### 📸 Evidencia de la Tabla de Interacción con IA:

#### Parte 1: Diseño del Nodo e Inserción con Duplicados
![Tabla de Evidencia - Filas 1 y 2](Screenshot 2026-09-30 at 12.41.01 p.m..png)

#### Parte 2: Conteo de Nodos, Casos de Prueba y Normalización en Español
![Tabla de Evidencia - Filas 3, 4 y 5](Screenshot 2026-09-30 at 12.41.08 p.m..png)

---

### 📋 Tabla Oficial Consolidada:

| # | Pregunta realizada a la IA | Respuesta obtenida | ¿Se utilizó? | Modificaciones realizadas | Justificación |
|---|---|---|:---:|---|---|
| **1** | **Diseño del nodo:** ¿Cómo diseñar un nodo de ABB que almacene palabras, frecuencia de duplicados y clasificación topológica? | Propuso clase `Node` con atributos: `word`, `count`, punteros `left`, `right` y métodos `isLeaf()`, `isInternal()`. | **Sí** | Se adaptó a TypeScript con `id`, `word`, `count`, `rawWords`, `left`, `right`, `level`, `isLeaf`, `isInternal`, `isRoot`. | Almacenar `rawWords` y `level` permite trazabilidad de mayúsculas originales e inspección visual directa sin recalcular niveles continuamente. |
| **2** | **Inserción:** Implementa inserción en el ABB que reciba palabra normalizada y maneje duplicados. | Propuso recursión con operadores `<`, `>`, descartando duplicados o insertándolos a la izquierda. | **Sí** | Se sustituyó `<` por `localeCompare('es')` y en caso de igualdad se incrementa `root.count += 1`. | En español, la comparación nativa ASCII clasifica `'árbol'` (código 225) después de `'zorro'` (código 122). Acumular `count` mantiene claves únicas en $O(1)$ de memoria. |
| **3** | **Conteo de nodos:** Escribe métodos para contar total de nodos, hojas e internos. | Sugirió 3 métodos recursivos independientes (`countNodes`, `countLeaves`, `countInternal`) recorriendo el árbol 3 veces. | **No** | Se descartó el triple recorrido y se reemplazó por `calculateTreeMetrics(root)` que recolecta todas las métricas en una sola pasada $O(n)$. | Llamar a 3 funciones recursivas por separado triplica el tiempo de ejecución inútilmente ($O(3n)$). Unificarlo en una pasada optimiza el rendimiento. |
| **4** | **Casos de prueba:** Proporciona oraciones para validar el ABB con signos ortográficos, tildes y repeticiones. | Entregó oraciones básicas con comas y palabras repetidas. | **Sí** | Se completaron los 8 casos de la rúbrica y se solicitaron 5 casos límite adicionales con evaluación de pertinencia. | Cumple a cabalidad con la solicitud docente y comprueba la solidez ante árboles degenerados y cadenas vacías. |
| **5** | **Normalización lingüística en español:** ¿Cómo limpiar signos como `¡!¿?` sin borrar tildes ni la letra `ñ`? | Sugirió `text.replace(/[^a-zA-Z ]/g, '')`, eliminando vocales con tilde y la «ñ». | **Sí** | Se corrigió la expresión regular a `/[^\p{L}\p{N}\s]/gu` con categorías Unicode nativas. | La regex tradicional de la IA mutilaba palabras esenciales como `'árbol'` en `'rbol'` y `'ñandú'` en `'and'`. |
| **6** | **Detección de Árboles Degenerados:** ¿Cómo detectar si el ABB se convirtió en lista enlazada? | Sugirió comprobar si la altura es igual al número de nodos únicos cuando $N > 2$. | **Sí** | Se integró la métrica `isDegenerate` y un cálculo de `balanceScore` respecto a $\lceil \log_2(N+1) \rceil$. | Permite evidenciar cómo la inserción en orden alfabético degrada el tiempo de búsqueda de $O(\log n)$ a $O(n)$. |

---

## 5. Casos de Prueba y Resultados

Se implementó y verificó una suite automatizada de **13 casos de prueba** (8 de la rúbrica oficial + 5 casos límite propuestos por la IA).

### 📸 Evidencia de la Batería de Pruebas:

#### Lista de Casos con Insignia de Verificación ("Pasado"):
![Lista de Casos de Prueba Aprobados](Screenshot 2026-09-30 at 12.41.32 p.m..png)

#### Detalle de Ejecución del Caso 1 (Recorridos Inorden, Preorden y Postorden):
![Detalle de Recorridos y Validación](Screenshot 2026-09-30 at 12.41.54 p.m..png)

---

### 📋 Matriz de los 8 Casos Obligatorios de la Rúbrica:

| Caso | Entrada | Aspecto a comprobar | Resultado Obtenido | Estado |
|:---:|---|---|---|:---:|
| **1** | `gato perro casa` | Inserción y recorridos | Inorden: `casa` $\rightarrow$ `gato` $\rightarrow$ `perro`. Raíz: `gato`. Hojas: `casa`, `perro`. | ✅ Pasado |
| **2** | `zorro árbol abeja` | Orden alfabético con tilde | Inorden: `abeja` $\rightarrow$ `árbol` $\rightarrow$ `zorro`. `localeCompare('es')` corrige el orden. | ✅ Pasado |
| **3** | `computadora` | Árbol con un nodo | 1 nodo único, 1 hoja, 0 internos, altura 1. Raíz es única. | ✅ Pasado |
| **4** | `sol luna sol estrella luna sol` | Tratamiento de duplicados | 3 nodos únicos: `estrella` (x1), `luna` (x2), `sol` (x3). Total palabras: 6. | ✅ Pasado |
| **5** | `manzana pera uva sandia platano kiwi fresa mango limon naranja` | Conteo exacto de nodos | 10 palabras = 10 nodos únicos. Métricas coinciden con la lista. | ✅ Pasado |
| **6** | `madrid barcelona sevilla valencia bilbao zaragoza cadiz` | Nodos internos y hojas | Raíz: `madrid`. Hojas: `bilbao`, `cadiz`, `zaragoza`. Internos: `barcelona`, `sevilla`, `valencia`. Altura: 4. | ✅ Pasado |
| **7** | `Python PYTHON python PyThOn java JAVA Java C C c` | Normalización (Mayúsculas) | 3 nodos únicos: `c` (x3), `java` (x3), `python` (x4). Total: 10 palabras. | ✅ Pasado |
| **8** | `¡Hola, mundo! ¿El árbol binario funciona? Sí; ¡funciona muy, muy bien!` | Limpieza de datos | Signos ortográficos eliminados. Palabras con tilde (`árbol`, `sí`) intactas. | ✅ Pasado |

---

### ⭐ Matriz de los 5 Casos Límite Propuestos por la IA y Análisis de Pertinencia:

| Caso Límite | Entrada | Propósito del Caso | Análisis Crítico de Pertinencia | Estado |
|:---:|---|---|---|:---:|
| **9** | `   \n\t   ` (Vacía) | Entrada de solo espacios o vacía. | **Muy Alta:** Previene fallos `NullPointerException` o creación de nodos vacíos fantasma. | ✅ Pasado |
| **10** | `abeja casa dedo elefante foca gato hormiga` | Inserción ordenada ascendente. | **Muy Alta:** Demuestra el peor caso teórico del ABB: árbol degenerado en lista enlazada (Altura = 7, búsqueda $O(n)$). | ✅ Pasado |
| **11** | `árbol 🌳 123 ñandú cañón café 🚀` | Emojis, números y letra «ñ». | **Alta:** Garantiza que la sanitización filtre emojis pero preserve intactas las palabras en español con la letra «ñ». | ✅ Pasado |
| **12** | `auto-servicio socio-económico rock-and-roll` | Palabras compuestas con guión. | **Media:** Define una política de tokenización consistente separando términos atómicos. | ✅ Pasado |
| **13** | `árbol árbol árbol árbol árbol árbol árbol árbol` | Hiper-redundancia de una palabra. | **Alta:** Comprueba que la memoria permanezca en $O(1)$ y que la altura no crezca ante repeticiones masivas. | ✅ Pasado |

---

## 6. Reflexión Individual del Integrante

**Estudiante:** Diego Olea  
**Correo:** `diego.olea@anahuacmayab.edu.mx`  
**Institución:** Universidad Anáhuac Mayab  
**Asignatura:** Estructuras de Datos  

### ¿Qué parte del programa me ayudó a resolver la IA?
> *"La IA fue de gran ayuda para estructurar con rapidez el andamiaje del proyecto en TypeScript y React, en especial la definición de la interfaz `BSTNode` y los algoritmos tradicionales de recorrido recursivo (Inorden, Preorden y Postorden). También aportó ideas valiosas al proponer casos límite no considerados inicialmente, como el árbol degenerado por inserción en orden alfabético y la prueba con entradas de solo espacios en blanco."*

### ¿Qué tuve que verificar o corregir?
> *"Tuve que realizar tres auditorías y correcciones críticas donde el código generado por la IA fallaba:*  
> 1. * **Error de comparación ASCII en español:** La IA propuso comparar con `<` y `>`, lo que causaba que `'árbol'` se ubicara después de `'zorro'` porque el código Unicode de la `'á'` (225) es mayor al de la `'z'` (122). Tuve que cambiarlo por `localeCompare('es')` para lograr el orden alfabético real.*  
> 2. * **Destrucción de caracteres en la sanitización:** La expresión regular propuesta `/[^a-zA-Z]/g` borraba acentos y la letra `'ñ'`. La sustituí por `/[^\p{L}\p{N}\s]/gu`.*  
> 3. * **Ineficiencia en el cálculo de métricas:** La IA propuso tres funciones recursivas independientes, triplicando el tiempo ($O(3n)$). Lo optimicé en una única función unificada en $O(n)$."*

### ¿Qué aprendí durante el proceso?
> *"Aprendí que la inteligencia artificial es una excelente herramienta para acelerar el desarrollo, pero no sustituye el rigor técnico ni el pensamiento crítico del ingeniero de software. Comprobé la importancia de las reglas de localización lingüística en algoritmos de búsqueda, la necesidad de preservar las invariantes de un Árbol Binario de Búsqueda mediante conteo de frecuencias léxicas, y cómo evaluar cuantitativamente la degradación de un ABB en el peor de los casos."*
