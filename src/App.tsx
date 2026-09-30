/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InteractivePlayground } from './components/InteractivePlayground';
import { Stage1Context } from './components/Stage1Context';
import { Stage2Development } from './components/Stage2Development';
import { Stage3Verification } from './components/Stage3Verification';
import { Stage4Tests } from './components/Stage4Tests';
import { Stage5AILog } from './components/Stage5AILog';
import { AcademicReportModal } from './components/AcademicReportModal';
import { SanitizationOptions } from './types/bst';
import {
  Layers,
  FileCode,
  CheckCircle2,
  ListFilter,
  TableProperties,
  Sparkles,
  BookOpen,
  Printer,
  Compass,
  GraduationCap,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [playgroundInput, setPlaygroundInput] = useState<string>('gato perro casa');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const handleLoadCaseInPlayground = (input: string, _options?: Partial<SanitizationOptions>) => {
    setPlaygroundInput(input);
    setActiveTab('simulator');
  };

  const navItems = [
    { id: 'simulator', label: 'Simulador y Visualizador', icon: Layers, badge: 'En Vivo' },
    { id: 'stage1', label: 'Etapa 1: Contexto', icon: BookOpen },
    { id: 'stage2', label: 'Etapa 2: Desarrollo', icon: FileCode },
    { id: 'stage3', label: 'Etapa 3: Verificación', icon: CheckCircle2 },
    { id: 'stage4', label: 'Etapa 4: Pruebas (13 Casos)', icon: ListFilter, badge: 'Rúbrica + IA' },
    { id: 'stage5', label: 'Etapa 5: Registro IA', icon: TableProperties, badge: 'Evidencia' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30">
      {/* Header Superior Principal */}
      <header className="sticky top-0 z-40 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-white">
                    Árbol Binario de Búsqueda (ABB)
                  </h1>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Etapas 1-5
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Procesamiento Léxico en Español &bull; Evidencia de Interacción con IA
                </p>
              </div>
            </div>

            {/* Acciones del Header */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Ver Reporte Académico</span>
              </button>
            </div>
          </div>

          {/* Barra de Pestañas de Navegación */}
          <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-900 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-indigo-300 shadow-sm ring-1 ring-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-slate-800/80 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simulator' && (
          <InteractivePlayground initialInput={playgroundInput} />
        )}

        {activeTab === 'stage1' && <Stage1Context />}

        {activeTab === 'stage2' && <Stage2Development />}

        {activeTab === 'stage3' && <Stage3Verification />}

        {activeTab === 'stage4' && (
          <Stage4Tests onLoadCaseInPlayground={handleLoadCaseInPlayground} />
        )}

        {activeTab === 'stage5' && <Stage5AILog />}
      </main>

      {/* Modal de Reporte Académico Completo */}
      <AcademicReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        userEmail="diego.olea@anahuacmayab.edu.mx"
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-300">Árbol Binario de Búsqueda</span>
            <span>&bull;</span>
            <span>Universidad Anáhuac Mayab</span>
          </div>
          <div>
            Entregable de Práctica con Evidencia de IA &bull; Octubre 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
