import { fmtBR, num, calcINSS, calcIRRF, clampMeses } from '../lib/utils.js';

export function FeriasSection() {
  const el = document.createElement('section');
  el.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 dark:text-blue-200 mb-6">Férias</h2>
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border-l-4 border-blue-700 dark:border-blue-400 max-w-3xl mx-auto space-y-4">
      <div class="grid sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salário base (R$)</label>
          <input id="salario" inputmode="decimal" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" placeholder="Ex: 3000">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meses no período aquisitivo</label>
          <input id="meses" type="number" min="0" max="12" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" value="12">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abono pecuniário?</label>
          <select id="abono" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700">
            <option value="nao" selected>Não</option>
            <option value="sim">Sim (1/3 das férias vendidas)</option>
          </select>
        </div>
      </div>
      <button id="calc" class="btn">Calcular</button>
      <div id="out" class="hidden">
        <div class="overflow-x-auto mt-4">
          <table class="min-w-full text-left border dark:border-slate-700">
            <thead class="bg-blue-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300"><tr><th class="py-2 px-3">Descrição</th><th class="py-2 px-3">Valor</th></tr></thead>
            <tbody id="tbody" class="text-gray-800 dark:text-gray-200"></tbody>
          </table>
        </div>
        <p id="resumo" class="mt-3 text-gray-700 dark:text-gray-300"></p>
      </div>
    </div>
  `;

  const salario = el.querySelector('#salario');
  const meses = el.querySelector('#meses');
  const abono = el.querySelector('#abono');
  const btn = el.querySelector('#calc');
  const out = el.querySelector('#out');
  const tbody = el.querySelector('#tbody');
  const resumo = el.querySelector('#resumo');

  function calc() {
    const s = num(salario.value);
    const m = clampMeses(parseInt(meses.value || 0));
    const vende = abono.value === 'sim';

    if (!s || m <= 0) { out.classList.add('hidden'); return; }

    const feriasBase = s * (m / 12);
    const umTerco = feriasBase / 3;
    const abonoValor = vende ? (s / 3) : 0;
    const bruto = feriasBase + umTerco + abonoValor;

    const inss = calcINSS(bruto);
    const baseIR = Math.max(0, bruto - inss);
    const irrf = calcIRRF(baseIR);
    const liquido = bruto - inss - irrf;

    const rows = [
      ['Férias proporcionais', feriasBase],
      ['1/3 constitucional', umTerco],
      ['Abono pecuniário (venda 1/3)', abonoValor],
      ['INSS', -inss],
      ['IRRF', -irrf],
      ['Líquido a receber', liquido],
    ];
    tbody.innerHTML = rows.map(([k,v]) => `
      <tr class="border-t dark:border-slate-700">
        <td class="py-2 px-3">${k}</td>
        <td class="py-2 px-3 ${k.includes('Líquido') ? 'font-semibold' : ''}">${fmtBR(v)}</td>
      </tr>`).join('');

    resumo.textContent = `Base IR: ${fmtBR(baseIR)} • INSS: ${fmtBR(inss)} • IRRF: ${fmtBR(irrf)}`;
    out.classList.remove('hidden');
  }

  btn.addEventListener('click', calc);
  return el;
}
