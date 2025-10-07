export function InicioSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <div class="text-center py-10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">Bem-vindo ao DP FÁCIL</h2>
      <p class="text-lg max-w-3xl mx-auto leading-relaxed">
        Portal prático e direto para profissionais e estudantes de Departamento Pessoal.
        Aqui você encontra <strong>simuladores</strong>, <strong>guias</strong>, <strong>modelos</strong> e <strong>resumos didáticos</strong> para o dia a dia.
      </p>
      <div class="mt-8 grid sm:grid-cols-3 gap-4">
        ${[
          ['Simulador', 'Calcule INSS, IRRF e líquido rapidamente.', 'simulador'],
          ['Rescisão', 'Passo a passo, conferência e avisos.', 'rescisao'],
          ['13º Salário', '1ª e 2ª parcela, regras e médias.', 'decimo'],
        ].map(([t, d, tab]) => `
          <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700">
            <h3 class="font-bold text-xl mb-2">${t}</h3>
            <p class="text-gray-600">${d}</p>
            <button data-tab="${tab}" class="tab-btn mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Acessar</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return s;
}
