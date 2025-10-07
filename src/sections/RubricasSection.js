export function RubricasSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 mb-6">Rubricas (Eventos de Folha)</h2>

    <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700 overflow-x-auto">
      <table class="min-w-full text-left">
        <thead>
          <tr class="text-sm text-gray-500">
            <th class="py-2 pr-4">Código</th>
            <th class="py-2">Descrição</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          ${[
            ['8792', 'DIAS FALTAS'],
            ['8794', 'DIAS FALTAS DSR'],
            ['150',  'HORAS EXTRAS 50%'],
            ['200',  'HORAS EXTRAS 100%'],
            ['8069', 'HORAS FALTAS'],
            ['308',  'CONVÊNIO LOJA'],
            ['624',  'OUTROS DESCONTOS'],
            ['496',  'VALE TRANSPORTE (valor)'],
            ['322',  'ADICIONAL NOTURNO 35%'],
            ['334',  'DESCONTO VALE TRANSPORTE (%)'],
            ['981',  'DESCONTO ADIANTAMENTO SALARIAL'],
            ['363',  'BÔNUS POR META'],
            ['302',  'VALE REFEIÇÃO'],
            ['327',  'VALE TRANSPORTE (provento)'],
          ].map(([cod, desc]) => `
            <tr>
              <td class="py-2 pr-4 font-mono">${cod}</td>
              <td class="py-2">${desc}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <a href="#" target="_blank" class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">📄 Lista completa (em breve)</a>
    </div>
  `;
  return s;
}
