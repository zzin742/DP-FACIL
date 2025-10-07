import { InicioSection } from '../../sections/InicioSection.js';
import { SimuladorSection } from '../../sections/SimuladorSection.js';
import { RescisaoSection } from '../../sections/RescisaoSection.js';
import { DecimoTerceiroSection } from '../../sections/DecimoTerceiroSection.js';
import { LicencaMaternidadeSection } from '../../sections/LicencaMaternidadeSection.js';
import { HorasExtrasSection } from '../../sections/HorasExtrasSection.js';
import { FeriasSection } from '../../sections/FeriasSection.js';
import { RubricasSection } from '../../sections/RubricasSection.js';
import { ModelosSection } from '../../sections/ModelosSection.js';
import { ContatoSection } from '../../sections/ContatoSection.js';


export function AppPage() {
  const el = document.createElement('div');
  el.innerHTML = `
    
    <header class="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg sticky top-0 z-50 dark:from-blue-950 dark:to-blue-900">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 class="text-2xl md:text-3xl font-extrabold tracking-wide">DP FÁCIL</h1>
        <nav class="hidden md:flex gap-6 text-base md:text-lg" aria-label="Seções do site">
          ${[
            ['inicio', 'Início'],
            ['simulador', 'Simulador'],
            ['rescisao', 'Rescisão'],
            ['decimo', '13º Salário'],
            ['licenca', 'Licença Maternidade'],
            ['horas', 'Horas Extras / DSR'],
            ['ferias', 'Férias'],
            ['rubricas', 'Rubricas'],
            ['modelos', 'Modelos'],
            ['contato', 'Contato'],
          ].map(([k, v]) => `<button data-tab="${k}" class="tab-btn hover:text-yellow-300 transition" aria-controls="tab-content">${v}</button>`).join('')}
        </nav>
        <div class="flex items-center gap-3">
          <button id="themeBtn" class="text-xl" aria-label="Alternar tema"><i class="fa-solid fa-moon"></i></button>
          <button id="menuBtn" class="md:hidden text-2xl" aria-label="Abrir menu"><i class="fas fa-bars"></i></button>
        </div>
      </div>
      <div id="mobileMenu" class="hidden flex-col text-center bg-blue-800 text-white pb-4 space-y-2 md:hidden">
        ${[
          ['inicio', 'Início'],
          ['simulador', 'Simulador'],
          ['rescisao', 'Rescisão'],
          ['decimo', '13º Salário'],
          ['licenca', 'Licença Maternidade'],
          ['horas', 'Horas Extras / DSR'],
            ['ferias', 'Férias'],
          ['rubricas', 'Rubricas'],
          ['modelos', 'Modelos'],
          ['contato', 'Contato'],
        ].map(([k, v]) => `<button data-tab="${k}" class="tab-btn py-2 hover:text-yellow-300" aria-controls="tab-content">${v}</button>`).join('')}
      </div>
    </header>
    

    <main class="min-h-[80vh] bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div class="max-w-7xl mx-auto px-6 py-10">
        <div id="tab-content" class="animate-fade"></div>
      </div>
    </main>

    <footer class="bg-gradient-to-r from-blue-800 to-blue-900 text-white text-center py-6">
      <p class="text-sm">© ${new Date().getFullYear()} DP FÁCIL — Todos os direitos reservados</p>
    </footer>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .animate-fade { animation: fade .25s ease-in; }
    @keyframes fade { from {opacity: 0; transform: translateY(6px);} to {opacity: 1; transform: translateY(0);} }
    .tab-active { color: #fde047 !important; }
  `;
  el.appendChild(style);

  const $ = (q) => el.querySelector(q);
  const tabContent = $('#tab-content');

  const SECTIONS = {
    inicio: InicioSection,
    simulador: SimuladorSection,
    rescisao: RescisaoSection,
    decimo: DecimoTerceiroSection,
    licenca: LicencaMaternidadeSection,
    horas: HorasExtrasSection,
    ferias: FeriasSection,
    rubricas: RubricasSection,
    modelos: ModelosSection,
    contato: ContatoSection,
  };

  function renderTab(tab) {
    tabContent.innerHTML = '';
    const Comp = SECTIONS[tab] || InicioSection;
    tabContent.append(Comp());
    el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-active'));
    el.querySelectorAll(`.tab-btn[data-tab="${tab}"]`).forEach(b => b.classList.add('tab-active'));
  }

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const tab = btn.getAttribute('data-tab');
    renderTab(tab);
    $('#mobileMenu')?.classList.add('hidden');
    tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Theme toggle
  $('#themeBtn')?.addEventListener('click', () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  $('#menuBtn').addEventListener('click', () => {
    $('#mobileMenu').classList.toggle('hidden');
  });

  renderTab('inicio');
  return el;
}
