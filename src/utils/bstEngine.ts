import { BSTNode, TreeMetrics, Traversals, SanitizationOptions } from '../types/bst';

/**
 * Sanitiza y divide el texto de entrada en tokens de palabras.
 * Demuestra la limpieza de datos requerida en los casos 7 y 8.
 */
export function sanitizeAndTokenize(text: string, options: SanitizationOptions): string[] {
  if (!text || typeof text !== 'string') return [];

  let processed = text;

  // 1. Manejo de minúsculas
  if (options.toLowerCase) {
    processed = processed.toLowerCase();
  }

  // 2. Limpieza de puntuación (manteniendo caracteres con acento, ñ y números si aplica)
  if (options.removePunctuation) {
    // Reemplaza cualquier caracter que no sea letra Unicode, dígito o espacio/guión
    // En español: ¡!¿?,.;:()[]{}"'_—\/\*\+&$#@%^~`|<>
    processed = processed.replace(/[^\p{L}\p{N}\s]/gu, ' ');
  }

  // 3. Separación por espacios en blanco y filtrado de cadenas vacías
  const tokens = processed
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 0);

  return tokens;
}

/**
 * Compara dos palabras según la configuración seleccionada.
 * Retorna:
 *  < 0 si word1 < word2
 *    0 si word1 === word2
 *  > 0 si word1 > word2
 */
export function compareWords(word1: string, word2: string, options: SanitizationOptions): number {
  if (options.spanishLocaleSort) {
    // Comparación lexicográfica conforme al idioma español (maneja tildes y diéresis de forma consistente)
    if (options.normalizeAccentsForComparison) {
      // Sensibilidad base: 'árbol' y 'arbol' se consideran iguales
      return word1.localeCompare(word2, 'es', { sensitivity: 'base' });
    }
    // Sensibilidad estándar con reglas del español
    return word1.localeCompare(word2, 'es');
  } else {
    // Comparación ASCII / Unicode estándar (reproduce el error típico detectado en Etapa 3)
    if (word1 < word2) return -1;
    if (word1 > word2) return 1;
    return 0;
  }
}

/**
 * Inserta recursivamente una palabra en el árbol binario de búsqueda.
 * Maneja duplicados acumulando su frecuencia (count).
 */
export function insertNode(
  root: BSTNode | null,
  word: string,
  rawWord: string,
  options: SanitizationOptions,
  currentLevel: number = 0
): BSTNode {
  if (!root) {
    return {
      id: `node-${word}-${Math.random().toString(36).substring(2, 7)}`,
      word,
      count: 1,
      rawWords: [rawWord],
      left: null,
      right: null,
      level: currentLevel,
      isLeaf: true,
      isInternal: false,
      isRoot: currentLevel === 0,
    };
  }

  const comparison = compareWords(word, root.word, options);

  if (comparison === 0) {
    // DUPLICADO: Se incrementa el contador de frecuencia en vez de descartar o crear nodo duplicado
    root.count += 1;
    if (!root.rawWords.includes(rawWord)) {
      root.rawWords.push(rawWord);
    }
    return root;
  } else if (comparison < 0) {
    root.left = insertNode(root.left, word, rawWord, options, currentLevel + 1);
  } else {
    root.right = insertNode(root.right, word, rawWord, options, currentLevel + 1);
  }

  // Actualizar metadatos del nodo tras la inserción
  updateNodeMetadata(root, currentLevel);
  return root;
}

/**
 * Actualiza si el nodo es hoja o nodo interno, y su nivel.
 */
function updateNodeMetadata(node: BSTNode, level: number): void {
  node.level = level;
  node.isLeaf = node.left === null && node.right === null;
  node.isInternal = !node.isLeaf;
  node.isRoot = level === 0;
}

/**
 * Construye el ABB completo a partir de una lista de tokens.
 */
export function buildBST(tokens: string[], options: SanitizationOptions, rawTokens?: string[]): BSTNode | null {
  let root: BSTNode | null = null;
  const sources = rawTokens || tokens;

  for (let i = 0; i < tokens.length; i++) {
    root = insertNode(root, tokens[i], sources[i] || tokens[i], options, 0);
  }

  if (root) {
    refreshTreeLevelsAndTypes(root, 0);
  }

  return root;
}

/**
 * Re-recorre el árbol para asegurar niveles y clasificaciones correctas.
 */
export function refreshTreeLevelsAndTypes(node: BSTNode | null, level: number): void {
  if (!node) return;
  node.level = level;
  node.isLeaf = node.left === null && node.right === null;
  node.isInternal = !node.isLeaf;
  node.isRoot = level === 0;

  refreshTreeLevelsAndTypes(node.left, level + 1);
  refreshTreeLevelsAndTypes(node.right, level + 1);
}

/**
 * Recorrido Inorden (Izquierda, Raíz, Derecha).
 * En un ABB, siempre produce los elementos en orden alfabético ascendente.
 */
export function getInorder(node: BSTNode | null): { word: string; count: number }[] {
  const result: { word: string; count: number }[] = [];
  function traverse(n: BSTNode | null) {
    if (!n) return;
    traverse(n.left);
    result.push({ word: n.word, count: n.count });
    traverse(n.right);
  }
  traverse(node);
  return result;
}

/**
 * Recorrido Preorden (Raíz, Izquierda, Derecha).
 * Muestra la estructura jerárquica de inserción original.
 */
export function getPreorder(node: BSTNode | null): { word: string; count: number }[] {
  const result: { word: string; count: number }[] = [];
  function traverse(n: BSTNode | null) {
    if (!n) return;
    result.push({ word: n.word, count: n.count });
    traverse(n.left);
    traverse(n.right);
  }
  traverse(node);
  return result;
}

