import React from 'react';

// component displays an icon at the top, depending on the weather in the selected city
const WeatherIcon = (props) => {
    let iconDisplayed = <i className="fas fa-cloud-sun fa-3x weather-icon"></i>;
    const selectedCity = props.cities[props.selection]
    if (selectedCity) {
        switch (selectedCity.weather) {
            case "Clear":
                iconDisplayed = <i className="fas fa-sun fa-3x weather-icon"></i>;
                break;
            case "Clouds":
                iconDisplayed = <i className="fas fa-cloud fa-3x weather-icon"></i>;
                break;
            case "Mist":
                iconDisplayed = <i className="fas fa-smog fa-3x weather-icon"></i>;
                break;
            case "Rain":
                iconDisplayed = <i className="fas fa-cloud-showers-heavy fa-3x weather-icon"></i>;
                break;
            default:
                iconDisplayed = <i className="fas fa-cloud-sun fa-3x weather-icon"></i>
        }
    }
    return (
        <div className="weather-icon__wrapper">{iconDisplayed}</div>
    );
}

export default WeatherIcon;