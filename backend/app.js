import express from "express";
import cors from "cors";
import incidentRoutes from "./src/routes/incident.routes.js";
import damageRoutes from "./src/routes/damageAssessment.routes.js";
import mechanicRoutes from "./src/routes/mechanic.routes.js";
import settlementRoutes from "./src/routes/settlement.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/incidents", incidentRoutes);
app.use("/api/assessments", damageRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/settlements", settlementRoutes);
app.use(errorHandler);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("FairFix API is running")
});

export default app;