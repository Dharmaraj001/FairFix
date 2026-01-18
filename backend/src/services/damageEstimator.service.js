const baseCosts = {
  TWO_WHEELER: { min: 500, max: 2000 },
  HATCHBACK: { min: 1500, max: 4000 },
  SEDAN: { min: 2500, max: 6000 },
  SUV: { min: 4000, max: 10000 }
};

const damageMultiplier = {
  SCRATCH: 1,
  DENT: 1.5,
  CRACK: 2,
  MIXED: 2.5
};

const areaMultiplier = {
  BUMPER: 1.2,
  DOOR: 1.4,
  SIDE_PANEL: 1.6,
  FRONT: 1.8,
  REAR: 1.7
};

export const estimateDamageCost = ({
  vehicleType,
  damageType,
  affectedArea
}) => {
  const base = baseCosts[vehicleType];
  const damageFactor = damageMultiplier[damageType];
  const areaFactor = areaMultiplier[affectedArea];

  if (!base || !damageFactor || !areaFactor) {
    throw new Error("Invalid damage estimation inputs");
  }

  const minCost = Math.round(base.min * damageFactor * areaFactor);
  const maxCost = Math.round(base.max * damageFactor * areaFactor);

  return {
    minCost,
    maxCost,
    confidence: damageType === "MIXED" ? "LOW" : "MEDIUM",
    notes: "Estimated based on visible damage and vehicle category"
  };
};
