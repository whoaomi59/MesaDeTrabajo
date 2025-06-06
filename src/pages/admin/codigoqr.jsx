// QR.js
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QR() {
  const [text, setText] = useState("https://mesa-de-trabajo.vercel.app/");
  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "codigo_qr.png";
    a.click();
  };

  return (
    <div className="mt-10 lg:mt-0 text-center space-y-4">
      <h1 className="text-green-500 text-2xl font-bold">
        Generador de Código QR
      </h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ingresa texto o URL"
        className="border border-gray-300 p-2 rounded w-full max-w-md"
      />

      <div ref={qrRef} className="flex justify-center">
        <QRCodeCanvas value={text} size={256} />
      </div>

      <button
        onClick={downloadQR}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
      >
        Descargar QR
      </button>
    </div>
  );
}
