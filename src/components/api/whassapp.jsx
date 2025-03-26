import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export const WhatsAppLink = ({ phoneNumber, message }) => {
  // Elimina espacios y caracteres no numéricos del número
  const cleanedNumber = `57${phoneNumber.replace(/\D/g, "")}`; // Prefijo +57 para Colombia
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrlMovil = `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;
  const whatsappUrl = `https://web.whatsapp.com/send/?phone=${cleanedNumber}&text=${encodedMessage}`;

  return (
    <div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline flex"
      >
        whassapp Web {phoneNumber}
      </a>{" "}
      <a
        href={whatsappUrlMovil}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:underline"
      >
        whassapp Movil {phoneNumber}
      </a>
    </div>
  );
};
