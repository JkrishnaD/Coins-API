import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

dotenv.config();
export const coinsRouter = express();
const db = new PrismaClient();

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  price_change_24h: number;
}

const fetchAndUpdateCoins = async () => {
  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbitcoin",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.DEMO_API_KEY,
    },
  };

  try {
    const response = await axios.request(options);

    if (!response.data) {
      console.log("Data not found");
      return;
    }

    const coinsData: CoinData[] = response.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      price_change_24h: coin.price_change_percentage_24h,
    }));

    const ids = coinsData.map((coin) => coin.id);

    const existingData = await db.coins.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (existingData.length > 0) {
      await db.coins.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      console.log("Existing data deleted");
    }

    await db.coins.createMany({
      data: coinsData,
    });
    console.log(
      existingData.length > 0 ? "Data updated" : "Data added successfully"
    );
  } catch (error) {
    console.error("Error while adding data to the database:");
  }
};

cron.schedule("0 */2 * * *", fetchAndUpdateCoins);

coinsRouter.get("/", async (req, res) => {
  try {
    await fetchAndUpdateCoins();
    res.json({
      message: "data added succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error while updating the data",
    });
  }
});


