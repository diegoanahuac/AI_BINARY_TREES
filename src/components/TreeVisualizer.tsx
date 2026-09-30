import React, { useState, useRef, useMemo } from 'react';
import { BSTNode, SanitizationOptions } from '../types/bst';
import { layoutTreeSVG, searchWordWithTrace } from '../utils/bstEngine';
import { ZoomIn, ZoomOut, RotateCcw, Search, Sparkles, Layers, CheckCircle2, Info } from 'lucide-react';

interface TreeVisualizerProps {
  root: BSTNode | null;
  options: SanitizationOptions;
  highlightedWords?: string[];
  onSelectNode?: (node: BSTNode) => void;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  root,
  options,
  highlightedWords = [],
  onSelectNode,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<BSTNode | null>(null);
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    path: string[];
    targetNode?: BSTNode | null;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Genera el árbol con coordenadas x, y
  const visualTree = useMemo(() => {
    if (!root) return null;
    return layoutTreeSVG(root, 750, 75);
  }, [root]);

  // Recolectar todos los nodos y aristas (edges) para renderizar SVG
  const { nodesList, edgesList, boundingBox } = useMemo(() => {
    const nodes: BSTNode[] = [];
    const edges: { fromX: number; fromY: number; toX: number; toY: number; id: string; targetWord: string }[] = [];
    let minX = 0;
    let maxX = 800;
    let maxY = 350;

    if (!visualTree) {
      return { nodesList: nodes, edgesList: edges, boundingBox: { minX, maxX, maxY } };
    }

    function collect(node: BSTNode) {
      nodes.push(node);
      if (node.x !== undefined && node.y !== undefined) {
        if (node.x < minX) minX = node.x;
        if (node.x > maxX) maxX = node.x;
        if (node.y > maxY) maxY = node.y;
      }

      if (node.left && node.x !== undefined && node.y !== undefined && node.left.x !== undefined && node.left.y !== undefined) {
        edges.push({
          fromX: node.x,
          fromY: node.y,
          toX: node.left.x,
          toY: node.left.y,
          id: `edge-${node.id}-${node.left.id}`,
          targetWord: node.left.word,
        });
        collect(node.left);
      }

      if (node.right && node.x !== undefined && node.y !== undefined && node.right.x !== undefined && node.right.y !== undefined) {
        edges.push({
          fromX: node.x,
          fromY: node.y,
          toX: node.right.x,
          toY: node.right.y,
          id: `edge-${node.id}-${node.right.id}`,
          targetWord: node.right.word,
        });
        collect(node.right);
      }
    }

    collect(visualTree);
    return {
      nodesList: nodes,
      edgesList: edges,
      boundingBox: { minX: Math.max(0, minX - 60), maxX: maxX + 80, maxY: maxY + 80 },
    };
  }, [visualTree]);

