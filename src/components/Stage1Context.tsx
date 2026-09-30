import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, BookOpen, ShieldCheck, ArrowRight, Code } from 'lucide-react';

export const Stage1Context: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const fullPromptText = `Actúa como un Ingeniero de Software Senior y Docente de Estructuras de Datos. 
Necesito diseñar e implementar un sistema de Árbol Binario de Búsqueda (ABB) en TypeScript/JavaScript para el procesamiento, indexación y análisis de frecuencias de palabras en textos en español.

Requisitos y Restricciones Técnicas:
1. Estructura del Nodo:
   - Almacenar la palabra léxica, su frecuencia de ocurrencia (para duplicados), referencias a subárbol izquierdo y derecho, y propiedades de clasificación (nivel, esHoja, esInterno).
2. Sanitización y Normalización de Texto:
   - Limpiar signos de puntuación típicos del español (¡!, ¿?, comas, puntos, etc.) sin eliminar vocales con tilde (á, é, í, ó, ú), diéresis (ü) ni la letra 'ñ'.
   - Opción para normalizar a minúsculas para unificar variantes de un mismo término.
3. Inserción y Ordenamiento en Español:
   - Resolver la comparación lexicográfica con reglas del español (localeCompare('es')), evitando el error común de la tabla ASCII donde 'á' (225) se ordena erróneamente después de 'z' (122).
   - Manejo de duplicados: Si la palabra ya existe, incrementar su contador de frecuencia sin crear nodos redundantes ni romper las propiedades del ABB.
4. Recorridos y Métricas:
   - Proveer recorridos Inorden (alfabético ascendente), Preorden y Postorden.
   - Calcular en una sola pasada: total de palabras ingresadas, nodos únicos, nodos hoja, nodos internos y altura del árbol.
5. Desarrollo Gradual:
   - Estructurar la solución paso a paso (Nodo -> Sanitización -> Inserción -> Recorridos -> Métricas) para facilitar su verificación académica.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado de la Etapa 1 */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Etapa 1
              </span>
              <h2 className="text-xl font-bold text-slate-100">Formular una Solicitud con Contexto</h2>
            </div>
            <p className="text-sm text-slate-400">
              Estrategia pedagógica de ingeniería de prompts: contextualización del problema, especificación de restricciones algorítmicas y criterios de diseño.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? '¡Prompt Copiado!' : 'Copiar Solicitud para IA'}
          </button>
        </div>

        {/* Los 4 Pilares de la Contextualización */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">1. Rol y Dominio</h4>
            <p className="text-xs text-slate-400 mt-1">
              Se define el rol como Especialista en Estructuras de Datos y Procesamiento de Lenguaje Natural en español.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">2. Restricciones Lingüísticas</h4>
            <p className="text-xs text-slate-400 mt-1">
              Énfasis explícito en el manejo del alfabeto español: preservación de tildes (á-ú), diéresis (ü), la letra 'ñ' y ordenamiento alfabético real.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Code className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">3. Invariante del ABB</h4>
            <p className="text-xs text-slate-400 mt-1">
              Tratamiento de duplicados con acumulación de frecuencia en el nodo para mantener unicidad de claves y complejidad temporal óptima.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">4. Verificabilidad</h4>
            <p className="text-xs text-slate-400 mt-1">
              Métricas de análisis cuantitativo: nodos únicos vs totales, identificación topológica (raíz, internos, hojas) y altura.
            </p>
          </div>
        </div>
      </div>

      {/* Visor interactivo del Prompt Formulador */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-medium text-slate-300">
              solicitud_contexto_abb.prompt
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Prompt Estructurado • Modelo: Gemini 2.5 / 3.8
          </span>
        </div>

        <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/95 overflow-x-auto whitespace-pre-wrap selection:bg-indigo-500/30">
          {fullPromptText}
        </div>
      </div>

      {/* Justificación Pedagógica para la Entrega */}
      <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
          <ArrowRight className="w-4 h-4" />
          <span>¿Por qué formular la solicitud con este nivel de contexto?</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Si a un modelo de IA se le pide únicamente <em>"hazme un árbol binario de palabras en código"</em>, el 90% de las respuestas generará un código en inglés que divide por espacios simples, usa comparadores ASCII primitivos (<code className="text-amber-300">&lt;</code> y <code className="text-amber-300">&gt;</code>) y descarta los duplicados sin contarlos. Al proporcionar un contexto profesional con restricciones explícitas de lengua española y teoría de estructuras de datos, la IA produce una arquitectura modular y robusta que anticipa los casos de prueba de la Etapa 4.
        </p>
      </div>
    </div>
  );
};
