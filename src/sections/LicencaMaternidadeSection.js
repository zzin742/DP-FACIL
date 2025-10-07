export function LicencaMaternidadeSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 mb-6">Licença Maternidade</h2>

    <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700 space-y-3">
      <p><strong>Tempo:</strong> 120 dias (pode ser <strong>180 dias</strong> no Programa Empresa Cidadã).</p>
      <p><strong>Quando começa:</strong> até 28 dias antes do parto ou no dia do nascimento.</p>
      <p><strong>Quem tem direito:</strong> toda segurada do INSS (CLT, doméstica, MEI, autônoma).</p>
      <p><strong>Pagamento:</strong> feito pela empresa (CLT) ou pelo INSS (demais casos).</p>
      <p><strong>Vale para:</strong> adoção e guarda para adoção.</p>
      <p><strong>Estabilidade:</strong> desde a gravidez até 5 meses após o parto.</p>

      <a href="/docs/LICENÇA MATERNIDADE.pdf" target="_blank" class="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">📄 Baixar resumo</a>
    </div>
  `;
  return s;
}
