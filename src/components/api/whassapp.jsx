import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export const WhatsAppLink = ({ phoneNumber, message }) => {
  // Elimina espacios y caracteres no numéricos del número
  const cleanedNumber = `57${phoneNumber.replace(/\D/g, "")}`; // Prefijo +57 para Colombia
  const encodedMessage = encodeURIComponent(message);
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
