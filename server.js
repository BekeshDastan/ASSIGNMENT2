require("dotenv").config();

const path = require("path");
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Astana";
  const apiKey = OPENWEATHER_API_KEY;

  console.log("OPENWEATHER_API_KEY =", apiKey);

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "OPENWEATHER_API_KEY is missing on server" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${apiKey}`;

    console.log("WEATHER URL =", url);

    const response = await fetch(url);
    console.log("WEATHER STATUS =", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("OPENWEATHER ERROR BODY =", text);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch weather data" });
    }

    const data = await response.json();

    const result = {
      temperature: data.main?.temp,
      feels_like: data.main?.feels_like,
      description: data.weather?.[0]?.description,
      coordinates: {
        lat: data.coord?.lat,
        lon: data.coord?.lon,
      },
      wind_speed: data.wind?.speed,
      country: data.sys?.country,
      rain_3h: data.rain?.["3h"] || 0,
      city: data.name,
    };

    res.json(result);
  } catch (err) {
    console.error("WEATHER ERROR =", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/news", async (req, res) => {
  const country = (req.query.country || "KZ").toLowerCase();

  if (!NEWS_API_KEY) {
    return res
      .status(500)
      .json({ error: "NEWS_API_KEY is missing on server" });
  }

  try {
  
    const url = `https://api.worldnewsapi.com/search-news?api-key=${encodeURIComponent(
      NEWS_API_KEY
    )}&source-country=${encodeURIComponent(country)}&language=ru&number=5`;

    console.log("WORLD NEWS URL =", url);

    const response = await fetch(url);
    console.log("WORLD NEWS STATUS =", response.status);

    const raw = await response.text();
    console.log("WORLD NEWS RAW BODY (first 500) =", raw.slice(0, 500));

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch news data" });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error("WORLD NEWS JSON PARSE ERROR =", e);
      return res
        .status(500)
        .json({ error: "Invalid JSON from World News API" });
    }

    const articles = (data.news || []).map((a) => ({
      title: a.title,
      description: a.summary,
      url: a.url,
      source: a.source_name,
      publishedAt: a.publish_date,
    }));

    res.json({
      country,
      totalResults: data.available ?? articles.length,
      articles,
    });
  } catch (err) {
    console.error("WORLD NEWS ERROR =", err);
    res.status(500).json({ error: "Server error (news)" });
  }
});

app.get("/", (req, res) => {
  res.send("Weather API server is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
