export function HorasExtrasSection() {
  const s = document.createElement('section');
  s.innerHTML = `
    <h2 class="text-3xl font-bold text-blue-700 mb-6">Horas Extras & DSR</h2>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700">
          <h3 class="text-xl font-bold mb-2">Horas Extras</h3>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>50%:</strong> adicional sobre horas além da jornada diária/sem. (dias úteis)</li>
            <li><strong>100%:</strong> geralmente aos domingos/feriados ou conforme acordo/convenção</li>
            <li>Horas extras integram bases de <em>DSR, férias e 13º</em> via médias.</li>
          </ul>
          <div class="mt-4 flex flex-wrap gap-3">
            <a href="/docs/HORAS EXTRAS 50%.pdf" target="_blank" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">📄 50%</a>
            <a href="/docs/HORAS EXTRAS 100%.pdf" target="_blank" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">📄 100%</a>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6 border-t-4 border-blue-700">
          <h3 class="text-xl font-bold mb-2">DSR — Descanso Semanal Remunerado</h3>
          <p class="text-gray-700 mb-3">Cálculo típico (comissões/HE):</p>
          <ol class="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Some as comissões/horas extras do mês.</li>
            <li>Conte os dias úteis do mês (sem domingos/feriados).</li>
            <li>Conte domingos/feriados do mês.</li>
            <li>Aplicação: <em>(Total do mês ÷ Dias úteis) × Domingos/Feriados</em>.</li>
            <li>Some o DSR ao salário.</li>
          </ol>
          <a href="/docs/DSR - Descanso Semanal Remunerado.pdf" target="_blank" class="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">📄 Baixar resumo de DSR</a>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="bg-white rounded-xl shadow p-6">
          <h4 class="font-bold text-blue-700 mb-2">Materiais relacionados</h4>
          <ul class="space-y-2 text-blue-800">
            <li><a class="underline" href="/docs/DECIMO 13 PRIMEIRA PARCELA.pdf" target="_blank">📄 13º — 1ª Parcela</a></li>
            <li><a class="underline" href="/docs/DECIMO 13 SEGUNDA PARCELA.pdf" target="_blank">📄 13º — 2ª Parcela</a></li>
          </ul>
        </div>
      </aside>
    </div>
  `;
  return s;
}
