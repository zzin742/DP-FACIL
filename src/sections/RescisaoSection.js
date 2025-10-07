export function RescisaoSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 mb-6">Rescisão</h2>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700">
          <h3 class="text-xl font-bold mb-2">Passo a passo — Cálculos de Rescisão</h3>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Calcule dias trabalhados: <em>Salário ÷ 30 × dias</em>.</li>
            <li>13º proporcional: <em>Salário ÷ 12 × meses (≥15 dias conta mês)</em>.</li>
            <li>Férias proporcionais: <em>Salário ÷ 12 × avos</em> + <strong>1/3</strong>.</li>
            <li>FGTS: <em>8% sobre base</em> + FGTS do 13º.</li>
            <li>Conferência final com verbas de aviso, descontos e adicionais.</li>
          </ul>
          <a class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800" href="/docs/PASSO A PASSO CALCULOS RESCISÃO.pdf" target="_blank">📄 Baixar “Passo a passo”</a>
        </div>

        <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700">
          <h3 class="text-xl font-bold mb-2">Checklist de Conferência</h3>
          <p class="text-gray-700">Use este roteiro para revisar dias, 13º, férias, FGTS, descontos e multas.</p>
          <a class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800" href="/docs/CONFERENCIA RESCISÃO.pdf" target="_blank">📄 Baixar “Conferência Rescisão”</a>
        </div>

        <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700">
          <h3 class="text-xl font-bold mb-2">Aviso Prévio</h3>
          <div class="space-y-3 text-gray-700">
            <div class="p-4 bg-blue-50 rounded">
              <strong>Trabalhado:</strong> empregado cumpre o período; há possibilidade de <em>misto</em> (parte trabalhado, parte indenizado).
              <div class="mt-2"><a class="text-blue-700 underline" href="/docs/AVISO PREVIO - TRABALHADO.pdf" target="_blank">📄 Baixar “Aviso Trabalhado”</a></div>
            </div>
            <div class="p-4 bg-blue-50 rounded">
              <strong>Indenizado:</strong> empresa dispensa o cumprimento e paga o período.
              <div class="mt-2"><a class="text-blue-700 underline" href="/docs/AVISO PREVIO - INDENIZADO.pdf" target="_blank">📄 Baixar “Aviso Indenizado”</a></div>
            </div>
            <div class="p-4 bg-blue-50 rounded">
              <strong>Pedido de Demissão:</strong> carta do colaborador; pode solicitar dispensa do aviso.
              <div class="mt-2"><a class="text-blue-700 underline" href="/docs/AVISO PREVIO - PEDIDO DE DEMISSÃO.pdf" target="_blank">📄 Baixar “Pedido de Demissão”</a></div>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="bg-white rounded-xl shadow p-6">
          <h4 class="font-bold text-blue-700 mb-2">Modelos úteis</h4>
          <ul class="space-y-2 text-blue-800">
            <li><a class="underline" href="/docs/CARTA DE DEMISSAO SEM AVISO.pdf" target="_blank">📄 Carta de Demissão (sem aviso)</a></li>
            <li><a class="underline" href="/docs/CARTA DE SUSPENSÃO.pdf" target="_blank">📄 Carta de Suspensão</a></li>
            <li><a class="underline" href="/docs/CARTA DE DEMISSÃO COM JUSTA CAUSA.docx" target="_blank">📄 Dispensa por Justa Causa (DOCX)</a></li>
          </ul>
        </div>
      </aside>
    </div>
  `;
  return s;
}
