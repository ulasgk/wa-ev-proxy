import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/wa-evs", async (req, res) => {
  try {
    const response = await fetch("https://data.wa.gov/resource/f6w7-q2d2.json?$select=count(*)");
    const data = await response.json();
    const count = parseInt(data[0].count);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch EV data." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ WA EV Proxy running on port ${PORT}`);
});
