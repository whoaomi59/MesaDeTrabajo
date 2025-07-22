import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export const WhatsAppLink = ({ phoneNumber, message }) => {
  const cleanedNumber = `57${phoneNumber.replace(/\D/g, "")}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrlMovil = `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;
  const whatsappUrlPC = `https://web.whatsapp.com/send/?phone=${cleanedNumber}&text=${encodedMessage}`;

  // Detecta si el usuario está en un dispositivo móvil
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent
  );
  const finalUrl = isMobile ? whatsappUrlMovil : whatsappUrlPC;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 hover:underline flex"
    >
      WhatsApp ({isMobile ? "Móvil" : "Web"}) - {phoneNumber}
    </a>
  );
};
