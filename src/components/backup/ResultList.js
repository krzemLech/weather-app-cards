import React from 'react';
import Result from './Result'
import ErrorCard from './ErrorCard'

const ResultList = (props) => {
    let displayList;
    let initialClientX = 0;
    let finalClientX = 0;

    // condition in case connection with the API failed
    if (props.cities.length === 0) {
        console.log("worked")
        displayList = <ErrorCard error="loadError" current={props.current} />
    } else {

        // displaying the list of cards with weather info
        const cityList = props.cities.map((city, index) => {
            return (<Result currentCard={props.current} key={city.id} city={city} index={index} />)
        })

        // error card added to the display list in case the city entred to the form was not in the list
        displayList = [<ErrorCard error="indexError" key="-1" current={props.current} />, ...cityList]
    };

    console.log(props.current)
    console.log("length: " + (props.cities.length - 1))

    return (
        <section className="App__result-list">
            <div className={props.current === 19 ? "scroll left inactive" : "scroll left"} onClick={props.moveCity} ></div>
            <div className={props.current === 0 ? "scroll right inactive" : "scroll right"} onClick={props.moveCity}></div>
            <ul
                className="result__wrapper"
            // onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
            >
                {displayList}
            </ul>
        </section>
    );
}

export default ResultList
