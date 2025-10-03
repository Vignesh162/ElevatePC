import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // react-router v6
import { BuildContext } from "../contexts/buildContext";

export default function PcBuilderPage() {
  const navigate = useNavigate();
  const { builds, currentBuildId, setCurrentBuildId, addNewBuild } = useContext(BuildContext);

  const [hoverCategory, setHoverCategory] = useState(null);

  const currentBuild = builds.find((b) => b.id === currentBuildId)  || builds[0];

  // Navigate to AllProductsPage to select components
  const handleAddOrReplace = (category) => {
    navigate(`/AllProductsPage?buildId=${currentBuildId}&category=${category}`);
  };


  return (
    <div className="h-min flex flex-col bg-gray-950 text-white">
      {/* Header */}
      <header className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Custom PC Builder</h1>
        <button
          onClick={addNewBuild}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          + New Build
        </button>
      </header>

      {/* Build selector */}
      <div className="p-4 flex space-x-4 overflow-x-auto bg-gray-900 border-b border-gray-700">
        {builds.map((b) => (
          <button
            key={b.id}
            onClick={() => setCurrentBuildId(b.id)}
            className={`px-3 py-1 rounded ${
              currentBuildId === b.id
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        {/* Left: Static sticky panel */}
        <div className="w-1/2 flex justify-center p-6">
          <div className="sticky top-25 w-80 h-[500px] border-4 border-gray-700 rounded-lg bg-gray-900 ">
            {/* CASE */}
            <div
              className={`absolute inset-0 rounded-lg transition ${
                hoverCategory === "case"
                  ? "border-4 border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-4 border-gray-700"
              }`}
            />

            <div
              className={`absolute top-12 left-8 w-60 h-64 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                hoverCategory === "motherboard"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-600"
              }`}
            >
              Motherboard
            </div>

            <div
              className={`absolute top-20 left-30 w-16 h-16 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                hoverCategory === "cpu"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-500"
              }`}
            >
              CPU
            </div>

            <div
              className={`absolute top-20 right-14 w-12 h-32 border-2 flex flex-col justify-center items-center text-xs text-gray-400 transition ${
                hoverCategory === "ram"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-500"
              }`}
            >
              RAM
            </div>

            <div
              className={`absolute top-56 left-11 w-54 h-16 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                hoverCategory === "gpu"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-500"
              }`}
            >
              GPU
            </div>

            <div
              className={`absolute bottom-20 right-6 w-24 h-12 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                hoverCategory === "storage"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-500"
              }`}
            >
              Storage
            </div>

            <div
              className={`absolute bottom-4 left-3 w-40 h-16 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                hoverCategory === "psu"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-500"
              }`}
            >
              PSU
            </div>

            <div
              className={`absolute top-22 left-14 w-12 h-12 border-2 rounded-full flex items-center justify-center text-xs text-gray-400 transition ${
                hoverCategory === "cooler"
                  ? "border-yellow-400 shadow-lg shadow-yellow-500"
                  : "border-dashed border-gray-500"
              }`}
            >
              Cooler
            </div>
          </div>
        </div>

        {/* Right: Checklist */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Select Components</h2>
          <div className="space-y-4">
            {Object.keys(currentBuild.components).map((category) => (
              <div
                key={category}
                className="bg-gray-800 p-4 rounded flex justify-between items-center cursor-pointer"
                onMouseEnter={() => setHoverCategory(category)}
                onMouseLeave={() => setHoverCategory(null)}
              >
                <span className="capitalize font-semibold">
                  {category}{" "}
                  {currentBuild.components[category] &&
                    `: ${currentBuild.components[category].name}`}
                </span>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                  onClick={() => handleAddOrReplace(category)}
                >
                  {currentBuild.components[category] ? "Replace" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Build Summary */}
      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <h2 className="text-lg font-bold mb-2">Build Summary</h2>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {Object.keys(currentBuild.components).map((key) => (
            <div key={key} className="bg-gray-800 p-2 rounded">
              <span className="font-semibold capitalize">{key}: </span>
              {currentBuild.components[key]
                ? currentBuild.components[key].name
                : "Not Selected"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
