export const checkRamCompatibility = (components) => {
  const ram = components.find(c => c.category === "RAM");
  const motherboard = components.find(c => c.category === "Motherboard");

  if (!ram || !motherboard) return { blockers: [], warnings: [] };

  if (ram.details.ram_type !== motherboard.details.ram_type) {
    return {
      blockers: [{
        code: "RAM_TYPE_MISMATCH",
        message: "RAM type does not match motherboard"
      }],
      warnings: []
    };
  }

  return { blockers: [], warnings: [] };
};
