import express from "express";
import cors from "cors";
import incidentRoutes from "./src/routes/incident.routes.js";
import damageRoutes from "./src/routes/damageAssessment.routes.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/incidents", incidentRoutes);
app.use("/api/assessments", damageRoutes);

app.get("/", (req, res) => {
    res.send("FairFix API is running")
});

export default app;