window.addEventListener('load', ()=>{
    let longtitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSelection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
            (position =>{
                console.log(position);
                longtitude = position.coords.longitude;
                latitude = position.coords.latitude;
                
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = '${proxy}https://api.darksky.net/forecast/0d1f8ca635a3a2768ddaffea27e506e3/${latitude},${longtitude}';

                fetch(api)
                .then(response => {
                return response.json();
                })
                .then(data => {
                    console.log(response);
                    const {temperature, summary } = data.currently;
                    //set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                        //Formula for Celsius
                        let celsius = (temperature - 32) * (5 / 9);
                        //Set Icon
                        setIcons(icon, document.querySelector("icon"))

                        //Change Temperature to Celsius/Farenheight with click event
                            temperatureSelection.addEventListener('click', () =>{
                                if(temperatureSpan.textContent === 'F'){
                                    temperatureSpan.textContent = 'C';
                                    temperatureDegree = Math.floor(celsius);
                                }
                                else {
                                    temperatureSpan.textContent = 'F';
                                    temperature.textContent = temperature;
                                }
                            })
                })
            })
        
    }       

    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        //will look for every line and replace it with an underscore
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});
