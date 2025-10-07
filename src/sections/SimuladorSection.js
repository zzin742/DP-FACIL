import { fmtBR, num, save, load, onInputDebounced, copyText, calcINSS, calcIRRF } from '../lib/utils.js';

export function SimuladorSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 dark:text-blue-200 mb-6">Simulador Trabalhista</h2>
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border-l-4 border-blue-700 dark:border-blue-400 max-w-3xl mx-auto space-y-4 print:shadow-none print:border-0">
      <p class="text-gray-700 dark:text-gray-300">Calcule salário líquido com base no salário bruto, dependentes e descontos adicionais.</p>

      <div class="grid sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salário bruto (R$)</label>
          <input id="salarioBruto" inputmode="decimal" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" placeholder="Ex: 3000">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dependentes</label>
          <input id="dependentes" type="number" min="0" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" value="0">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descontos adicionais (R$)</label>
          <input id="descontos" inputmode="decimal" class="w-full border rounded p-2 dark:bg-slate-800 dark:border-slate-700" value="0">
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button id="btnCalcular" class="btn">Calcular</button>
        <button id="btnLimpar" class="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700">Limpar</button>
        <button id="btnCopiar" class="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded">Copiar resumo</button>
        <button id="btnImprimir" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded print:hidden">Imprimir</button>
        <button id="btnShare" class="bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded hidden print:hidden">Compartilhar</button>
      </div>

      <div id="resultado" class="hidden mt-4">
        <div class="overflow-x-auto">
          <table class="min-w-full text-left border dark:border-slate-700">
            <thead class="bg-blue-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th class="py-2 px-3">Descrição</th>
                <th class="py-2 px-3">Valor</th>
              </tr>
            </thead>
            <tbody id="tbody" class="text-gray-800 dark:text-gray-200"></tbody>
          </table>
        </div>
        <p id="resumo" class="mt-3 text-gray-700 dark:text-gray-300"></p>
      </div>
    </div>
  `;

  const salarioEl = s.querySelector('#salarioBruto');
  const depEl = s.querySelector('#dependentes');
  const descEl = s.querySelector('#descontos');
  const btn = s.querySelector('#btnCalcular');
  const limpar = s.querySelector('#btnLimpar');
  const copiar = s.querySelector('#btnCopiar');
  const imprimir = s.querySelector('#btnImprimir');
  const share = s.querySelector('#btnShare');
  const resultado = s.querySelector('#resultado');
  const tbody = s.querySelector('#tbody');
  const resumo = s.querySelector('#resumo');

  const state = load('sim:inputs', { salario: '', dep: 0, desc: 0 });
  salarioEl.value = state.salario;
  depEl.value = state.dep;
  descEl.value = state.desc;

  function calc() {
    const bruto = num(salarioEl.value);
    const dep = parseInt(depEl.value || 0);
    const outrosDesc = num(descEl.value);

    if (!bruto || bruto <= 0) {
      resultado.classList.add('hidden');
      return;
    }

    const inss = calcINSS(bruto);
    const baseIR = Math.max(0, bruto - inss - dep * 189.59);
    const irrf = calcIRRF(baseIR);
    const liquido = bruto - inss - irrf - outrosDesc;

    const rows = [
      ['Salário bruto', bruto],
      ['INSS', -inss],
      ['IRRF', -irrf],
      ['Descontos adicionais', -outrosDesc],
      ['Salário líquido', liquido],
    ];
    tbody.innerHTML = rows.map(([k,v]) => `
      <tr class="border-t dark:border-slate-700">
        <td class="py-2 px-3">${k}</td>
        <td class="py-2 px-3 ${k==='Salário líquido' ? 'font-semibold' : ''}">${fmtBR(v)}</td>
      </tr>`).join('');

    resumo.textContent = `Base IR: ${fmtBR(baseIR)} • INSS: ${fmtBR(inss)} • IRRF: ${fmtBR(irrf)}`;

    resultado.classList.remove('hidden');
    save('sim:inputs', { salario: salarioEl.value, dep, desc: descEl.value });

    if (navigator.share) share.classList.remove('hidden'); else share.classList.add('hidden');
  }

  onInputDebounced(salarioEl, 300, calc);
  onInputDebounced(descEl, 300, calc);
  depEl.addEventListener('input', calc);
  btn.addEventListener('click', calc);

  limpar.addEventListener('click', () => {
    salarioEl.value = ''; depEl.value = 0; descEl.value = 0;
    save('sim:inputs', { salario: '', dep: 0, desc: 0 });
    resultado.classList.add('hidden');
  });

  copiar.addEventListener('click', () => {
    const bruto = num(salarioEl.value);
    const dep = parseInt(depEl.value || 0);
    const outrosDesc = num(descEl.value);
    const txt = [
      `Salário bruto: ${fmtBR(bruto)}`,
      `Dependentes: ${dep}`,
      `Descontos adicionais: ${fmtBR(outrosDesc)}`,
      resumo.textContent || ''
    ].join('\n');
    copyText(txt);
    alert('Resumo copiado!');
  });

  imprimir.addEventListener('click', () => window.print());
  share.addEventListener('click', async () => {
    try {
      await navigator.share({ title: 'Simulador DP FÁCIL', text: resumo.textContent || '', url: location.href });
    } catch {}
  });

  calc();
  return s;
}
