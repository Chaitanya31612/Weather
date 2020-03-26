window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e04ab1dd1b02ae82ebb8454a87f40cad/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    
                    temperatureDegree.textContent = Math.round(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    setIcon(icon, document.querySelector(".icon"));
            })
        })
    }

    const heading = document.querySelector(".temperature-degree");
    const unit = document.querySelector("span");
    heading.addEventListener("click", () => {
        if (unit.innerHTML === "F") {
            heading.textContent = Math.round((heading.innerHTML - 32) * (5 / 9));
            unit.innerHTML = "C";
        }
        else if (unit.innerHTML === "C"){
            heading.innerHTML = Math.round(heading.innerHTML*(9/5)+32) ;
            unit.innerHTML = "F";
        }
        
        
    })

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})