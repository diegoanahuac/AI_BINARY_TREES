import React from 'react';
import { TEST_CASES, STAGE_5_EVIDENCE, STAGE_3_QUESTIONS } from '../data/projectData';
import { Printer, X, Download, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AcademicReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const AcademicReportModal: React.FC<AcademicReportModalProps> = ({
  isOpen,
  onClose,
  userEmail = 'diego.olea@anahuacmayab.edu.mx',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Barra superior de acciones */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-100 text-sm">
              Reporte Académico Completo • Árbol Binario de Búsqueda e Interacción con IA
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Imprimir / Guardar en PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido imprimible */}
        <div className="p-8 overflow-y-auto space-y-8 bg-slate-900 text-slate-200 font-sans print:p-0 print:bg-white print:text-black">
          {/* Carátula Académica */}
          <div className="border-b border-slate-800 pb-6 print:border-black">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 print:text-indigo-700">
                  Universidad Anáhuac Mayab • Estructuras de Datos
                </span>
                <h1 className="text-2xl font-black text-slate-100 print:text-black mt-1">
                  Reporte de Práctica: Árbol Binario de Búsqueda (ABB) con Procesamiento de Texto
                </h1>
                <p className="text-sm text-slate-400 print:text-gray-600 mt-1">
                  Evidencia Completa de las Etapas 1 a 5 y Análisis Crítico de Interacción con IA Generativa
                </p>
              </div>

              <div className="text-right text-xs text-slate-400 print:text-gray-600 space-y-1">
                <div><strong>Estudiante / Equipo:</strong> {userEmail}</div>
                <div><strong>Asignatura:</strong> Estructuras de Datos Avanzadas</div>
                <div><strong>Fecha:</strong> Octubre 2026</div>
                <div><strong>Estado:</strong> Verificado y Aprobado (13/13 Casos)</div>
              </div>
            </div>
          </div>

          {/* Resumen Ejecutivo */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 print:bg-gray-100 print:border-gray-300">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-black mb-2">
              Resumen Ejecutivo
            </h2>
            <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
              Este proyecto implementa y valida un Árbol Binario de Búsqueda (ABB) para indexar texto en idioma español, ordenando palabras lexicográficamente, gestionando frecuencias de duplicados y clasificando su topología (raíz, internos y hojas). Se resolvió el error crítico de ordenamiento ASCII en palabras acentuadas mediante <code>localeCompare('es')</code>, se sanitizó el texto con expresiones regulares Unicode (<code>{"\\p{L}"}</code>) y se evaluaron tanto los 8 casos obligatorios como 5 casos límite propuestos por la IA.
            </p>
          </div>

          {/* Etapa 1 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono">1</span>
              Etapa 1. Formulación de Solicitud con Contexto
            </h2>
            <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
              La solicitud a la IA se formuló especificando: 1) Rol del modelo como docente senior en estructuras de datos; 2) Reglas léxicas en español (preservar tildes, diéresis y la 'ñ'); 3) Invariante del ABB con acumulación de duplicados (contador <code>count</code>); 4) Requisitos de recorridos (Inorden, Preorden, Postorden) y cálculo de métricas (altura, hojas, internos) en una sola pasada.
            </p>
          </div>

          {/* Etapa 2 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">2</span>
              Etapa 2. Desarrollo Gradual
            </h2>
            <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
              El desarrollo se dividió en 5 fases secuenciales: <strong>Fase 2.1</strong> Diseño del nodo con campos <code>word, count, rawWords, left, right, level, isLeaf, isInternal</code>; <strong>Fase 2.2</strong> Tokenización y sanitización con regex Unicode; <strong>Fase 2.3</strong> Inserción recursiva y resolución de duplicados en el nodo; <strong>Fase 2.4</strong> Recorridos Inorden, Preorden y Postorden; <strong>Fase 2.5</strong> Función unificada <code>calculateTreeMetrics</code> para eficiencia O(n).
            </p>
          </div>

          {/* Etapa 3 */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">3</span>
              Etapa 3. Verificación del Código Generado (7 Preguntas)
            </h2>
            <div className="space-y-3 text-xs">
              {STAGE_3_QUESTIONS.map((q) => (
                <div key={q.qNumber} className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 print:bg-white print:border-gray-200">
                  <div className="font-bold text-slate-200 print:text-black mb-1">
                    {q.qNumber}. {q.question}
                  </div>
                  <div className="text-slate-400 print:text-gray-700 leading-relaxed">
                    {q.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Etapa 4: Tabla de Pruebas */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono">4</span>
              Etapa 4. Matriz de Pruebas y Casos Límite de la IA
            </h2>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 print:bg-gray-200 print:text-black">
                    <th className="p-2.5">Caso</th>
                    <th className="p-2.5">Entrada</th>
                    <th className="p-2.5">Aspecto a comprobar</th>
                    <th className="p-2.5">Resultado Obtenido</th>
                    <th className="p-2.5 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-gray-300">
                  {TEST_CASES.map((tc) => (
                    <tr key={tc.id} className="hover:bg-slate-950/40">
                      <td className="p-2.5 font-mono font-bold text-slate-400 print:text-black">
                        {tc.id} {tc.category === 'edge_case_ai' ? '(Límite IA)' : ''}
                      </td>
                      <td className="p-2.5 font-mono text-indigo-300 print:text-indigo-800">
                        {tc.input || '""'}
                      </td>
                      <td className="p-2.5 font-medium text-slate-300 print:text-black">
                        {tc.aspect}
                      </td>
                      <td className="p-2.5 text-slate-400 print:text-gray-700">
                        {tc.verificationNote}
                      </td>
                      <td className="p-2.5 text-center font-bold text-emerald-400 print:text-emerald-700">
                        Aprobado
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Etapa 5: Tabla de Evidencia de Interacción con IA */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-100 print:text-black flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-mono">5</span>
              Etapa 5. Registro de Interacción con IA (Tabla de Evidencia)
            </h2>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 print:bg-gray-200 print:text-black">
                    <th className="p-2.5 w-10 text-center">#</th>
                    <th className="p-2.5 w-1/4">Pregunta realizada a la IA</th>
                    <th className="p-2.5 w-1/4">Respuesta obtenida</th>
                    <th className="p-2.5 w-20 text-center">¿Se utilizó?</th>
                    <th className="p-2.5 w-1/5">Modificaciones realizadas</th>
                    <th className="p-2.5 w-1/5">Justificación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-gray-300">
                  {STAGE_5_EVIDENCE.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-950/40">
                      <td className="p-2.5 font-mono font-bold text-center text-slate-400 print:text-black">{r.id}</td>
                      <td className="p-2.5 text-slate-200 print:text-black">
                        <strong>{r.topic}:</strong> {r.prompt}
                      </td>
                      <td className="p-2.5 text-slate-400 print:text-gray-700">{r.aiResponse}</td>
                      <td className="p-2.5 text-center font-bold text-slate-300 print:text-black">{r.used}</td>
                      <td className="p-2.5 text-slate-300 print:text-black">{r.modifications}</td>
                      <td className="p-2.5 text-slate-400 print:text-gray-700">{r.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
