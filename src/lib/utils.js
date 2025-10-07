
// Utils: currency formatting, parsing, storage, helpers
export const fmtBR = (n) => {
  if (isNaN(n) || n === null) n = 0;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
};

export const num = (v) => {
  if (typeof v === 'number') return v;
  if (!v) return 0;
  const x = String(v).replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
  const n = parseFloat(x);
  return isNaN(n) ? 0 : n;
};

export const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const load = (k, d=null) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
};

export function onInputDebounced(el, ms, fn) {
  let t;
  el.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(fn, ms);
  });
}

export function copyText(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  const ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta);
  ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
}


/** INSS 2025 (progressivo) */
export function calcINSS(bruto) {
  const faixas = [
    { limite: 1412.00, aliquota: 0.075 },
    { limite: 2666.68, aliquota: 0.09 },
    { limite: 4000.03, aliquota: 0.12 },
    { limite: 7786.02, aliquota: 0.14 },
  ];
  let restante = bruto, inss = 0;
  for (let i = 0; i < faixas.length; i++) {
    const { limite, aliquota } = faixas[i];
    const base = i === 0 ? limite : (limite - faixas[i - 1].limite);
    const aplicavel = Math.min(restante, base);
    if (aplicavel <= 0) break;
    inss += aplicavel * aliquota;
    restante -= aplicavel;
  }
  if (bruto > faixas.at(-1).limite) inss = 908.85; // teto 2025
  return Math.max(0, inss);
}

/** IRRF 2025 base = baseIR = bruto - inss - dep*189,59 */
export function calcIRRF(baseIR) {
  let ir = 0;
  if (baseIR <= 2259.20) ir = 0;
  else if (baseIR <= 2826.65) ir = baseIR * 0.075 - 169.44;
  else if (baseIR <= 3751.05) ir = baseIR * 0.15 - 381.44;
  else if (baseIR <= 4664.68) ir = baseIR * 0.225 - 662.77;
  else ir = baseIR * 0.275 - 896.00;
  return Math.max(0, ir);
}

/** Proporcionalidade por meses inteiros (1..12) */
export const clampMeses = (m) => Math.max(0, Math.min(12, Math.floor(m || 0)));
