export const handleWhatsappClick = (texto, Info) => {
  const phoneNumber = "57" + Info;
  const message = "Hola, Admin. ¿Podría ayudarme con mi formulario?";

  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);
  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";

  const whatsappURL = `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(
    texto
  )}`;

  window.open(whatsappURL, "_blank");
};
