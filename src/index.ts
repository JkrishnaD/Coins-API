import express from "express";
import { coinsRouter } from "./routes/coinsRouter";
import cors from "cors";
import { statsRouter } from "./routes/statsRouter";
import { deviationRouter } from "./routes/deviationRouter";

const app = express();

app.use("/*", cors());
app.use("/coins", coinsRouter);
app.use("/stats",statsRouter)
app.use("/deviation",deviationRouter)

app.listen(3000, () => {
  console.log("server is running");
});

export default app;
