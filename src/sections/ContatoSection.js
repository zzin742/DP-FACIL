export function ContatoSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 mb-6">Contato</h2>
    <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700 text-center">
      <p class="text-lg">Dúvidas, sugestões ou quer contribuir?</p>
      <a href="mailto:contato@dpfacil.com" class="text-blue-800 font-semibold hover:underline">contato@dpfacil.com</a>
      <p class="text-gray-600 mt-2">Responderemos o quanto antes 😉</p>
    </div>
  `;
  return s;
}
