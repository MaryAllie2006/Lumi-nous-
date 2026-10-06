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

const ERROR_MESSAGES = {
  LOCATION_NOT_FOUND: "We couldn't find that location. Try a city name or full address.",
  GEOLOCATION_UNSUPPORTED: "Your browser doesn't support location. Search by city instead.",
  1: "Location access is blocked. Allow it in your browser, or search by city instead.",
  2: "We couldn't determine your location. Search by city instead.",
  3: "Finding your location took too long. Please try again.",
  WEATHER_UNAVAILABLE: "We couldn't load the weather forecast right now. Please try again in a moment.",
};

function getErrorMessage(err) {
  return ERROR_MESSAGES[err.code] ?? "Something went wrong. Please try again.";
}

function Main() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'results' | 'error'
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

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
      setError(getErrorMessage(err));
      setStatus("error");
    }
  }

  async function handleUseLocation(){
    setStatus('loading')
    try { 
      const coords = await getCurrentCoords()
      await handleSearch(coords)
    } catch (err) {
      setError(getErrorMessage(err));
      setStatus("error");
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

      {(status === "idle" || status === "error") && (
        <>
          <img className="main__star" src={star} alt="" aria-hidden="true" />
          <h1 className="main__title">Luminous</h1>
          <p className="main__subtitle">
            Find the best night to stargaze, anywhere.
          </p>
          {status === "error" && (
            <p className="main__error" role="alert">
              {error}
            </p>
          )}
          <SearchForm onSearch={handleSearch} onUseLocation={handleUseLocation} />

        </>
      )}
    </main>
  );
}

export default Main;
