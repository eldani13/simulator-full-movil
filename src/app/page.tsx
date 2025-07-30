"use client";

import { useState } from "react";
import { models } from "@/data/phoneData";
import SimulatorForm from "@/components/SimulatorForm";
import PhoneImageDisplay from "@/components/PhoneImageDisplay";
import Image from "next/image";
import { RiDownloadCloudFill } from "react-icons/ri";
import { MdReportProblem } from "react-icons/md";
import domtoimage from "dom-to-image-more";

const logo = "/logo.png";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState(models[0].name);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [almacenamiento, setAlmacenamiento] = useState("64/128GB");
  const [fallas, setFallas] = useState<string[]>([]);
  const [valor, setValor] = useState(0);

  async function handleDownload() {
    const node = document.getElementById("simulacion-descarga");
    if (!node) return;

    // No necesitas mostrarlo
    try {
      const dataUrl = await domtoimage.toPng(node);

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "simulacion_fullmovil.png";
      a.click();
    } catch (err) {
      console.error("Error generando imagen:", err);
    }
  }

  const resetResult = () => {
    setShowResult(false); // <- para que vuelva a aparecer el botón
  };

  const modelData = models.find((m) => m.name === selectedModel)!;
  const basePrice = modelData.storage[almacenamiento] || 0;
  const faultDeduction = fallas.reduce(
    (acc, f) => acc + (modelData.faults[f] || 0),
    0
  );
  const finalPrice = basePrice - faultDeduction;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenido principal */}
      <main className="flex-1 text-gray-900">
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* Título con logo */}
          <div className="text-center mb-16">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0142d0]">
                Simulador
              </h1>
              <div>
                <Image
                  src="/logo.png"
                  alt="Logo Full Móvil"
                  width={200}
                  height={200}
                  className="w-full h-auto drop-shadow-md"
                />
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto">
              Estima el valor de tu iPhone con Full Móvil: selecciona modelo,
              almacenamiento y fallas.
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-4 px-4 mb-10">
            <div className="w-full md:w-[220px]">
              <button
                onClick={handleDownload}
                className="w-full h-[50px] bg-[#0142d0] hover:bg-[#003eaa] text-white font-semibold py-2 px-4 rounded-xl shadow-md flex justify-center items-center gap-2"
              >
                <RiDownloadCloudFill size={24} />
                Descargar simulación
              </button>
            </div>
            <div className="w-full md:w-[220px]">
              <a
                href="https://wa.me/573015222004?text=Hola,%20presento%20inconvenientes%20con%20el%20simulador%20de%20crédito.%20¿Podrían%20ayudarme?"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full h-[50px] bg-[#0142d0] hover:bg-[#003eaa] text-white font-semibold py-2 px-4 rounded-xl shadow-md flex justify-center items-center gap-2">
                  <MdReportProblem size={24} />
                  ¿Algún problema?
                </button>
              </a>
            </div>
          </div>

          {/* Grid principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1 backdrop-blur-lg bg-transparent border border-transparent rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                <SimulatorForm
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  resetResult={resetResult}
                  setAlmacenamiento={setAlmacenamiento}
                  setFallas={setFallas}
                  setValor={setValor}
                />
              </div>
            </div>

            <div className="flex flex-col h-full">
              <div className="flex-1 backdrop-blur-2xl bg-transparent border border-transparent rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                <PhoneImageDisplay selectedModel={selectedModel} />
              </div>
            </div>
          </div>
        </section>

   <div
  id="simulacion-descarga"
  className="w-fit h-auto p-6 fixed overflow-hidden border-none"
  style={{
    top: "-9999px", // fuera del viewport
    left: "-9999px",
    backgroundColor: "#ffffff",
    border: "none",
    boxShadow: "none",
    outline: "none",
  }}
>
  <div
    className="absolute top-0 left-0 w-full h-full rounded-xl border-none"
    style={{
      backgroundImage: `url('/images/fondo.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: 0.2,
      border: "none",
      boxShadow: "none",
      outline: "none",
    }}
  ></div>

  <div className="relative z-10 text-center">
    <img
      src={logo}
      alt="Logo"
      width={100}
      height={100}
      style={{
        margin: "0 auto",
        marginBottom: "1rem",
        border: "none",
        boxShadow: "none",
        outline: "none",
      }}
    />

    <h2 className="text-xl font-bold border-none" style={{ color: "#0142d0" }}>
      Simulación Full Móvil
    </h2>
    <p className="text-black font-semibold border-none mt-4">
      Modelo: {selectedModel}
    </p>
    <p className="text-black font-semibold border-none mt-1">
      Almacenamiento: {almacenamiento}
    </p>
    <p className="text-black font-semibold border-none mt-1">
      Fallas: {fallas.length > 0 ? fallas.join(", ") : "Ninguna"}
    </p>
    <p className="text-black font-bold border-none mt-4 text-lg">
      Valor estimado: ${finalPrice.toLocaleString("es-CO")} COP
    </p>
  </div>
</div>

      </main>

      {/* Footer siempre al fondo */}
      <footer className="mt-auto px-4">
        <div className="mx-auto text-center py-6 px-6 rounded-2xl backdrop-blur-2xl bg-transparent border border-transparent shadow-xl flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
          <p className="text-sm text-black drop-shadow">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#0142d0]">Full Móvil</span>.
            Todos los derechos reservados.
          </p>
          <Image
            src="/logo.png"
            alt="Logo Full Móvil"
            width={100}
            height={100}
            className="w-auto h-6 sm:h-8 object-contain"
          />
        </div>
      </footer>
    </div>
  );
}
