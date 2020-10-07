import React from 'react';

// this is a single weather card component
const Result = (props) => {
    // handle wind direction and card background image, depangin on props
    const winddir = { transform: `rotate(${props.city.winddir - 45}deg)` }
    const cardImage = `city-card__content ${props.city.weather.toLowerCase()}`

    // card classes are important for display = the main one is current, the side ones are small-- and smaller--
    function generateCardClass(cardIndex) {
        if (cardIndex === props.currentCard) {
            return "city-card current"
        }
        else if (cardIndex === props.currentCard + 1) {
            return "city-card small--next"
        }
        else if (cardIndex === props.currentCard - 1) {
            return "city-card small--prev"
        }
        else if (cardIndex === props.currentCard + 2) {
            return "city-card smaller--next"
        }
        else if (cardIndex === props.currentCard - 2) {
            return "city-card smaller--prev"
        }
        else if (cardIndex <= props.currentCard - 2) {
            return "city-card hidden--prev"
        }
        else if (cardIndex >= props.currentCard + 2) {
            return "city-card hidden--next"
        }
    }

    return (
        <li className={generateCardClass(props.index)}>
            <div className={cardImage}>
                <div className="city-card__title">
                    <h1>{props.city.name}</h1>
                    <p>{props.city.weather}</p>
                </div>
                <p className="city-card__temp">{props.city.temperature} &#176;C</p>
                <div className="city-card__info">
                    <p>Pressure: {props.city.pressure} hPa</p>
                    <p className="city-card__wind">Wind:
                        <span className="city-card__wind_direction"><i className="fas fa-location-arrow" style={winddir}></i></span>
                        <span className="city-card__wind_speed">{props.city.windforce} km/h</span>
                    </p>

                </div>
            </div>
        </li>
    );
}

export default Result;