import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Optimized version: only fetch count metadata
app.get("/wa-evs", async (req, res) => {
  try {
    const response = await fetch("https://data.wa.gov/api/id/f6w7-q2d2.json");
    const metadata = await response.json();
    const rowCount = parseInt(metadata.view.rowsUpdatedAt) ? metadata.view.totalRows : 0;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ count: rowCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});
