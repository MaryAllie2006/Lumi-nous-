import SearchForm from "../SearchForm/SearchForm.jsx";
import ResultsPanel from "../ResultsPanel/ResultsPanel.jsx";
import { useState } from "react";

import {
  getLocation,
  getWeather,
  getMoonPhase,
  getLightPollution,
} from "../../utils/api.js";
import { calculateScore } from "../../utils/score.js";

import "./main.css";

import Preloader from "../Preloader/Preloader.jsx";

import star from "../../images/star.svg";

import { getCurrentCoords } from "../../utils/geolocation.js";

function Main() {
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState(null);

  async function handleSearch(query) {
    setStatus("loading");
    try {
      const location = await getLocation(query);
      const coords = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const [weather, moon, lightPollution] = await Promise.all([
        getWeather(coords),
        getMoonPhase(),
        getLightPollution(coords),
      ]);

      const { score, rating, verdict } = calculateScore({
        weather,
        moonPhase: moon,
        lightPollution,
      });

      setResults({
        location,
        weather,
        moon,
        lightPollution,
        score,
        rating,
        verdict,
      });
      setStatus("results");
    } catch (err) {
      setStatus("idle");
    }
  }

  async function handleUseLocation(){
    setStatus('loading')
    try { 
      const coords = await getCurrentCoords()
      await handleSearch(coords)
    } catch (err) {
      setStatus('idle')
    }
  }

  return (
    <main className="main">
      {status === "loading" && (
        <Preloader
          title="Reading the sky over your location..."
          subtitle="Pulling live cloud cover, moon phase and light pollution data"
        />
      )}

      {status === "results" && <ResultsPanel {...results} />}

      {status === "idle" && (
        <>
          <img className="main__star" src={star} alt="" aria-hidden="true" />
          <h1 className="main__title">Luminous</h1>
          <p className="main__subtitle">
            Find the best night to stargaze, anywhere.
          </p>
          <SearchForm onSearch={handleSearch} onUseLocation={handleUseLocation} />

        </>
      )}
    </main>
  );
}

export default Main;
