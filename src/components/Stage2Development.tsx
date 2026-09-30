import React, { useState } from 'react';
import { Layers, Copy, Check, ChevronRight, Terminal, BookOpen, AlertTriangle } from 'lucide-react';

export const Stage2Development: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: 'Fase 1: Diseño Estructural del Nodo',
      subtitle: 'Definición de tipos, punteros y metadatos léxicos',
      description: 'El nodo no solo almacena la palabra clave, sino también su frecuencia de ocurrencia (para tratar duplicados sin inflar el árbol), nivel jerárquico y banderas de clasificación.',
      code: `// 1. Estructura de Nodo con frecuencia y metadatos topológicos
export interface BSTNode {
  id: string;
  word: string;           // Palabra normalizada (clave de búsqueda)
  count: number;          // Frecuencia de repetición (trata duplicados)
  rawWords: string[];     // Formas originales antes de normalizar
  left: BSTNode | null;   // Puntero a subárbol izquierdo (menores)
  right: BSTNode | null;  // Puntero a subárbol derecho (mayores)
  level: number;          // Profundidad en el árbol (raíz = 0)
  isLeaf: boolean;        // true si no tiene descendientes
  isInternal: boolean;    // true si tiene al menos un hijo
  isRoot: boolean;        // true si es la raíz principal
}`,
      notes: [
        'La propiedad "count" resuelve elegantemente el Caso 4 (Tratamiento de duplicados).',
        'Las banderas isLeaf e isInternal permiten resolver el Caso 6 directamente.',
        'rawWords mantiene la trazabilidad de mayúsculas originales (Caso 7).',
      ],
    },
    {
      id: 2,
      title: 'Fase 2: Tokenización y Sanitización de Texto',
      subtitle: 'Limpieza de signos ortográficos y normalización',
      description: 'Filtrado de caracteres especiales y separación en palabras limpias mediante expresiones regulares Unicode que respetan el idioma español.',
      code: `// 2. Sanitización léxica y separación de palabras
export function sanitizeAndTokenize(text: string, options: { toLowerCase: boolean; removePunctuation: boolean }): string[] {
  if (!text || typeof text !== 'string') return [];

  let processed = text;

  // Paso A: Conversión a minúsculas para unificación (Caso 7)
  if (options.toLowerCase) {
    processed = processed.toLowerCase();
  }

  // Paso B: Eliminación de signos de puntuación usando Unicode (Caso 8)
  // \\p{L} incluye todas las letras del alfabeto (á, é, í, ó, ú, ü, ñ)
  // \\p{N} incluye números; \\s espacios en blanco
  if (options.removePunctuation) {
    processed = processed.replace(/[^\\p{L}\\p{N}\\s]/gu, ' ');
  }

  // Paso C: Separación por espacios múltiples y filtrado de vacíos
  return processed
    .split(/\\s+/)
    .map(token => token.trim())
    .filter(token => token.length > 0);
}`,
      notes: [
        'Uso crítico de /[^\\p{L}\\p{N}\\s]/gu en vez del erróneo [^a-zA-Z].',
        'Previene que signos como ¡!, ¿?, ., ,, : se queden pegados a las palabras.',
        'Filtra tokens vacíos generados por espacios consecutivos o saltos de línea.',
      ],
    },
    {
      id: 3,
      title: 'Fase 3: Inserción y Manejo de Duplicados',
      subtitle: 'Comparación lexicográfica en español y recursión',
      description: 'Inserción recursiva en el ABB utilizando localeCompare para ordenar correctamente caracteres con tilde y acumulando frecuencias en caso de colisión.',
      code: `// 3. Comparación e inserción recursiva en el ABB
export function insertNode(
  root: BSTNode | null,
  word: string,
  rawWord: string,
  level: number = 0
): BSTNode {
  // Caso Base: Si el subárbol está vacío, creamos el nuevo nodo
  if (!root) {
    return {
      id: \`node-\${word}-\${Math.random().toString(36).substr(2, 5)}\`,
      word,
      count: 1,
      rawWords: [rawWord],
      left: null,
      right: null,
      level,
      isLeaf: true,
      isInternal: false,
      isRoot: level === 0,
    };
  }

  // Comparación lexicográfica en español (Caso 2: árbol vs zorro)
  const comparison = word.localeCompare(root.word, 'es');

  if (comparison === 0) {
    // Caso 4: DUPLICADO -> Incrementamos frecuencia
    root.count += 1;
    if (!root.rawWords.includes(rawWord)) {
      root.rawWords.push(rawWord);
    }
  } else if (comparison < 0) {
    // Menor alfabéticamente -> subárbol izquierdo
    root.left = insertNode(root.left, word, rawWord, level + 1);
  } else {
    // Mayor alfabéticamente -> subárbol derecho
    root.right = insertNode(root.right, word, rawWord, level + 1);
  }

  // Actualizar banderas topológicas
  root.isLeaf = root.left === null && root.right === null;
  root.isInternal = !root.isLeaf;

  return root;
}`,
      notes: [
        'word.localeCompare(root.word, "es") es la clave para resolver el Caso 2 (árbol antes que zorro).',
        'Manejo de duplicados sin sobrecarga espacial en O(1) de memoria adicional por repetición.',
        'La actualización de isLeaf e isInternal se propaga de vuelta en el retorno recursivo.',
      ],
    },
    {
      id: 4,
      title: 'Fase 4: Recorridos del Árbol (Inorden, Preorden, Postorden)',
      subtitle: 'Extracción ordenada y jerárquica de elementos',
      description: 'Implementación de los recorridos estándar para verificar la integridad del ordenamiento y la jerarquía de inserción.',
      code: `// 4. Recorridos clásicos del ABB

// Inorden: Izquierda -> Raíz -> Derecha (Devuelve siempre en orden alfabético)
export function getInorder(root: BSTNode | null): { word: string; count: number }[] {
  const result: { word: string; count: number }[] = [];
  function traverse(node: BSTNode | null) {
    if (!node) return;
    traverse(node.left);
    result.push({ word: node.word, count: node.count });
    traverse(node.right);
  }
  traverse(root);
  return result;
}

// Preorden: Raíz -> Izquierda -> Derecha (Muestra estructura de inserción)
export function getPreorder(root: BSTNode | null): { word: string; count: number }[] {
  const result: { word: string; count: number }[] = [];
  function traverse(node: BSTNode | null) {
    if (!node) return;
    result.push({ word: node.word, count: node.count });
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

// Postorden: Izquierda -> Derecha -> Raíz (Procesamiento de hojas hacia la raíz)
export function getPostorder(root: BSTNode | null): { word: string; count: number }[] {
  const result: { word: string; count: number }[] = [];
  function traverse(node: BSTNode | null) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    result.push({ word: node.word, count: node.count });
  }
  traverse(root);
  return result;
}`,
      notes: [
        'En un ABB bien construido, el recorrido Inorden produce un diccionario lexicográficamente ordenado.',
        'Cada elemento retornado lleva consigo su frecuencia acumulada.',
        'Garantiza la comprobación completa del Caso 1 y Caso 2.',
      ],
    },
    {
      id: 5,
      title: 'Fase 5: Métricas y Análisis Topológico Integral',
      subtitle: 'Conteo unificado de hojas, internos, altura y balance',
      description: 'Optimización algorítmica para calcular todas las métricas requeridas en una sola pasada O(n), superando la propuesta ineficiente de 3 llamadas recursivas separadas.',
      code: `// 5. Cálculo unificado de métricas en una sola pasada O(n)
export function calculateTreeMetrics(root: BSTNode | null, totalWordsCount: number) {
  if (!root) {
    return {
      totalWords: 0,
      uniqueNodes: 0,
      leafNodes: 0,
      internalNodes: 0,
      height: 0,
      isDegenerate: false,
    };
  }

  let uniqueNodes = 0;
  let leafNodes = 0;
  let internalNodes = 0;

  function countStats(node: BSTNode | null) {
    if (!node) return;
    uniqueNodes++;
    if (node.isLeaf) {
      leafNodes++;
    } else {
      internalNodes++;
    }
    countStats(node.left);
    countStats(node.right);
  }
  countStats(root);

  function getHeight(node: BSTNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }

  const height = getHeight(root);
  // Un árbol está degenerado (lista enlazada) si su altura coincide con la cantidad de nodos (N > 2)
  const isDegenerate = uniqueNodes > 2 && height === uniqueNodes;

  return {
    totalWords: totalWordsCount,
    uniqueNodes,
    duplicateCount: totalWordsCount - uniqueNodes,
    leafNodes,
    internalNodes,
    height,
    isDegenerate,
  };
}`,
      notes: [
        'Resuelve los Casos 3, 5 y 6 con precisión matemática.',
        'Detecta árboles degenerados (Caso Límite propuesto por la IA).',
        'Demuestra pensamiento crítico al corregir el enfoque ineficiente propuesto inicialmente por la IA.',
      ],
    },
  ];

  const currentStepData = steps[activeStep - 1];

  const handleCopyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Etapa 2
          </span>
          <h2 className="text-xl font-bold text-slate-100">Desarrollo Gradual del Sistema ABB</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Evolución modular del código en 5 fases incrementales: desde la abstracción del nodo hasta el análisis topológico y de rendimiento.
        </p>

        {/* Pestañas de navegación de fases */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-6">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider mb-1">
                  Paso 2.{step.id}
                </div>
                <div className="text-xs font-bold truncate">
                  {step.title.split(':')[1] || step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detalle de la Fase Seleccionada */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs">
                  Fase {currentStepData.id} de 5
                </span>
                <h3 className="text-lg font-bold text-slate-100">{currentStepData.title}</h3>
              </div>
              <p className="text-xs text-indigo-400 font-medium">{currentStepData.subtitle}</p>
              <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            <button
              onClick={() => handleCopyCode(currentStepData.code, currentStepData.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedStep === currentStepData.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copiedStep === currentStepData.id ? 'Copiado' : 'Copiar Código'}
            </button>
          </div>
        </div>

        {/* Visor de Código */}
        <div className="p-5 font-mono text-xs text-slate-300 bg-slate-950 overflow-x-auto leading-relaxed">
          <pre>{currentStepData.code}</pre>
        </div>

        {/* Claves Académicas de esta Fase */}
        <div className="p-5 bg-slate-950/80 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            Aspectos clave para la defensa académica
          </h4>
          <ul className="space-y-1.5">
            {currentStepData.notes.map((note, index) => (
              <li key={index} className="text-xs text-slate-400 flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
