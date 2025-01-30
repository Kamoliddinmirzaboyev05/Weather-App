const loaderBack = document.querySelector(".loader-back-img");
const loader = document.querySelector(".loader-back");

document.addEventListener("DOMContentLoaded", () => {
  // display loader function
  setTimeout(() => {
    loader.style.opacity = "0";
    loaderBack.style.opacity = "0";
    setTimeout(() => {
      loaderBack.classList.add("hidden");
      loader.classList.add("hidden");
    }, 100);
  }, 2000);

  // call html objects
  
  const weatherData = document.querySelector(".weather-data");
  const weatherImg = document.querySelector(".weather-img");
  const input = document.querySelector(".input");
  const city = document.querySelector(".city");
  const country = document.querySelector(".country");
  let cityName;
  const searchBtn = document.querySelector(".searchBtn");
  const location = document.querySelector(".location");

  // Getdata function

  const getData = async (link) => {
    const req = await fetch(link);
    const data = await req.json();
    writeData(data);
    console.log(data);
  };

  //   write data function
  cityName = input.value != "" ? input.value : "Fergana";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=757e304139ffd85c9da4f3578d87c519`;
  getData(apiLink);

  // search cty function
  searchBtn.addEventListener("click", () => {
    loaderBack.classList.remove("hidden");
    loader.classList.remove("hidden");
    loader.style.opacity = "1";
    loaderBack.style.opacity = "1";
    setTimeout(() => {
      loaderBack.classList.add("hidden");
      loader.classList.add("hidden");
    }, 1000);
    cityName = input.value != "" ? input.value : "Fergana";
    apiLink = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=757e304139ffd85c9da4f3578d87c519`;
    getData(apiLink);
  });
  input.addEventListener("input", () => {});

  // write data function

  const writeData = (DB) => {
    city.textContent = DB.name;
    country.textContent = DB.sys.country;

    weatherData.innerHTML = `
   
            <h2 class="descr">${DB.weather[0].description}</h2>
            <div class="row">
              <p class="key">Feels like :</p>
              <p class="value">${DB.main.feels_like} °</p>
            </div>
            <div class="row">
              <p class="key">Temperature :</p>
              <p class="value">${DB.main.temp} °</p>
            </div>
            <div class="row">
              <p class="key">Humidity :</p>
              <p class="value">${DB.main.humidity} %</p>
            </div>
            <div class="row">
              <p class="key">Pressure  :</p>
              <p class="value">${DB.main.pressure} hPa</p>
            </div>
            <div class="row">
              <p class="key">Wind :</p>
              <p class="value">${DB.wind.speed} m/s</p>
            </div>
    `;
    let img = `https://openweathermap.org/img/wn/${DB.weather[0].icon}@4x.png`;
    console.log(img);

    weatherImg.innerHTML = `
    <img src="${img}" alt="cloud" />
    `;
  };
}); // DOMContentDownloaded
