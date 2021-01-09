class Weather {
  constructor(city, country){
    this.apiKey = "179fded1360fc97ce660d42f4b3c37d4";
    this.units = "metric";
    this.city = city;
    this.country = country;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.apiKey}&units=${this.units}`);
        

    const responseData = await response.json();

    return responseData;
  }

  //change location
  changeLocation(city, country) {
    this.city = city
    this.country = country
  }
}