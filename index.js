import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/wa-evs", async (req, res) => {
  try {
    const response = await fetch("https://data.wa.gov/api/views/f6w7-q2d2/rows.json?accessType=DOWNLOAD");
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ count: data.data.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch EV data." });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy API running on port ${PORT}`);
});
