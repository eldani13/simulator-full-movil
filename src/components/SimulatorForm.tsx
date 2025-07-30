"use client";

import { useEffect, useState } from "react";
import { models } from "@/data/phoneData";
import QuoteBox from "./QuoteBox";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface Props {
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  resetResult: () => void;
  setAlmacenamiento: (value: string) => void;
  setFallas: (value: string[]) => void;
  setValor: (value: number) => void;
}

export default function SimulatorForm({
  selectedModel,
  setSelectedModel,
  resetResult,
  setAlmacenamiento,
  setFallas,
  setValor,
}: Props) {
  const modelData = models.find((m) => m.name === selectedModel)!;
  const [storage, setStorage] = useState(Object.keys(modelData.storage)[0]);
  const [faults, setFaults] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [changeCounter, setChangeCounter] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const basePrice = modelData.storage[storage] || 0;
  const faultDeduction = faults.reduce(
    (acc, f) => acc + (modelData.faults[f] || 0),
    0
  );
  const finalPrice = basePrice - faultDeduction;

  const filteredModels = models.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStorage(e.target.value);
    resetResult();
    setChangeCounter((prev) => prev + 1);
  };

  const handleFaultChange = (fault: string) => {
    setFaults((prev) => {
      const updated = prev.includes(fault)
        ? prev.filter((f) => f !== fault)
        : [...prev, fault];
      setChangeCounter((c) => c + 1);
      return updated;
    });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setFaults([]);
    resetResult();
    setChangeCounter((c) => c + 1);
  };

  useEffect(() => {
    setAlmacenamiento(storage);
    setFallas(faults);
    setValor(finalPrice);
  }, [storage, faults, finalPrice]);

  return (
    <div className=" rounded-2xl space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-[#0142d0]">Simulador</h2>
          <Image
            src="/logo.png"
            alt="Logo Full Móvil"
            width={100}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </div>
        <p className="text-sm text-gray-600">
          Selecciona las características del dispositivo para estimar su valor.
        </p>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent shadow backdrop-blur-md border border-transparent rounded-xl px-4 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Modelo
        </label>
        <select
          className="w-full bg-transparent shadow backdrop-blur-md border border-transparent rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/10 transition"
          value={selectedModel}
          onChange={handleModelChange}
        >
          {filteredModels.map((m) => (
            <option key={m.name} className="text-black">
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Almacenamiento
        </label>
        <select
          className="w-full bg-transparent shadow backdrop-blur-md border border-transparent rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/10 transition"
          value={storage}
          onChange={handleStorageChange}
        >
          {Object.keys(modelData?.storage || {}).map((size) => (
            <option key={size} className="text-black">
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Fallas
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(modelData.faults).map(([fault, value]) => (
            <label
              key={fault}
              className="group relative cursor-pointer select-none rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/20 transition shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={faults.includes(fault)}
                    onChange={() => handleFaultChange(fault)}
                    className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
                  />

                  <span className="absolute w-full h-full rounded-full border border-[#fb7e02]"></span>

                  <IoIosCheckmarkCircle
                    size={24}
                    className="text-[#fb7e02] opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                  />
                </span>

                <span className="text-[#0142d0] font-medium">{fault}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <QuoteBox price={finalPrice} changeTrigger={changeCounter} />
    </div>
  );
}
