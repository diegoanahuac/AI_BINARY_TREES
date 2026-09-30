import React, { useState, useMemo } from 'react';
import { SanitizationOptions, BSTNode } from '../types/bst';
import { sanitizeAndTokenize, buildBST, calculateTreeMetrics, getInorder, getPreorder, getPostorder, getLevelOrder } from '../utils/bstEngine';
import { TreeVisualizer } from './TreeVisualizer';
import { Play, Sparkles, RefreshCw, Layers, Sliders, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

interface InteractivePlaygroundProps {
  initialInput?: string;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  initialInput = 'gato perro casa',
}) => {
  const [inputText, setInputText] = useState<string>(initialInput);
  const [options, setOptions] = useState<SanitizationOptions>({
    toLowerCase: true,
    removePunctuation: true,
    normalizeAccentsForComparison: false,
    spanishLocaleSort: true, // Si es false, se aprecia el bug de 'árbol' vs 'zorro'
  });
  const [activeTraversalTab, setActiveTraversalTab] = useState<'inorder' | 'preorder' | 'postorder' | 'levels'>('inorder');
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<BSTNode | null>(null);

  // Generación reactiva del árbol
  const rawTokens = useMemo(() => {
    // Tokens sin toLowerCase para guardar formas originales si aplica
    return inputText
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .map(t => t.trim())
      .filter(t => t.length > 0);
  }, [inputText]);

  const tokens = useMemo(() => {
    return sanitizeAndTokenize(inputText, options);
  }, [inputText, options]);

  const treeRoot = useMemo(() => {
    return buildBST(tokens, options, rawTokens);
  }, [tokens, options, rawTokens]);

  const metrics = useMemo(() => {
    return calculateTreeMetrics(treeRoot, tokens.length);
  }, [treeRoot, tokens.length]);

  const traversals = useMemo(() => {
    return {
      inorder: getInorder(treeRoot),
      preorder: getPreorder(treeRoot),
      postorder: getPostorder(treeRoot),
      levels: getLevelOrder(treeRoot),
    };
  }, [treeRoot]);

  // Presets rápidos para pruebas
  const presets = [
    { label: 'Caso 1: gato perro casa', text: 'gato perro casa' },
    { label: 'Caso 2: zorro árbol abeja', text: 'zorro árbol abeja' },
    { label: 'Caso 4: Duplicados', text: 'sol luna sol estrella luna sol' },
    { label: 'Caso 6: Niveles', text: 'madrid barcelona sevilla valencia bilbao zaragoza cadiz' },
    { label: 'Caso 7: Mayúsculas', text: 'Python PYTHON python PyThOn java JAVA Java C C c' },
    { label: 'Caso 8: Signos', text: '¡Hola, mundo! ¿El árbol binario funciona? Sí; ¡funciona muy, muy bien!' },
    { label: 'Límite: Ordenado (Degenerado)', text: 'abeja casa dedo elefante foca gato hormiga' },
  ];

  return (
    <div className="space-y-6">
      {/* Panel de Entrada y Configuración */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              Simulador y Visualizador Interactivo del ABB
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Escribe cualquier texto libre o selecciona un preset para observar la tokenización, inserción, recorridos y topología en tiempo real.
            </p>
          </div>

          {/* Presets rápidos */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Cargar preset:</span>
            {presets.slice(0, 4).map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(p.text)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              >
                {p.label.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Área de texto de entrada */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Texto de entrada para construir el ABB:</span>
            <span className="text-slate-500 font-normal">
              {tokens.length} palabras detectadas • {metrics.uniqueNodes} nodos únicos
            </span>
          </label>
          <textarea
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe palabras u oraciones aquí..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-y"
          />
        </div>

        {/* Opciones de Normalización y Comparación */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Sliders className="w-3.5 h-3.5" />
            <span>Reglas de procesamiento:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={options.toLowerCase}
                onChange={(e) => setOptions({ ...options, toLowerCase: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Normalizar a minúsculas</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={options.removePunctuation}
                onChange={(e) => setOptions({ ...options, removePunctuation: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Limpiar signos ortográficos</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={options.spanishLocaleSort}
                onChange={(e) => setOptions({ ...options, spanishLocaleSort: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
              <span className={options.spanishLocaleSort ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                {options.spanishLocaleSort ? 'Orden español (localeCompare)' : 'ASCII primitivo (<, > con bug)'}
              </span>
            </label>
          </div>
        </div>

        {/* Tokens extraídos (Pills) */}
        {tokens.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider mb-2">
              Tokens léxicos extraídos ({tokens.length}):
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {tokens.map((tok, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-950 text-indigo-300 border border-slate-800"
                >
                  {tok}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Métricas Topológicas Cuantitativas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Palabras</span>
          <div className="text-2xl font-bold text-slate-100 mt-1">{metrics.totalWords}</div>
          <span className="text-[10px] text-slate-400">Flujo procesado</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Nodos Únicos</span>
          <div className="text-2xl font-bold text-indigo-300 mt-1">{metrics.uniqueNodes}</div>
          <span className="text-[10px] text-slate-400">En el árbol</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Duplicados</span>
          <div className="text-2xl font-bold text-rose-300 mt-1">{metrics.duplicateCount}</div>
          <span className="text-[10px] text-slate-400">Frecuencias extras</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Nodos Hoja</span>
          <div className="text-2xl font-bold text-emerald-300 mt-1">{metrics.leafNodes}</div>
          <span className="text-[10px] text-slate-400">Sin hijos</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Nodos Internos</span>
          <div className="text-2xl font-bold text-purple-300 mt-1">{metrics.internalNodes}</div>
          <span className="text-[10px] text-slate-400">Con al menos 1 hijo</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Altura del Árbol</span>
          <div className="text-2xl font-bold text-amber-300 mt-1">{metrics.height}</div>
          <span className={`text-[10px] ${metrics.isDegenerate ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
            {metrics.isDegenerate ? 'Degenerado O(n)' : 'Balanceado'}
          </span>
        </div>
      </div>

      {/* Visualizador del Árbol */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Topología Dinámica del ABB
          </h3>
          <span className="text-xs text-slate-400">
            Haz clic en cualquier nodo para inspeccionar sus punteros y atributos
          </span>
        </div>
        <TreeVisualizer
          root={treeRoot}
          options={options}
          onSelectNode={(node) => setSelectedNodeInfo(node)}
        />
      </div>

      {/* Recorridos del Árbol */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-200">
            Recorridos del Árbol Binario de Búsqueda
          </h3>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTraversalTab('inorder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTraversalTab === 'inorder'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Inorden (LNR - Alfabético)
            </button>
            <button
              onClick={() => setActiveTraversalTab('preorder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTraversalTab === 'preorder'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Preorden (NLR)
            </button>
            <button
              onClick={() => setActiveTraversalTab('postorder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTraversalTab === 'postorder'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Postorden (LRN)
            </button>
            <button
              onClick={() => setActiveTraversalTab('levels')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTraversalTab === 'levels'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Por Niveles (BFS)
            </button>
          </div>
        </div>

        <div className="p-5 font-mono text-xs text-slate-200 bg-slate-950/70">
          {activeTraversalTab === 'inorder' && (
            <div>
              <div className="text-[11px] text-emerald-400 mb-2 font-sans">
                💡 En un ABB válido, el recorrido <strong>Inorden (Izquierda → Raíz → Derecha)</strong> siempre lista los elementos en orden alfabético ascendente:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {traversals.inorder.length > 0 ? (
                  traversals.inorder.map((item, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300 font-bold">
                        {item.word} {item.count > 1 ? `(×${item.count})` : ''}
                      </span>
                      {idx < traversals.inorder.length - 1 && <span className="text-slate-600">→</span>}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">(árbol vacío)</span>
                )}
              </div>
            </div>
          )}

          {activeTraversalTab === 'preorder' && (
            <div>
              <div className="text-[11px] text-indigo-400 mb-2 font-sans">
                💡 Recorrido <strong>Preorden (Raíz → Izquierda → Derecha)</strong>: muestra el orden de jerarquía y permite clonar o serializar la estructura exacta del árbol:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {traversals.preorder.length > 0 ? (
                  traversals.preorder.map((item, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-slate-900 border border-indigo-500/30 text-indigo-300 font-bold">
                        {item.word}
                      </span>
                      {idx < traversals.preorder.length - 1 && <span className="text-slate-600">→</span>}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">(árbol vacío)</span>
                )}
              </div>
            </div>
          )}

          {activeTraversalTab === 'postorder' && (
            <div>
              <div className="text-[11px] text-purple-400 mb-2 font-sans">
                💡 Recorrido <strong>Postorden (Izquierda → Derecha → Raíz)</strong>: procesa las hojas antes que sus antecesores, ideal para liberación de memoria o evaluación de expresiones:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {traversals.postorder.length > 0 ? (
                  traversals.postorder.map((item, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-slate-900 border border-purple-500/30 text-purple-300 font-bold">
                        {item.word}
                      </span>
                      {idx < traversals.postorder.length - 1 && <span className="text-slate-600">→</span>}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">(árbol vacío)</span>
                )}
              </div>
            </div>
          )}

          {activeTraversalTab === 'levels' && (
            <div>
              <div className="text-[11px] text-amber-400 mb-2 font-sans">
                💡 Recorrido <strong>Por Niveles (Breadth-First Search - BFS)</strong>: agrupa los nodos según su profundidad desde la raíz:
              </div>
              <div className="space-y-2">
                {traversals.levels.length > 0 ? (
                  traversals.levels.map((lvl) => (
                    <div key={lvl.level} className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold w-16 text-center">
                        Nivel {lvl.level}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {lvl.nodes.map((n, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                            {n.word} {n.count > 1 ? `(×${n.count})` : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">(árbol vacío)</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
