const OVERHEAD_WATTAGE = 130;
const HEADROOM_FACTOR = 1.3;

export function calculateBaseWattage(components) {
    return components.reduce((sum, c) => {
        const watts =
            parseInt(c.details?.tdp_watts) ||
            parseInt(c.details?.power) ||
            0;
        return sum + watts;
    }, 0);
}

export function calculateTotalWattage(components) {
    return calculateBaseWattage(components) + OVERHEAD_WATTAGE;
}

export function recommendPSU(totalWatts) {
    const withHeadroom = Math.ceil(totalWatts * HEADROOM_FACTOR);
    return Math.ceil(withHeadroom / 50) * 50;
}

export function checkWattage(components) {
    const psu = components.find(
        c => c.category?.trim().toUpperCase() == "PSU" );
    const total = calculateTotalWattage(components);
    const recommended = recommendPSU(total);
    
    if (!psu) {
        return {
            blockers: [],
            warnings: [{
                code: "NO_PSU",
                message: "Power supply not yet selected"
            }]
        };
    }

    const psuWattage = parseInt(psu.details?.wattage);

    if (!psuWattage || isNaN(psuWattage)) {
        return {
            blockers: [{
                code: "INVALID_PSU_WATTAGE",
                message: "PSU wattage is invalid"
            }],
            warnings: []
        };
    }

    if (psuWattage < total) {
        return {
            blockers: [{
                code: "PSU_WATTAGE_INSUFFICIENT",
                message: `PSU wattage (${psuWattage}W) is lower than required (${total}W)`
            }],
            warnings: []
        };
    }

    if (psuWattage < recommended) {
        return {
            blockers: [],
            warnings: [{
                code: "LOW_PSU_HEADROOM",
                message: `Recommended PSU wattage is ${recommended}W`
            }]
        };
    }

    return { blockers: [], warnings: [] };
}
