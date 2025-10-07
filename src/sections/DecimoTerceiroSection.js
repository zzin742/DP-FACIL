import { fmtBR, num, calcINSS, calcIRRF, clampMeses } from '../lib/utils.js';

export function DecimoTerceiroSection() {
  const el = document.createElement('section');
  el.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 dark:text-blue-200 mb-6">13º Salário</h2>
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border-l-4 border-blue-700 dark:border-blue-400 max-w-3xl mx-auto space-y-4">
      <div class="grid sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salário base (R$)</label>
          <input id="salario" inputmode="decimal" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" placeholder="Ex: 3000">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meses trabalhados</label>
          <input id="meses" type="number" min="0" max="12" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" value="12">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pagamento</label>
          <select id="parcela" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700">
            <option value="unica">Parcela única</option>
            <option value="adiantamento">Adiantamento (sem IR)</option>
            <option value="final">Parcela final</option>
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
  const parcela = el.querySelector('#parcela');
  const btn = el.querySelector('#calc');
  const out = el.querySelector('#out');
  const tbody = el.querySelector('#tbody');
  const resumo = el.querySelector('#resumo');

  function calc() {
    const s = num(salario.value);
    const m = clampMeses(parseInt(meses.value || 0));
    const tipo = parcela.value;
    if (!s || m <= 0) { out.classList.add('hidden'); return; }

    const d13 = s * (m / 12);
    const inss = calcINSS(d13);
    const baseIR = Math.max(0, d13 - inss);
    let irrf = calcIRRF(baseIR);
    if (tipo === 'adiantamento') irrf = 0; // adiantamento sem IR

    const liquido = d13 - inss - irrf;

    const rows = [
      ['13º bruto proporcional', d13],
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
