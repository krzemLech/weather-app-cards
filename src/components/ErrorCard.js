import React from 'react';

// error card is displayed in case of problems with API or incorrect data in form
const ErrorCard = (props) => {
    let cardClass;
    let contentClass = "city-card__content error-index"
    let message = "No such city in the database"
    let icon = <i className="fas fa-exclamation-circle fa-4x"></i>
    if (props.error === "loadError") {
        cardClass = `city-card error-load current`
        contentClass = "city-card__content error-load"
        message = "Connecting to the Database"
        icon = <i className="fab fa-cloudscale fa-4x"></i>
    } else if (props.error === "indexError" && props.current === -1) {
        cardClass = `city-card current`
    } else {
        cardClass = `city-card hidden--prev`
    }

    return (
        <li className={cardClass}>
            <div className={contentClass}>
                <p>{message}</p>
                <p>{icon}</p>
            </div>
        </li>
    );
}

export default ErrorCard;