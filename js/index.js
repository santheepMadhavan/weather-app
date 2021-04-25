const searchCity = (event) => {
  event.preventDefault();
  const value = document.getElementById("inputField").value;
  const API_KEY = "690579a54b13d363a6de030aa41f1683";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&id=524901&appid=${API_KEY}&units=metric`;
  if (value != "") fetchWeather(url);
};

const fetchWeather = (url) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("City not found");
      }
    })
    .then((response) => {
      document.querySelector("form").reset();
      document.getElementById("content-result").style.display = "flex";
      document.getElementById("content-result").style.visibility = "visible";
      document.getElementById("date").innerText = new Date().toLocaleDateString(
        "en-US",
        options
      );
      document.getElementById(
        "cityName"
      ).innerText = `${response.name} - ${response.sys.country}`;
      const iconCode = response.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById("image").src = iconUrl;
      document.getElementById("temperatureName").innerText =
        response.weather[0].main;
      document.getElementById("temperature").innerHTML = `${Math.round(
        response.main.temp
      )} <sup>°C</sup>`;
      let unix = 1507473344;
      let date = new Date(response.sys.sunrise * 1000);
      console.log(date);
      document.getElementById(
        "feelsLike"
      ).innerHTML = `${response.main.feels_like} <sup class='small-font'>°C</sup>`;
      document.getElementById("humidity").innerText =
        response.main.humidity + "%";
      document.getElementById(
        "highLow"
      ).innerText = `${response.main.temp_max}°C / ${response.main.temp_min}°C`;
      document.getElementById("pressure").innerText =
        response.main.pressure + " mb";
      document.getElementById("wind").innerText = response.wind.speed + "km/hr";
    })
    .catch((err) => {
      alert(err.message);
    });
};
