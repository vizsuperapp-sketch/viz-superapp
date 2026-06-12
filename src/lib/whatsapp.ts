export const WHATSAPP_NUMBER = "351916021831";
export const WHATSAPP_MESSAGE = "Olá, quero saber mais sobre os serviços VIZ.";

export function getWhatsAppLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
