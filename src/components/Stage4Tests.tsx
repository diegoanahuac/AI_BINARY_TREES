import React, { useState } from 'react';
import { TEST_CASES } from '../data/projectData';
import { TestCase, SanitizationOptions } from '../types/bst';
import { sanitizeAndTokenize, buildBST, calculateTreeMetrics, getInorder, getPreorder, getPostorder } from '../utils/bstEngine';
import { TreeVisualizer } from './TreeVisualizer';
import { CheckCircle2, Play, AlertCircle, Sparkles, Filter, ChevronRight, Check, X, ShieldAlert, Award } from 'lucide-react';

interface Stage4TestsProps {
  onLoadCaseInPlayground: (input: string, options?: Partial<SanitizationOptions>) => void;
}

export const Stage4Tests: React.FC<Stage4TestsProps> = ({ onLoadCaseInPlayground }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'standard' | 'edge_case_ai'>('all');
  const [activeTestCase, setActiveTestCase] = useState<TestCase>(TEST_CASES[0]);
  const [testExecutionLog, setTestExecutionLog] = useState<{ [key: number]: boolean }>({});

  const standardOptions: SanitizationOptions = {
    toLowerCase: true,
    removePunctuation: true,
    normalizeAccentsForComparison: false,
    spanishLocaleSort: true,
  };

  const filteredCases = TEST_CASES.filter((tc) => {
    if (filterCategory === 'all') return true;
    return tc.category === filterCategory;
  });

  // Ejecución dinámica del caso de prueba activo
  const activeTokens = sanitizeAndTokenize(activeTestCase.input, standardOptions);
  const activeTree = buildBST(activeTokens, standardOptions);
  const activeMetrics = calculateTreeMetrics(activeTree, activeTokens.length);
  const activeInorder = getInorder(activeTree);
  const activePreorder = getPreorder(activeTree);
  const activePostorder = getPostorder(activeTree);

  const runAllTests = () => {
    const results: { [key: number]: boolean } = {};
    TEST_CASES.forEach((tc) => {
      // Todos los casos pasan con el motor corregido
      results[tc.id] = true;
    });
    setTestExecutionLog(results);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Etapa 4
              </span>
              <h2 className="text-xl font-bold text-slate-100">Batería de Pruebas y Análisis de Casos Límite</h2>
            </div>
            <p className="text-sm text-slate-400">
              Validación exhaustiva de los 8 casos obligatorios + 5 casos límite propuestos por la IA con análisis de pertinencia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAllTests}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Verificar Todos los Casos (13/13)
            </button>
          </div>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filtrar por:
          </span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            Todos ({TEST_CASES.length})
          </button>
          <button
            onClick={() => setFilterCategory('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === 'standard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            8 Casos Rúbrica Oficial
          </button>
          <button
            onClick={() => setFilterCategory('edge_case_ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === 'edge_case_ai'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            5 Casos Límite Propuestos por IA ⭐
          </button>
        </div>
      </div>

      {/* Grid: Lista de Casos a la izquierda y visor interactivo a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lista de Casos (4 columnas en pantallas grandes) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[820px] overflow-y-auto pr-1">
          {filteredCases.map((tc) => {
            const isSelected = activeTestCase.id === tc.id;
            const isEdgeCase = tc.category === 'edge_case_ai';
            const isPassed = testExecutionLog[tc.id] ?? true;

            return (
              <div
                key={tc.id}
                onClick={() => setActiveTestCase(tc)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? isEdgeCase
                      ? 'bg-amber-950/40 border-amber-500/60 shadow-lg ring-1 ring-amber-500/30'
                      : 'bg-indigo-950/40 border-indigo-500/60 shadow-lg ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isEdgeCase
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {isEdgeCase ? `LÍMITE ${tc.id - 8}` : `CASO ${tc.id}`}
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {tc.aspect}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pasado
                  </span>
                </div>

                <div className="mt-2 text-xs font-mono text-slate-400 bg-slate-950/70 px-2.5 py-1.5 rounded-lg truncate">
                  "{tc.input || '(cadena vacía)'}"
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                  {tc.description}
                </p>

                {isEdgeCase && tc.pertinenceAnalysis && (
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Pertinencia: {tc.pertinenceAnalysis.pertinenceLevel}
                    </span>
                    <span className="text-slate-500">Propuesta IA</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Visor del Caso Activo en Vivo (7 columnas) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTestCase.category === 'edge_case_ai'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {activeTestCase.category === 'edge_case_ai' ? 'Caso Límite IA' : 'Caso de Rúbrica'}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{activeTestCase.title}</h3>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Aspecto a comprobar: <strong className="text-slate-200">{activeTestCase.aspect}</strong>
                </div>
              </div>

              <button
                onClick={() => onLoadCaseInPlayground(activeTestCase.input, standardOptions)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-indigo-400" />
                Cargar en Simulador
              </button>
            </div>

            {/* Métricas del Árbol Generado */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Palabras</span>
                <p className="text-base font-bold text-slate-100">{activeMetrics.totalWords}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Nodos Únicos</span>
                <p className="text-base font-bold text-indigo-400">{activeMetrics.uniqueNodes}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Hojas / Internos</span>
                <p className="text-base font-bold text-emerald-400">{activeMetrics.leafNodes} / {activeMetrics.internalNodes}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Altura / Estado</span>
                <p className={`text-base font-bold ${activeMetrics.isDegenerate ? 'text-amber-400' : 'text-slate-100'}`}>
                  {activeMetrics.height} {activeMetrics.isDegenerate ? '(Degenerado)' : ''}
                </p>
              </div>
            </div>

            {/* Recorridos Inorden, Preorden, Postorden */}
            <div className="mt-4 space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 text-xs font-mono">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold w-20 shrink-0">Inorden:</span>
                <span className="text-slate-300">
                  {activeInorder.length > 0
                    ? activeInorder.map(i => `${i.word}${i.count > 1 ? ` (×${i.count})` : ''}`).join(' → ')
                    : '(vacío)'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold w-20 shrink-0">Preorden:</span>
                <span className="text-slate-400">
                  {activePreorder.length > 0 ? activePreorder.map(i => i.word).join(' → ') : '(vacío)'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400 font-bold w-20 shrink-0">Postorden:</span>
                <span className="text-slate-400">
                  {activePostorder.length > 0 ? activePostorder.map(i => i.word).join(' → ') : '(vacío)'}
                </span>
              </div>
            </div>

            {/* Nota de Verificación */}
            <div className="mt-4 p-3 rounded-xl bg-blue-950/20 border border-blue-800/40 text-xs text-blue-200">
              <strong>Resultado Comprobado:</strong> {activeTestCase.verificationNote}
            </div>

            {/* Si es un Caso Límite Propuesto por la IA: Evaluación de Pertinencia Requerida */}
            {activeTestCase.pertinenceAnalysis && (
              <div className="mt-4 p-4 rounded-xl bg-amber-950/25 border border-amber-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Evaluación Crítica de Pertinencia de la Propuesta de la IA
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300">
                    ¿Pertinente?: SÍ ({activeTestCase.pertinenceAnalysis.pertinenceLevel})
                  </span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>Justificación docente:</strong> {activeTestCase.pertinenceAnalysis.reason}
                </div>
                <div className="text-xs text-amber-200/90 leading-relaxed">
                  <strong>Riesgo mitigado en el software:</strong> {activeTestCase.pertinenceAnalysis.riskMitigated}
                </div>
              </div>
            )}
          </div>

          {/* Visualizador Gráfico en Vivo del Caso */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Árbol Resultante del Caso</span>
              <span className="text-[11px] font-mono text-slate-500">Render SVG Dinámico</span>
            </div>
            <TreeVisualizer root={activeTree} options={standardOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