/**
 * Recorrido Postorden (Izquierda, Derecha, Raíz).
 * Útil para eliminación o procesamiento de abajo hacia arriba.
 */
export function getPostorder(node: BSTNode | null): { word: string; count: number }[] {
  const result: { word: string; count: number }[] = [];
  function traverse(n: BSTNode | null) {
    if (!n) return;
    traverse(n.left);
    traverse(n.right);
    result.push({ word: n.word, count: n.count });
  }
  traverse(node);
  return result;
}

/**
 * Recorrido por Niveles (BFS).
 */
export function getLevelOrder(node: BSTNode | null): { level: number; nodes: { word: string; count: number }[] }[] {
  if (!node) return [];
  const levelsMap: Map<number, { word: string; count: number }[]> = new Map();

  const queue: { node: BSTNode; level: number }[] = [{ node, level: 0 }];

  while (queue.length > 0) {
    const { node: curr, level } = queue.shift()!;
    if (!levelsMap.has(level)) {
      levelsMap.set(level, []);
    }
    levelsMap.get(level)!.push({ word: curr.word, count: curr.count });

    if (curr.left) queue.push({ node: curr.left, level: level + 1 });
    if (curr.right) queue.push({ node: curr.right, level: level + 1 });
  }

  const result: { level: number; nodes: { word: string; count: number }[] }[] = [];
  levelsMap.forEach((nodes, level) => {
    result.push({ level, nodes });
  });

  return result;
}

/**
 * Calcula todas las métricas del árbol binario de búsqueda.
 */
export function calculateTreeMetrics(root: BSTNode | null, totalWordsCount: number): TreeMetrics {
  if (!root) {
    return {
      totalWords: totalWordsCount,
      uniqueNodes: 0,
      duplicateCount: totalWordsCount,
      leafNodes: 0,
      internalNodes: 0,
      height: 0,
      maxDepth: 0,
      isDegenerate: false,
      balanceScore: 100,
    };
  }

  let uniqueNodes = 0;
  let leafNodes = 0;
  let internalNodes = 0;

  function countStats(n: BSTNode | null) {
    if (!n) return;
    uniqueNodes++;
    if (n.isLeaf) {
      leafNodes++;
    } else {
      internalNodes++;
    }
    countStats(n.left);
    countStats(n.right);
  }

  countStats(root);

  function getHeight(n: BSTNode | null): number {
    if (!n) return 0;
    return 1 + Math.max(getHeight(n.left), getHeight(n.right));
  }

  const height = getHeight(root);
  const maxDepth = height > 0 ? height - 1 : 0;

  // Un árbol está degenerado (tipo lista enlazada) si la altura es igual al número de nodos únicos (para N > 1)
  const isDegenerate = uniqueNodes > 2 && height === uniqueNodes;

  // Balance score simplificado (100% es óptimo log2(n))
  const optimalHeight = uniqueNodes > 0 ? Math.ceil(Math.log2(uniqueNodes + 1)) : 0;
  const balanceScore = uniqueNodes <= 2 ? 100 : Math.max(20, Math.round((optimalHeight / height) * 100));

  return {
    totalWords: totalWordsCount,
    uniqueNodes,
    duplicateCount: totalWordsCount - uniqueNodes,
    leafNodes,
    internalNodes,
    height,
    maxDepth,
    isDegenerate,
    balanceScore,
  };
}

/**
 * Calcula coordenadas visuales (x, y) de cada nodo para representación SVG limpia.
 * Algoritmo de distribución proporcional por subárboles para evitar superposición.
 */
export function layoutTreeSVG(
  root: BSTNode | null,
  containerWidth: number = 800,
  verticalSpacing: number = 75
): BSTNode | null {
  if (!root) return null;

  // Clona el árbol para no mutar inadvertidamente
  const cloneTree = (n: BSTNode | null): BSTNode | null => {
    if (!n) return null;
    return {
      ...n,
      left: cloneTree(n.left),
      right: cloneTree(n.right),
    };
  };

  const clonedRoot = cloneTree(root);
  if (!clonedRoot) return null;

  // Asigna posición X mediante recorrido Inorden modificado
  let currentXIndex = 0;
  const nodeCount = countNodes(clonedRoot);
  const step = Math.max(70, Math.min(140, containerWidth / (nodeCount + 1)));

  function assignXCoordinates(node: BSTNode | null) {
    if (!node) return;
    assignXCoordinates(node.left);
    node.x = (currentXIndex + 1) * step + 40;
    currentXIndex++;
    assignXCoordinates(node.right);
  }

  assignXCoordinates(clonedRoot);

  // Asigna posición Y basada en el nivel
  function assignYCoordinates(node: BSTNode | null) {
    if (!node) return;
    node.y = 45 + node.level * verticalSpacing;
    assignYCoordinates(node.left);
    assignYCoordinates(node.right);
  }

  assignYCoordinates(clonedRoot);

  return clonedRoot;
}

function countNodes(node: BSTNode | null): number {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

/**
 * Busca una palabra en el árbol y registra la ruta recorrida para visualización interactiva.
 */
export function searchWordWithTrace(
  root: BSTNode | null,
  targetWord: string,
  options: SanitizationOptions
): { found: boolean; path: string[]; targetNode: BSTNode | null } {
  if (!root || !targetWord) {
    return { found: false, path: [], targetNode: null };
  }

  const path: string[] = [];
  let curr: BSTNode | null = root;

  while (curr !== null) {
    path.push(curr.word);
    const comp = compareWords(targetWord, curr.word, options);

    if (comp === 0) {
      return { found: true, path, targetNode: curr };
    } else if (comp < 0) {
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }

  return { found: false, path, targetNode: null };
}
