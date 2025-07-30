"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TfiMoney } from "react-icons/tfi";

export default function QuoteBox({
  price,
  changeTrigger,
}: {
  price: number;
  changeTrigger: number;
}) {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    setLoading(true);
    setShowResult(false);
    setProgress(0);
  };

  // Este useEffect reinicia cuando cambia el modelo o el almacenamiento
  useEffect(() => {
    setShowResult(false);
    setLoading(false);
    setProgress(0);
  }, [changeTrigger]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading && progress < 100) {
      timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, 20);
    } else if (progress === 100) {
      setLoading(false);
      setShowResult(true);
    }
    return () => clearTimeout(timer);
  }, [loading, progress]);

  return (
    <div className="bg-[#fb7e02]/10 border border-transparent rounded-3xl p-6 mt-8 shadow-md text-center">
      <h3 className="text-xl font-semibold text-[#0142d0]">Valor estimado</h3>

      {!showResult && !loading && (
<button
  onClick={handleClick}
  className="flex justify-center items-center mt-4 mb-8 px-6 py-3 bg-[#fb7e02] text-white font-bold rounded-xl border border-[#fb7e02] hover:bg-[#fb7e02] transition shadow-lg mx-auto"
>
  <TfiMoney size={20} className="mr-2 text-white" />
  Calcular valor
</button>

      )}

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="bg-[#fb7e02] h-full text-white text-xs text-center font-medium transition-all duration-100"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {showResult && (
        <>
          <p className="text-5xl font-bold text-[#fb7e02] my-4">
            ${price.toLocaleString("es-CO")} COP
          </p>

          <p className="text-gray-600 text-sm mb-4">
            Este valor puede variar según el estado real del dispositivo.
          </p>
        </>
      )}

      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          alt="Logo Full Móvil"
          width={100}
          height={100}
          className="h-8 w-auto object-contain"
        />
      </div>
    </div>
  );
}
