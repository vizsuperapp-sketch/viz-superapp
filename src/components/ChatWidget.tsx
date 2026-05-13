import { useState, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ChatPreForm, { type ChatLead } from "@/components/chat/ChatPreForm";
import ChatMessages, { type Msg } from "@/components/chat/ChatMessages";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// Dados dos imóveis - VistaBella em 1º lugar com vídeo 360
const imoveis = [
  {
    name: "VistaBella Oeiras",
    region: "Oeiras",
    location: "Oeiras",
    priceRange: "690 000 €",
    areaRange: "122 m²",
    typology: "T2 com 2 Suítes",
    completion: "Setembro 2027",
    badge: "NOVO",
    hasVideo360: true,
    highlights: [
      "Varanda ampla 26,87m²",
      "Jardim privativo 9m²",
      "2 estacionamentos",
      "Piscina e SPA",
      "Ginásio e padel",
    ],
    description:
      "Elegante apartamento T2 com duas suítes em VistaBella Oeiras. Excelente distribuição de espaços, varanda ampla, jardim privativo e zona exterior privativa. Empreendimento sustentável com infraestruturas premium.",
    images: 9,
  },
  {
    name: "Machado Santos",
    region: "Margem Sul",
    location: "Montijo",
    priceRange: "285 000 € – 395 000 €",
    areaRange: "80,02 m² – 173,11 m²",
    typology: "T0 – T2",
    completion: "1º Semestre 2027",
    description: "Machado Santos é um novo empreendimento residencial no coração do Montijo com fácil acesso à Lisboa.",
    images: 6,
  },
  {
    name: "Horizon",
    region: "Lisboa",
    location: "Lourinhã",
    priceRange: "1 450 000 € – 2 300 000 €",
    areaRange: "283,6 m² – 501,1 m²",
    typology: "T3 – T4",
    completion: "A definir",
    highlights: ["15 moradias exclusivas", "Piscina privativa", "Junto à Praia da Peralta", "Totalmente mobiladas"],
    description:
      "Situado junto à Praia da Peralta com arquitetura contemporânea e janelas panorâmicas para o Atlântico.",
    images: 6,
  },
];

// ✅ FUNÇÃO PRINCIPAL - CONSIDERA O INTERESSE DO CLIENTE
function getPropertyMessage(userMessage: string, clientInterest: string): string | null {
  const lower = userMessage.toLowerCase();
  const interest = clientInterest.toLowerCase();

  // 🏠 SE CLIENTE QUER COMPRAR OU INVESTIR
  if (interest.includes("comprar") || interest.includes("investir") || interest.includes("propriedade para compra")) {
    // Pergunta sobre VistaBella Oeiras
    if (
      lower.includes("vistabella") ||
      lower.includes("oeiras") ||
      (lower.includes("t2") && lower.includes("oeiras"))
    ) {
      const p = imoveis[0];
      return `📍 **${p.name}** ${p.badge ? `🌟 ${p.badge}` : ""}\n\n💰 Preço: ${p.priceRange}\n📏 Área: ${p.areaRange}\n🏠 Tipo: ${p.typology}\n📅 Conclusão: ${p.completion}\n\n✨ Destaques:\n• ${p.highlights?.join("\n• ")}\n\n${p.description}\n\n🏆 OPORTUNIDADE PREMIUM em DESTAQUE!\n${p.hasVideo360 ? "\n🎥 NOVO! Tour 360° disponível no site para explorar o empreendimento virtualmente!\n" : ""}\n🖼️ Tenho ${p.images} fotos incríveis! Quer agendar uma visita? 📸`;
    }

    // Pergunta sobre Machado Santos
    if (
      lower.includes("machado") ||
      (lower.includes("montijo") && !lower.includes("vistabella") && !lower.includes("horizon"))
    ) {
      const p = imoveis[1];
      return `📍 **${p.name}** - ${p.region}\n\n💰 Preço: ${p.priceRange}\n📏 Área: ${p.areaRange}\n🏠 Tipo: ${p.typology}\n📅 Conclusão: ${p.completion}\n\n${p.description}\n\n✨ Ótimo para investimento! 🎯\n\n🖼️ Tenho ${p.images} fotos! Quer agendar uma visita?`;
    }

    // Pergunta sobre Horizon
    if (
      lower.includes("horizon") ||
      (lower.includes("lourinhã") && !lower.includes("machado") && !lower.includes("vistabella"))
    ) {
      const p = imoveis[2];
      return `📍 **${p.name}** - ${p.region}\n\n💰 Preço: ${p.priceRange}\n📏 Área: ${p.areaRange}\n🏠 Tipo: ${p.typology}\n\n✨ Destaques:\n• ${p.highlights?.join("\n• ")}\n\n${p.description}\n\n🌟 Oportunidade Premium! 💎\n\n🖼️ Tenho ${p.images} fotos fantásticas! Quer saber mais?`;
    }

    // Pergunta genérica sobre imóveis para comprar
    if (
      lower.includes("imóvel") ||
      lower.includes("casa") ||
      lower.includes("apartamento") ||
      lower.includes("moradia") ||
      lower.includes("opções") ||
      lower.includes("alternativas")
    ) {
      return `Perfeito! Temos 3 oportunidades incríveis para ti:\n\n🏆 **VistaBella Oeiras** - €690k ⭐ NOVO!\n   ✓ Apartamento T2 Premium\n   ✓ Varanda + Jardim Privativo\n   ✓ 🎥 Tour 360° disponível\n   ✓ Setembro 2027\n\n🏢 **Machado Santos** (Montijo) - €285k-€395k\n   ✓ Apartamentos T0-T2\n   ✓ Conclusão: 1º Semestre 2027\n\n🏖️ **Horizon** (Lourinhã) - €1.45M-€2.3M\n   ✓ Moradias T3-T4\n   ✓ Junto à Praia da Peralta\n\nQual te interessa mais? 🔍`;
    }

    // Pergunta sobre preço ou financiamento
    if (lower.includes("preço") || lower.includes("quanto") || lower.includes("custa") || lower.includes("pagar")) {
      return `Aqui estão as faixas de preço:\n\n💰 **VistaBella Oeiras** - €690.000 ⭐ DESTAQUE\n💰 **Machado Santos** - €285.000 - €395.000\n💰 **Horizon** - €1.450.000 - €2.300.000\n\nPodes obter **financiamento imobiliário** com as melhores taxas! 🏦\n\nQuer que te ajude com uma simulação de crédito?`;
    }

    // Pergunta sobre vídeo 360
    if (
      lower.includes("vídeo") ||
      lower.includes("video") ||
      lower.includes("360") ||
      lower.includes("tour") ||
      lower.includes("virtual")
    ) {
      return `🎥 Excelente pergunta!\n\n**VistaBella Oeiras** tem um **Tour 360° completo** no site!\n\nPodes explorar virtualmente:\n✓ O empreendimento inteiro\n✓ As áreas comuns\n✓ As zonas de lazer\n✓ Os espaços exteriores\n\nÉ como estar lá de verdade! Muito útil para ter uma ideia completa antes de agendar uma visita presencial. 🌐\n\nQuer que te ajude com mais alguma coisa sobre VistaBella?`;
    }
  }

  // 🏡 SE CLIENTE QUER VENDER
  if (interest.includes("vender") || interest.includes("venda") || interest.includes("colocar à venda")) {
    if (
      lower.includes("imóvel") ||
      lower.includes("casa") ||
      lower.includes("propriedade") ||
      lower.includes("apartamento") ||
      lower.includes("moradia") ||
      lower.includes("como")
    ) {
      return `🎉 Excelente! Na VIZ vendes com **0% COMISSÃO**!\n\nPara te ajudar a colocar o teu imóvel à venda, preciso saber:\n\n📍 **Localização** - Onde fica?\n🏠 **Tipo** - É T1, T2, T3?\n💰 **Preço esperado** - Quanto esperas receber?\n📏 **Área aproximada** - Quantos m² tem?\n\nDá-me estes detalhes e criaremos um anúncio profissional! 📸`;
    }

    // Pergunta sobre processo de venda
    if (
      lower.includes("como") ||
      lower.includes("processo") ||
      lower.includes("quanto tempo") ||
      lower.includes("comissão")
    ) {
      return `Na VIZ, o processo é simples:\n\n✅ **Sem comissão** - Tu recebas 100%!\n✅ **Rápido** - Listamos em 24h\n✅ **Seguro** - Verificação de compradores\n✅ **Digital** - Tudo online\n\n⏱️ Em média, vendemos em 2-4 semanas.\n\nQuer começar? Diz-me os detalhes do teu imóvel! 🏠`;
    }
  }

  // 💰 SE CLIENTE QUER FINANCIAMENTO
  if (
    interest.includes("financiamento") ||
    interest.includes("crédito") ||
    interest.includes("financiar") ||
    interest.includes("hipoteca")
  ) {
    if (
      lower.includes("imóvel") ||
      lower.includes("casa") ||
      lower.includes("apartamento") ||
      lower.includes("quanto") ||
      lower.includes("taxa") ||
      lower.includes("crédito")
    ) {
      return `💰 Ótimo! Temos parceria com as melhores instituições de crédito!\n\nPara te ajudar com uma simulação, preciso:\n\n💵 **Valor do imóvel** - Quanto custa?\n📊 **Entrada disponível** - Quanto tens para dar?\n💼 **Rendimento mensal** - Qual é o teu rendimento?\n📅 **Anos de financiamento** - Quantos anos?\n\nCom estes dados fago uma simulação personalizada! 🎯`;
    }

    // Pergunta genérica sobre financiamento
    if (
      lower.includes("taxa") ||
      lower.includes("juros") ||
      lower.includes("financiar") ||
      lower.includes("empréstimo")
    ) {
      return `As nossas taxas de financiamento começam a partir de **1.95% a.a.** 📉\n\nDependendo do teu perfil, podes obter:\n\n✅ Financiamento até 90% do valor\n✅ Prazos de 5 a 40 anos\n✅ Sem despesas processuais (em alguns casos)\n\nQuer uma simulação? Diz-me o valor do imóvel! 💳`;
    }
  }

  // 📋 SE CLIENTE QUER DOCUMENTOS
  if (interest.includes("documento") || interest.includes("papelada") || interest.includes("upload")) {
    if (
      lower.includes("documento") ||
      lower.includes("papel") ||
      lower.includes("upload") ||
      lower.includes("enviar")
    ) {
      return `📋 Perfeito! Na VIZ podes fazer upload de documentos de forma 100% segura.\n\nDocumentos que normalmente solicitamos:\n\n✅ ID/Passaporte\n✅ Comprovante de morada\n✅ Certificado de rendimento\n✅ Certidão de nascimento\n✅ Documentação do imóvel (se aplicável)\n\nQual documento precisa enviar? 📤`;
    }
  }

  // ❓ RESPOSTA PADRÃO SE NÃO ENCAIXA
  return null;
}

// FUNÇÃO STREAM ORIGINAL
async function streamChat({
  messages,
  sessionId,
  name,
  interest,
  onDelta,
}: {
  messages: Msg[];
  sessionId: string;
  name: string;
  interest: string;
  onDelta: (t: string) => void;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, session_id: sessionId, name, interest }),
      signal: controller.signal,
    });

    if (resp.status === 429) throw new Error("Demasiados pedidos. Aguarda um momento.");
    if (resp.status === 402) throw new Error("Serviço temporariamente indisponível.");
    if (!resp.ok || !resp.body) throw new Error("Erro ao contactar o assistente.");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done: rd, value } = await reader.read();
      if (rd) break;
      buf += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buf.indexOf("\n")) !== -1) {
        let line = buf.slice(0, idx);
        buf = buf.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") return;
        try {
          const p = JSON.parse(json);
          const c = p.choices?.[0]?.delta?.content as string | undefined;
          if (c) onDelta(c);
        } catch {
          buf = line + "\n" + buf;
          break;
        }
      }
    }

    for (let raw of buf.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content as string | undefined;
        if (c) onDelta(c);
      } catch {
        /* skip */
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lead, setLead] = useState<ChatLead | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const saveMessage = async (sid: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({ session_id: sid, role, content });
  };

  const handleFormSubmit = async (data: ChatLead) => {
    setFormLoading(true);
    try {
      const newId = crypto.randomUUID();
      const { error } = await supabase
        .from("chat_sessions")
        .insert({ id: newId, name: data.name, email: data.email, phone: data.phone, interest: data.interest });

      if (error) throw error;

      setSessionId(newId);
      setLead(data);

      // ✨ MENSAGEM DE BOAS-VINDAS PERSONALIZADA CONFORME O INTERESSE
      let welcomeText = "";
      const interest = data.interest.toLowerCase();

      if (interest.includes("comprar") || interest.includes("investir")) {
        welcomeText = `Olá ${data.name}! 👋 Bem-vindo à VIZ!\n\n🏠 Vejo que queres **comprar ou investir** em imóvel!\n\nTenho 3 empreendimentos incríveis para ti:\n\n🏆 **VistaBella Oeiras** - €690k ⭐ NOVO!\n   Apartamento T2 Premium em Oeiras\n   🎥 Tour 360° disponível\n\n🏢 **Machado Santos** - €285k-€395k (Montijo)\n🏖️ **Horizon** - €1.45M-€2.3M (Lourinhã)\n\nQuer saber mais sobre algum deles? 🔍`;
      } else if (interest.includes("vender")) {
        welcomeText = `Olá ${data.name}! 👋 Bem-vindo à VIZ!\n\n🏡 Vejo que queres **vender o teu imóvel**!\n\n🎉 Excelente notícia: **0% COMISSÃO** na VIZ!\n\nDiz-me os detalhes do teu imóvel e criaremos um anúncio profissional em 24h! 📸`;
      } else if (interest.includes("financiamento") || interest.includes("crédito")) {
        welcomeText = `Olá ${data.name}! 👋 Bem-vindo à VIZ!\n\n💰 Vejo que precisa de **financiamento imobiliário**!\n\n📊 Temos parcerias com as melhores instituições com taxas a partir de 1.95% a.a.\n\nDá-me os detalhes e faço uma simulação personalizada! 🎯`;
      } else if (interest.includes("documento")) {
        welcomeText = `Olá ${data.name}! 👋 Bem-vindo à VIZ!\n\n📋 Vejo que precisa fazer **upload de documentos**!\n\n✅ Tudo é 100% seguro na VIZ!\n\nQue documentos precisa enviar? 📤`;
      } else {
        welcomeText = `Olá ${data.name}! 👋 Bem-vindo à VIZ!\n\nComo posso ajudar-te? 🤝`;
      }

      const welcome: Msg = {
        role: "assistant",
        content: welcomeText,
      };
      setMessages([welcome]);
      await saveMessage(newId, "assistant", welcome.content);
    } catch {
      console.error("Failed to create chat session");
    } finally {
      setFormLoading(false);
    }
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || !sessionId || !lead) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    await saveMessage(sessionId, "user", text);

    // 🎯 VERIFICA SE É PERGUNTA QUE O CHATBOT CONSEGUE RESPONDER
    const propertyAnswer = getPropertyMessage(text, lead.interest);
    if (propertyAnswer) {
      const botReply: Msg = { role: "assistant", content: propertyAnswer };
      setMessages((prev) => [...prev, botReply]);
      await saveMessage(sessionId, "assistant", propertyAnswer);
      setLoading(false);
      return;
    }

    // SE NÃO, USA A IA NORMAL
    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        sessionId,
        name: lead.name,
        interest: lead.interest,
        onDelta: upsert,
      });
    } catch (err) {
      const errMsg =
        err instanceof Error && err.name === "AbortError"
          ? "A resposta demorou demasiado. Tenta novamente."
          : err instanceof Error
            ? err.message
            : "Ocorreu um erro. Tenta novamente.";

      if (!assistantSoFar) {
        setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
        assistantSoFar = errMsg;
      }
    } finally {
      setLoading(false);
      if (assistantSoFar) {
        await saveMessage(sessionId, "assistant", assistantSoFar);
      }
    }
  }, [input, loading, messages, sessionId, lead]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-viz text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[500px] sm:w-[370px] sm:max-w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between bg-gradient-viz px-4 py-3 text-white">
            <span className="font-semibold text-sm">Assistente VIZ</span>
            <button onClick={() => setOpen(false)} aria-label="Fechar chat" className="p-1 -m-1 rounded hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!sessionId ? (
            <ChatPreForm onSubmit={handleFormSubmit} loading={formLoading} />
          ) : (
            <>
              <ChatMessages messages={messages} loading={loading} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 border-t border-border px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreve a tua pergunta..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  disabled={loading || !input.trim()}
                  className="h-8 w-8 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
