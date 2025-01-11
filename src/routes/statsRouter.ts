import express from "express";
import axios from "axios";

export const statsRouter = express();

statsRouter.use(express.json());

statsRouter.get("/", async (req, res) => {
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

    res.json({
      price: coinData.current_price,
      marketCap: coinData.market_cap,
      "24hChange": coinData.price_change_24h,
    });
  } catch (error) {
    res.status(404).json({
      message: "Data not found",
    });
  }
});
