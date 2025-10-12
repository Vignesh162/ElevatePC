import React, { useContext, useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { BuildContext } from "../contexts/buildContext";

export default function PcBuilderPage() {
  const navigate = useNavigate();
  const buildContext = useContext(BuildContext);
  
  if (!buildContext) {
    throw new Error("PcBuilderPage must be used within a BuildProvider");
  }

  const {
    builds,
    currentBuildId,
    currentBuild,
    setCurrentBuildId,
    addNewBuild,
    deleteBuild,
    updateBuildName,
    updateBuildStatus,
    getBuildTotal,
    loading,
    error
  } = buildContext;

  const [hoverCategory, setHoverCategory] = useState(null);
  const [editingBuild, setEditingBuild] = useState(null);
  const [localError, setLocalError] = useState(null);

  // Calculate build total using the context function
  const buildTotal = currentBuild ? getBuildTotal(currentBuild.id) : 0;

  const handleAddOrReplace = (category) => {
    navigate(`/AllProductsPage?buildId=${currentBuildId}&category=${category}`);
  };

  const handleAddNewBuild = async () => {
    try {
      setLocalError(null);
      await addNewBuild();
      navigate(0);
    } catch (err) {
      setLocalError("Failed to create new build. Please try again.");
    }
  };

  const handleDeleteBuild = async (buildId) => {
    try {
      setLocalError(null);
      await deleteBuild(buildId);
    } catch (err) {
      setLocalError("Failed to delete build. Please try again.");
    }
  };

  const handleSaveBuildEdit = async () => {
    if (!editingBuild) return;
    
    try {
      setLocalError(null);
      await updateBuildName(editingBuild.id, editingBuild.name);
      await updateBuildStatus(editingBuild.id, editingBuild.status);
      setEditingBuild(null);
    } catch (err) {
      setLocalError("Failed to update build. Please try again.");
    }
  };
  const handleBuyBuild = () => {
    navigate("/CartPage");
  }

  // Clear errors when component unmounts or when modal closes
  useEffect(() => {
    return () => {
      setLocalError(null);
    };
  }, []);

  if (loading && builds.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading your builds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-min flex flex-col bg-gray-950 text-white">
      {/* Header */}
      <header className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Custom PC Builder</h1>
        <button
          onClick={handleAddNewBuild}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "+ New Build"}
        </button>
      </header>

      {/* Error Display */}
      {(error || localError) && (
        <div className="bg-red-900 border border-red-700 text-red-200 p-3 mx-4 mt-4 rounded">
          <div className="flex justify-between items-center">
            <span>{localError || error}</span>
            <button 
              onClick={() => setLocalError(null)}
              className="text-red-400 hover:text-red-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Build selector */}
      <div className="p-4 flex space-x-7 overflow-x-auto bg-gray-900 border-b border-gray-700">
        {builds.map((b) => (
          <div key={b.id} className="relative flex flex-col items-start">
            {/* Build button */}
            <button
              onClick={() => setCurrentBuildId(b.id)}
              className={`px-3 py-1 rounded ${
                currentBuildId === b.id
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {b.name}
            </button>

            {/* Edit button */}
            <button
              onClick={() => setEditingBuild(b)}
              className="absolute -top-2 -left-2 text-white px-1 py-0.5 text-xs bg-gray-700 rounded hover:bg-gray-600"
            >
              ✎
            </button>

            {/* Delete button */}
            <button
              onClick={() => handleDeleteBuild(b.id)}
              disabled={loading}
              className="absolute -top-2 -right-2 text-red-500 hover:text-red-700 text-xs font-bold rounded-full bg-gray-800 px-1 disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Show message if no builds exist */}
      {builds.length === 0 && !loading && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">No builds found. Create your first build to get started!</p>
            <button
              onClick={handleAddNewBuild}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Create First Build
            </button>
          </div>
        </div>
      )}

      {/* Main content - only show if we have builds */}
      {builds.length > 0 && currentBuild && (
        <>
          {/* Left panel & right checklist */}
          <div className="flex flex-1">
            {/* Left: Static sticky panel */}
            <div className="w-2/5 flex justify-center p-6">
              <div className="sticky top-25 w-80 h-[500px] border-4 border-gray-700 rounded-lg bg-gray-900 ">
                {/* CPU */}
                <div
                  className={`absolute top-20 left-30 w-16 h-16 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                    hoverCategory === "cpu"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.cpu ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  CPU
                </div>

                {/* GPU */}
                <div
                  className={`absolute top-56 left-11 w-54 h-16 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                    hoverCategory === "gpu"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.gpu ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  GPU
                </div>
                

                {/* Motherboard */}
                <div
                  className={`absolute top-12 left-8 w-60 h-64 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                    hoverCategory === "motherboard"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.motherboard ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  Motherboard
                </div>

                

                {/* RAM */}
                <div
                  className={`absolute top-20 right-14 w-12 h-32 border-2 flex flex-col justify-center items-center text-xs text-gray-400 transition ${
                    hoverCategory === "ram"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.ram ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  RAM
                </div>

                

                {/* Storage */}
                <div
                  className={`absolute bottom-25 right-6 w-30 h-15 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                    hoverCategory === "storage"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.storage ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  Storage
                </div>

                {/* PSU */}
                <div
                  className={`absolute bottom-4 left-4 w-40 h-16 border-2 flex items-center justify-center text-xs text-gray-400 transition ${
                    hoverCategory === "psu"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.psu ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  PSU
                </div>

                {/* CASE */}
                <div
                  className={`absolute inset-0 rounded-lg transition ${
                    hoverCategory === "case"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.case ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                />

                {/* Cooler */}
                <div
                  className={`absolute top-22 left-14 w-12 h-12 border-2 rounded-full flex items-center justify-center text-xs text-gray-400 transition ${
                    hoverCategory === "cooler"
                      ? "border-yellow-400 shadow-lg shadow-yellow-500"
                      : currentBuild.components?.cooler ? " border-blue-700 shadow-md shadow-blue-700" : "border-dashed border-gray-700"
                  }`}
                >
                  Cooler
                </div>
              </div>
            </div>

            {/* Right: Checklist */}
            <div className="w-3/5 p-6 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Select Components</h2>
              <div className="space-y-4">
                {[
                  "cpu","gpu", "motherboard", "ram",  
                  "storage", "psu", "cooler","case", "monitor"
                ].map((category) => {
                  // Check if components is an array or object
                  let component;
                  if (Array.isArray(currentBuild.components)) {
                    component = currentBuild.components.find(comp => comp.category === category);
                  } else {
                    component = currentBuild.components?.[category];
                  }
                  
                  return (
                    <div
                      key={category}
                      className="bg-gray-800 p-4 rounded flex justify-between items-center cursor-pointer"
                      onMouseEnter={() => setHoverCategory(category)}
                      onMouseLeave={() => setHoverCategory(null)}
                    >
                      <span className="capitalize font-semibold">
                        {category}{" "}
                        {component && `: ${component.name}`}
                      </span>
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={() => handleAddOrReplace(category)}
                      >
                        {component ? "Replace" : "Add"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center text-center align-middle m-5">  
            <button
              onClick={handleBuyBuild}
              className="align-middle mt-6 w-[120px] h-[60px] bg-green-600 hover:bg-green-700 rounded-xl font-bold transition transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              Buy Build
            </button>
          </div>

          {/* Bottom Build Summary */}
          <div className="p-6 bg-gray-900 border-t border-gray-700">
            <h2 className="text-lg font-bold mb-2">Build Summary</h2>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {[
                "case", "motherboard", "cpu", "ram", "gpu", 
                "storage", "psu", "cooler", "monitor"
              ].map((category) => {
                // Check if components is an array or object
                let component;
                if (Array.isArray(currentBuild.components)) {
                  component = currentBuild.components.find(comp => comp.category === category);
                } else {
                  component = currentBuild.components?.[category];
                }
                
                return (
                  <div key={category} className="flex flex-row bg-gray-800 p-2 rounded justify-between">
                    <div>
                      <span className="font-semibold capitalize">{category}: </span>
                      {component ? component.name : "Not Selected"}
                    </div>
                    <div className="text-green-500 inline">
                      {component ? `₹${parseFloat(component.price || 0).toLocaleString('en-IN')}` : "₹0"}
                    </div>
                  </div>
                );
              })}
            </div>
            <h2 className="text-lg font-bold mt-2">
              Total: <span className="text-green-500">₹{buildTotal.toLocaleString('en-IN')}</span>
            </h2>
          </div>
        </>
      )}

      {/* Edit build modal */}
      {editingBuild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80 text-white relative">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-300"
              onClick={() => {
                setEditingBuild(null);
                setLocalError(null);
              }}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-2">Edit Build</h2>
            <input
              type="text"
              value={editingBuild.name}
              onChange={(e) =>
                setEditingBuild({ ...editingBuild, name: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded border border-gray-700"
              placeholder="Build name"
            />
            <select
              value={editingBuild.status || "draft"}
              onChange={(e) =>
                setEditingBuild({ ...editingBuild, status: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded border border-gray-700"
            >
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="purchased">Purchased</option>
              <option value="archived">Archived</option>
            </select>
            
            {localError && (
              <p className="text-red-400 text-sm mb-4">{localError}</p>
            )}
            
            <button
              onClick={handleSaveBuildEdit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-600 w-full"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}