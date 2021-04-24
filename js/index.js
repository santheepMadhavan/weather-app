const searchCity = (event) => {
  event.preventDefault();
  const value = document.getElementById("inputField").value;
  const API_KEY = "690579a54b13d363a6de030aa41f1683";

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${value}&id=524901&appid=${API_KEY}&units=metric`;
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
      document.getElementById("card").style.display = "inline-block";
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
    })
    .catch((err) => {
      alert(err.message);
    });
};
