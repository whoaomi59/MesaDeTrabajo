import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export const WhatsAppLink = ({ phoneNumber, message }) => {
  // Elimina espacios y caracteres no numéricos del número
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // Mensaje predefinido con codificación para URL
  const encodedMessage = encodeURIComponent(message);

  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-700 hover:underline flex"
    >
      <ChatBubbleBottomCenterTextIcon className="w-5 mr-1.5 text-gray-800" />
      {phoneNumber}
    </a>
  );
};
