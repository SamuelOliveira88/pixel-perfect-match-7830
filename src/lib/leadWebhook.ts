const WEBHOOK_URL =
  "https://app.imobilead.me/integrate-api/integracoes/webhook/b4e6bc52719b82d65abba587573399ad/";

const TIMEOUT_MS = 4000;

function valorCampo(...seletores: string[]) {
  if (typeof document === "undefined") return "";
  for (const sel of seletores) {
    const el = document.querySelector<HTMLInputElement>(sel);
    const v = el?.value?.trim();
    if (v) return v;
  }
  return "";
}

/** Registra o clique de WhatsApp como lead no Imobilead. Nunca lança erro. */
export async function registrarCliqueWhatsApp(origem: string) {
  const nome = valorCampo("#nome", 'input[name="nome"]');
  const telefone = valorCampo("#telefone", 'input[name="telefone"]', 'input[type="tel"]');
  const email = valorCampo("#email", 'input[name="email"]', 'input[type="email"]');

  const payload: Record<string, string> = {
    origem,
    pagina: typeof window === "undefined" ? "" : window.location.href,
  };
  if (nome) payload['nome'] = nome;
  if (telefone) payload['telefone'] = telefone;
  if (email) payload['email'] = email;
  if (!nome) payload['nome'] = `Clique WhatsApp - ${origem}`;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    });
  } catch {
    // Não bloqueia o usuário se o webhook falhar.
  } finally {
    clearTimeout(t);
  }
}

function abrir(url: string) {
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) {
    try {
      (window.top ?? window).location.href = url;
    } catch {
      window.location.href = url;
    }
  }
}

/** Aguarda o registro do lead e só então abre o WhatsApp. */
export async function abrirWhatsAppComLead(url: string, origem: string) {
  await registrarCliqueWhatsApp(origem);
  abrir(url);
}

export function onClickWhatsApp(url: string, origem: string) {
  return (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void abrirWhatsAppComLead(url, origem);
  };
}
