import { checkWattage } from "./wattageService.js";
import { checkCpuMotherboardSocket } from "./socketService.js";
import { checkRamCompatibility } from "./ramService.js";

export const checkCompatibility = (components) => {
  const results = [
    checkWattage(components),
    checkCpuMotherboardSocket(components),
    //checkRamCompatibility(components)
  ];

  return results.reduce(
    (acc, cur) => ({
      blockers: [...acc.blockers, ...cur.blockers],
      warnings: [...acc.warnings, ...cur.warnings]
    }),
    { blockers: [], warnings: [] }
  );
};
