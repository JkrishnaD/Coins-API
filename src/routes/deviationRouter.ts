import express from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export const deviationRouter = express();
const db = new PrismaClient();
deviationRouter.use(express.json());

deviationRouter.get("/", async (req, res) => {
  const { coin } = req.body;

  const options = {
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`,
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.DEMO_API_KEY,
    },
  };
  try {
    const response = await axios.request(options);

    const coinData = response.data[0];
    const existingData = await db.coins.findFirst({
      where: {
        id: coinData.id,
      },
      select: {
        currentPrice: true,
      },
    });

    if (!existingData) {
      res.status(404).json({
        message: "Data not found in the database",
      });
    } else {
      const deviation = existingData.currentPrice - coinData.current_price;
      res.json({
        deviation: deviation,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Data not found",
    });
  }
});
