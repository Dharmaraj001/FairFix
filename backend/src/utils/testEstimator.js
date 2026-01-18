import { estimateDamageCost } from "../services/damageEstimator.service.js";

console.log(
    estimateDamageCost({
        vehicleType: "SEDAN",
        damageType: "DENT",
        affectedArea: "BUMPER"
    })
)

console.log(
    estimateDamageCost({
        vehicleType: "SUV",
        damageType: "SCRATCH",
        affectedArea: "REAR"
    })
)