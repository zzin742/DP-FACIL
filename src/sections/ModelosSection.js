export function ModelosSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 mb-6">Modelos de Documentos</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${[
        ['CARTA DE DEMISSAO SEM AVISO.pdf', 'Carta de Demissão — Sem Aviso', 'PDF'],
        ['CARTA DE SUSPENSÃO.pdf', 'Carta de Suspensão', 'PDF'],
        ['CARTA DE DEMISSÃO COM JUSTA CAUSA.docx', 'Dispensa por Justa Causa', 'DOCX'],
      ].map(([file, title, type]) => `
        <div class="bg-white rounded-xl shadow p-6 border-l-4 border-blue-700">
          <h3 class="font-bold text-xl mb-2">${title}</h3>
          <p class="text-gray-600">Modelo pronto para preencher e imprimir.</p>
          <a href="/docs/${file}" target="_blank" class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">📄 Abrir (${type})</a>
        </div>
      `).join('')}
    </div>
  `;
  return s;
}
