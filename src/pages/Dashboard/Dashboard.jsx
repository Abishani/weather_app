import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const defaultLocation = "Colombo";

  const navigate = useNavigate();
  const [logout, setlogout] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login");
  }, [logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setlogout(true);
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={API_KEY}`;

  const clickFunctionHandler = (e) => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=imperial&appid={API_KEY}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />

        <button className="click" onClick={clickFunctionHandler}>
          click Here
        </button>
      </div>
      <div className="home">
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>

            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="buttonStyle">
        <button className="button" onClick={logoutHandler}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
