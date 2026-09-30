import React, { useState } from 'react';
import { STAGE_3_QUESTIONS } from '../data/projectData';
import { CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, FileCode, Check, RefreshCw } from 'lucide-react';

export const Stage3Verification: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);
  const [testAsciiBugWord1, setTestAsciiBugWord1] = useState<string>('árbol');
  const [testAsciiBugWord2, setTestAsciiBugWord2] = useState<string>('zorro');

  // Cálculo en vivo del bug de ordenamiento ASCII vs localeCompare
  const asciiComparison = testAsciiBugWord1 < testAsciiBugWord2 ? -1 : testAsciiBugWord1 > testAsciiBugWord2 ? 1 : 0;
  const spanishComparison = testAsciiBugWord1.localeCompare(testAsciiBugWord2, 'es');

  const currentQ = STAGE_3_QUESTIONS.find(q => q.qNumber === selectedQuestion) || STAGE_3_QUESTIONS[0];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Etapa 3
          </span>
          <h2 className="text-xl font-bold text-slate-100">Verificación y Auditoría Crítica del Código Generado</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Evaluación rigurosa de las 7 preguntas obligatorias: comprensión algorítmica, errores sutiles detectados, refactorizaciones y justificaciones teóricas.
        </p>

        {/* Selector de preguntas 1 al 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 mt-6">
          {STAGE_3_QUESTIONS.map((q) => {
            const isSelected = selectedQuestion === q.qNumber;
            return (
              <button
                key={q.qNumber}
                onClick={() => setSelectedQuestion(q.qNumber)}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-0.5">
                  Pregunta {q.qNumber}
                </div>
                <div className="text-xs font-bold truncate">
                  {q.question.replace('¿', '').replace('?', '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta Detallada de la Pregunta Seleccionada */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-lg border border-amber-500/20">
              Q{currentQ.qNumber}
            </div>
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {currentQ.badge}
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">
                {currentQ.question}
              </h3>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400">
            {selectedQuestion} de 7 evaluadas
          </div>
        </div>

        {/* Respuesta Desarrollada */}
        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Análisis Técnico y Respuesta Detallada:
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {currentQ.answer}
          </p>
        </div>

        {/* Resumen Clave */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-300">
          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <div>
            <strong>Conclusión ejecutiva:</strong> {currentQ.keyTakeaway}
          </div>
        </div>
      </div>

      {/* Laboratorio Demostrativo del Error Detectado en Etapa 3 (Preguntas 5, 6 y 7) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-slate-100">
              Demostración Práctica del Bug Clave Detectado en Etapa 3: "árbol" vs "zorro"
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
            Error de Código ASCII vs Reglas del Español
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          En JavaScript/C++/Java convencional, usar los operadores <code className="text-amber-300">&lt;</code> y <code className="text-amber-300">&gt;</code> compara los códigos binarios de caracteres (Unicode Code Points). La vocal <code className="text-amber-300">'á'</code> tiene código <strong className="text-white">225</strong>, mientras que la letra <code className="text-amber-300">'z'</code> tiene código <strong className="text-white">122</strong>. Dado que 225 &gt; 122, el código propuesto por la IA colocaba erróneamente <strong className="text-rose-400">"árbol" a la DERECHA de "zorro"</strong>.
        </p>

        {/* Banco interactivo de prueba para contrastar los dos algoritmos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Código Erróneo (ASCII crudo) */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-300">
              <span>Código Inicial Propuesto por IA (Con Error)</span>
              <span className="px-2 py-0.5 rounded bg-rose-900/50 text-rose-200">ASCII: word1 &lt; word2</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg font-mono text-xs text-slate-300">
              <div>'á'.charCodeAt(0) = <strong className="text-rose-400">225</strong></div>
              <div>'z'.charCodeAt(0) = <strong className="text-slate-300">122</strong></div>
              <div className="mt-1 pt-1 border-t border-slate-800 text-rose-300">
                "{testAsciiBugWord1}" &gt; "{testAsciiBugWord2}" = <strong>{asciiComparison > 0 ? 'TRUE (¡Error! Coloca a la derecha)' : 'FALSE'}</strong>
              </div>
            </div>
            <div className="text-[11px] text-rose-400/90">
              ❌ En un recorrido Inorden, "árbol" aparecería después de "zorro", rompiendo el orden alfabético.
            </div>
          </div>

          {/* Código Corregido (localeCompare('es')) */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <span>Modificación Realizada por el Equipo</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-200">localeCompare('es')</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg font-mono text-xs text-slate-300">
              <div>"{testAsciiBugWord1}".localeCompare("{testAsciiBugWord2}", 'es')</div>
              <div className="mt-1 pt-1 border-t border-slate-800 text-emerald-300">
                Resultado = <strong>{spanishComparison} ({spanishComparison < 0 ? 'Menor: Va al subárbol izquierdo' : 'Mayor'})</strong>
              </div>
            </div>
            <div className="text-[11px] text-emerald-400/90">
              ✅ "árbol" se clasifica correctamente con la 'a', ubicándose antes de "zorro" en Inorden.
            </div>
          </div>
        </div>

        {/* Inputs para probar con cualquier palabra personalizada */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs bg-slate-950/50 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-medium">Probar comparación de palabras:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Palabra 1:</span>
            <input
              type="text"
              value={testAsciiBugWord1}
              onChange={(e) => setTestAsciiBugWord1(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 w-28 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Palabra 2:</span>
            <input
              type="text"
              value={testAsciiBugWord2}
              onChange={(e) => setTestAsciiBugWord2(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 w-28 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => {
              setTestAsciiBugWord1('árbol');
              setTestAsciiBugWord2('zorro');
            }}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
          >
            Restaurar caso "árbol" vs "zorro"
          </button>
        </div>
      </div>
    </div>
  );
};
