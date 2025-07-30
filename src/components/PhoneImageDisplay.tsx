"use client";

import { models } from "@/data/phoneData";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  selectedModel: string;
}

export default function PhoneImageDisplay({ selectedModel }: Props) {
  const model = models.find((m) => m.name === selectedModel);
  const [imageKey, setImageKey] = useState(0);

  useEffect(() => {
    setImageKey((prev) => prev + 1);
  }, [selectedModel]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="rounded-3xl p-6 w-full max-w-xl flex justify-center items-center">
        <Image
          key={imageKey}
          src={model?.image || "/assets/phones/default.png"}
          alt={selectedModel}
          width={300}
          height={600}
          className="h-full w-full object-contain drop-shadow-2xl"
          priority
        />
      </div>
      <p className="text-center text-xl font-semibold text-[#0142d0] mt-6">
        {selectedModel}
      </p>
    </div>
  );
}
