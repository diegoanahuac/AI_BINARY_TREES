import React, { useState } from 'react';
import { STAGE_5_EVIDENCE } from '../data/projectData';
import { InteractionRecord } from '../types/bst';
import { Table, Copy, Check, Download, Plus, Trash2, Edit2, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

export const Stage5AILog: React.FC = () => {
  const [records, setRecords] = useState<InteractionRecord[]>(STAGE_5_EVIDENCE);
  const [copiedMd, setCopiedMd] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Nuevo registro temporal
  const [newRow, setNewRow] = useState<Omit<InteractionRecord, 'id'>>({
    topic: '',
    prompt: '',
    aiResponse: '',
    used: 'Sí',
    modifications: '',
    justification: '',
  });

  const handleCopyMarkdown = () => {
    let md = `| # | Pregunta realizada a la IA | Respuesta obtenida | ¿Se utilizó? | Modificaciones realizadas | Justificación |\n`;
    md += `|---|---|---|---|---|---|\n`;
    records.forEach((r) => {
      const q = r.topic ? `**${r.topic}**: ${r.prompt.replace(/\n/g, ' ')}` : r.prompt.replace(/\n/g, ' ');
      const resp = r.aiResponse.replace(/\n/g, ' ');
      const mods = r.modifications.replace(/\n/g, ' ');
      const just = r.justification.replace(/\n/g, ' ');
      md += `| ${r.id} | ${q} | ${resp} | ${r.used} | ${mods} | ${just} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadCSV = () => {
    let csv = `"ID","Pregunta realizada a la IA","Respuesta obtenida","¿Se utilizó?","Modificaciones realizadas","Justificación"\n`;
    records.forEach((r) => {
      const clean = (str: string) => `"${str.replace(/"/g, '""')}"`;
      csv += `${r.id},${clean(`${r.topic}: ${r.prompt}`)},${clean(r.aiResponse)},${clean(r.used)},${clean(r.modifications)},${clean(r.justification)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'etapa_5_registro_interaccion_ia.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNewRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRow.prompt.trim()) return;

    const newId = records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1;
    setRecords([...records, { ...newRow, id: newId }]);
    setNewRow({
      topic: '',
      prompt: '',
      aiResponse: '',
      used: 'Sí',
      modifications: '',
      justification: '',
    });
    setIsAddingNew(false);
  };

  const handleDeleteRow = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleResetToDefault = () => {
    setRecords(STAGE_5_EVIDENCE);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Etapa 5
              </span>
              <h2 className="text-xl font-bold text-slate-100">Registro de Interacción con IA (Tabla de Evidencia)</h2>
            </div>
            <p className="text-sm text-slate-400">
              Evidencia formal solicitada para el informe: registro fidedigno de prompts, respuestas generadas, criterio de adopción, modificaciones realizadas y justificación crítica.
            </p>
          </div>

          {/* Botones de acción y exportación */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
            >
              {copiedMd ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copiedMd ? '¡Markdown Copiado!' : 'Copiar Tabla en Markdown'}
            </button>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              Añadir Fila
            </button>
          </div>
        </div>

        {/* Banner explicativo del formato de la rúbrica */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              Esta tabla replica con fidelidad las columnas requeridas: <strong># | Pregunta realizada a la IA | Respuesta obtenida | ¿Se utilizó? | Modificaciones realizadas | Justificación</strong>
            </span>
          </div>
          <button
            onClick={handleResetToDefault}
            className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer ml-3 shrink-0"
          >
            Restaurar tabla original
          </button>
        </div>
      </div>

      {/* Formulario para añadir nueva fila si está abierto */}
      {isAddingNew && (
        <form onSubmit={handleSaveNewRow} className="p-5 bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Añadir Nueva Interacción con IA a la Evidencia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tema / Asunto:</label>
              <input
                type="text"
                value={newRow.topic}
                onChange={(e) => setNewRow({ ...newRow, topic: e.target.value })}
                placeholder="Ej. Recorrido por niveles BFS"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">¿Se utilizó?:</label>
              <select
                value={newRow.used}
                onChange={(e) => setNewRow({ ...newRow, used: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
                <option value="Parcial">Parcial</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Pregunta realizada a la IA (Prompt):</label>
            <textarea
              rows={2}
              value={newRow.prompt}
              onChange={(e) => setNewRow({ ...newRow, prompt: e.target.value })}
              placeholder="¿Cómo implementar el recorrido por niveles en el árbol?"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Respuesta obtenida:</label>
            <textarea
              rows={2}
              value={newRow.aiResponse}
              onChange={(e) => setNewRow({ ...newRow, aiResponse: e.target.value })}
              placeholder="La IA propuso una cola (Queue) utilizando un arreglo con shift()..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Modificaciones realizadas:</label>
              <textarea
                rows={2}
                value={newRow.modifications}
                onChange={(e) => setNewRow({ ...newRow, modifications: e.target.value })}
                placeholder="Se indexó cada nivel en un Map para agrupar los nodos visualmente..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Justificación:</label>
              <textarea
                rows={2}
                value={newRow.justification}
                onChange={(e) => setNewRow({ ...newRow, justification: e.target.value })}
                placeholder="Permite renderizar cada estrato del árbol en la interfaz gráfica..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Guardar Fila
            </button>
          </div>
        </form>
      )}

      {/* Tabla Oficial de Evidencia */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-4 w-1/4">Pregunta realizada a la IA</th>
                <th className="py-3 px-4 w-1/4">Respuesta obtenida</th>
                <th className="py-3 px-3 w-24 text-center">¿Se utilizó?</th>
                <th className="py-3 px-4 w-1/5">Modificaciones realizadas</th>
                <th className="py-3 px-4 w-1/5">Justificación</th>
                <th className="py-3 px-2 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records.map((r, index) => {
                const isNo = r.used === 'No';
                const isPartial = r.used === 'Parcial';

                return (
                  <tr
                    key={r.id}
                    className={`transition-colors hover:bg-slate-850/60 ${
                      index % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/30'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-center text-slate-400">
                      {r.id}
                    </td>

                    <td className="py-3 px-4 align-top">
                      {r.topic && (
                        <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {r.topic}
                        </div>
                      )}
                      <p className="text-slate-300 leading-relaxed font-sans">{r.prompt}</p>
                    </td>

                    <td className="py-3 px-4 align-top text-slate-400 leading-relaxed">
                      {r.aiResponse}
                    </td>

                    <td className="py-3 px-3 align-top text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          isNo
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : isPartial
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {r.used}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-top text-slate-300 leading-relaxed">
                      {r.modifications}
                    </td>

                    <td className="py-3 px-4 align-top text-slate-400 leading-relaxed">
                      {r.justification}
                    </td>

                    <td className="py-3 px-2 align-top text-center">
                      <button
                        onClick={() => handleDeleteRow(r.id)}
                        title="Eliminar fila"
                        className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
