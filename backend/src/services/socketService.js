export const checkCpuMotherboardSocket = (components) => {
  const cpu = components.find(c => c.category === "CPU");
  const motherboard = components.find(c => c.category === "Motherboard");

  if (!cpu || !motherboard) return { blockers: [], warnings: [] };

  if (cpu.details.socket.trim().toUpperCase() !== motherboard.details.socket.trim().toUpperCase()) {
    return {
      blockers: [{
        code: "CPU_SOCKET_MISMATCH",
        message: "CPU socket does not match motherboard socket"
      }],
      warnings: []
    };
  }

  return { blockers: [], warnings: [] };
};