  // Manejador de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!root || !searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
    const cleanWord = options.toLowerCase ? searchQuery.trim().toLowerCase() : searchQuery.trim();
    const result = searchWordWithTrace(root, cleanWord, options);
    setSearchResult(result);
    if (result.targetNode) {
      setSelectedNode(result.targetNode);
      if (onSelectNode) onSelectNode(result.targetNode);
    }
  };

  // Manejadores de arrastre y zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // solo botón izquierdo
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSearchResult(null);
    setSelectedNode(null);
  };

  if (!root) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl text-slate-400 min-h-[300px]">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
          <Layers className="w-7 h-7" />
        </div>
        <p className="font-semibold text-slate-200 text-lg">El árbol está vacío</p>
        <p className="text-sm text-slate-400 max-w-md text-center mt-1">
          Ingresa un texto o selecciona uno de los casos de prueba para generar y visualizar dinámicamente el Árbol Binario de Búsqueda.
        </p>
      </div>
    );
  }

  const svgWidth = Math.max(760, boundingBox.maxX);
  const svgHeight = Math.max(340, boundingBox.maxY);

  return (
    <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Barra superior de herramientas del visualizador */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/70 border-b border-slate-800 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ABB Activo
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {nodesList.length} nodos únicos
          </span>
        </div>

        {/* Buscador de palabra en el árbol */}
        <form onSubmit={handleSearch} className="flex items-center gap-1.5 flex-1 max-w-xs">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar palabra..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </form>

        {/* Controles de zoom y reset */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
            title="Acercar"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))}
            title="Alejar"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            title="Centrar y reiniciar vista"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notificación de búsqueda si existe */}
      {searchResult && (
        <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
          searchResult.found
            ? 'bg-emerald-950/60 text-emerald-200 border-emerald-800/50'
            : 'bg-rose-950/60 text-rose-200 border-rose-800/50'
        }`}>
          <div className="flex items-center gap-2">
            {searchResult.found ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>
              {searchResult.found
                ? `¡Palabra encontrada! Ruta de búsqueda: ${searchResult.path.join(' ➔ ')}`
                : `Palabra no encontrada en el árbol. Ruta recorrida antes de null: ${searchResult.path.join(' ➔ ')}`}
            </span>
          </div>
          <button
            onClick={() => setSearchResult(null)}
            className="text-xs underline hover:text-white cursor-pointer ml-3"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Canvas interactivo SVG */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-[400px] overflow-hidden cursor-grab active:cursor-grabbing select-none relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          className="transition-transform duration-75 origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="edgeGradHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Aristas (Líneas de conexión entre nodos) */}
          {edgesList.map((edge) => {
            const isPathEdge =
              searchResult &&
              searchResult.path.includes(edge.targetWord);

            return (
              <g key={edge.id}>
                <line
                  x1={edge.fromX}
                  y1={edge.fromY}
                  x2={edge.toX}
                  y2={edge.toY}
                  stroke={isPathEdge ? '#10b981' : '#334155'}
                  strokeWidth={isPathEdge ? 3.5 : 2}
                  strokeDasharray={isPathEdge ? '4 2' : 'none'}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Nodos del árbol */}
          {nodesList.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isSearched = searchResult?.path.includes(node.word);
            const isTarget = searchResult?.found && searchResult.targetNode?.word === node.word;
            const isHighlighted = highlightedWords.includes(node.word);

            // Colores según tipo de nodo
            let nodeBg = '#1e293b'; // slate-800 default
            let nodeBorder = '#475569';
            let textColor = '#f1f5f9';

            if (node.isRoot) {
              nodeBg = '#312e81'; // indigo-900
              nodeBorder = '#6366f1'; // indigo-500
            } else if (node.isLeaf) {
              nodeBg = '#064e3b'; // emerald-950
              nodeBorder = '#10b981'; // emerald-500
            } else if (node.isInternal) {
              nodeBg = '#1e1b4b'; // violet-950
              nodeBorder = '#8b5cf6'; // violet-500
            }

            if (isTarget) {
              nodeBg = '#065f46';
              nodeBorder = '#34d399';
            } else if (isSelected) {
              nodeBorder = '#fbbf24'; // amber
            }

            const x = node.x ?? 0;
            const y = node.y ?? 0;

            return (
              <g
                key={node.id}
                transform={`translate(${x}, ${y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(node);
                  if (onSelectNode) onSelectNode(node);
                }}
                className="cursor-pointer group"
              >
                {/* Halo brillante si está seleccionado o en la ruta de búsqueda */}
                {(isSelected || isTarget || isHighlighted) && (
                  <circle
                    r={32}
                    fill="none"
                    stroke={isTarget ? '#10b981' : '#fbbf24'}
                    strokeWidth={2.5}
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ transformOrigin: '0 0' }}
                  />
                )}

                {/* Círculo del nodo */}
                <circle
                  r={26}
                  fill={nodeBg}
                  stroke={nodeBorder}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200 group-hover:scale-110"
                />

                {/* Texto de la palabra */}
                <text
                  textAnchor="middle"
                  dy="4"
                  fill={textColor}
                  fontSize={node.word.length > 8 ? 9 : node.word.length > 5 ? 10 : 12}
                  fontWeight="600"
                  className="pointer-events-none select-none"
                >
                  {node.word}
                </text>

                {/* Badge de frecuencia si es > 1 (Tratamiento de duplicados) */}
                {node.count > 1 && (
                  <g transform="translate(18, -16)">
                    <circle r={10} fill="#dc2626" stroke="#ffffff" strokeWidth={1.5} />
                    <text
                      textAnchor="middle"
                      dy="3.5"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      ×{node.count}
                    </text>
                  </g>
                )}

                {/* Indicador de rol: Raíz (R), Interno (I), Hoja (H) */}
                <g transform="translate(0, 36)">
                  <rect
                    x="-18"
                    y="-7"
                    width="36"
                    height="14"
                    rx="7"
                    fill={node.isRoot ? '#4338ca' : node.isLeaf ? '#047857' : '#6d28d9'}
                  />
                  <text
                    textAnchor="middle"
                    dy="3"
                    fill="#ffffff"
                    fontSize="8"
                    fontWeight="600"
                  >
                    {node.isRoot ? 'RAÍZ' : node.isLeaf ? 'HOJA' : 'INTERNO'}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Leyenda flotante en la esquina inferior */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 backdrop-blur text-[11px] text-slate-300 flex flex-wrap gap-3 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Raíz</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
            <span>Nodo Interno</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Hoja</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Duplicado (×N)</span>
          </div>
        </div>
      </div>

      {/* Ficha de inspección del nodo seleccionado */}
      {selectedNode && (
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
              selectedNode.isRoot ? 'bg-indigo-600' : selectedNode.isLeaf ? 'bg-emerald-600' : 'bg-violet-600'
            }`}>
              {selectedNode.isRoot ? 'R' : selectedNode.isLeaf ? 'H' : 'I'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-sm">{selectedNode.word}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  Nivel {selectedNode.level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Frecuencia: {selectedNode.count}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Clasificación: <strong className="text-slate-200">{selectedNode.isRoot ? 'Nodo Raíz' : selectedNode.isLeaf ? 'Nodo Hoja (sin hijos)' : 'Nodo Interno'}</strong> | Formas originales: {selectedNode.rawWords.join(', ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div>
              Hijo Izquierdo: <span className="font-semibold text-slate-200">{selectedNode.left ? selectedNode.left.word : 'null'}</span>
            </div>
            <div>
              Hijo Derecho: <span className="font-semibold text-slate-200">{selectedNode.right ? selectedNode.right.word : 'null'}</span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-slate-500 hover:text-slate-300 ml-2 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
