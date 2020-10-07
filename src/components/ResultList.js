import React, { Component } from 'react';
import Result from './Result'
import ErrorCard from './ErrorCard'

// component displays cards, class component to handle touche events
class ResultList extends Component {
    state = {
        displayList: [],
        initialClientX: 0,
        finalClientX: 0,
    }

    // display function
    handleDisplay = () => {
        // condition in case connection with the API failed
        if (this.props.cities.length === 0) {
            return <ErrorCard error="loadError" current={this.props.current} />
        } else {

            // displaying the list of cards with weather info
            const cityList = this.props.cities.map((city, index) => {
                return (<Result currentCard={this.props.current} key={city.id} city={city} index={index} />)
            })

            // error card added to the display list in case the city entred to the form was not in the list
            return [<ErrorCard error="indexError" key="-1" current={this.props.current} />, ...cityList]
        };
    }

    // Touche event handler functions
    handleTouchStart = (event) => {
        this.setState({
            initialClientX: event.nativeEvent.touches[0].clientX
        });
    }

    handleTouchMove = (event) => {
        this.setState({
            finalClientX: event.nativeEvent.touches[0].clientX
        });
    }

    handleTouchEnd = () => {
        if (this.state.finalClientX < this.state.initialClientX) {
            this.props.swipeCity('left');
        } else if (this.state.finalClientX > this.state.initialClientX) {
            this.props.swipeCity('right');
        }

        this.setState({
            initialClientX: 0,
            finalClientX: 0
        });
    };

    render() {

        const { moveCity, current } = this.props;

        return (
            <section className="App__result-list">
                <div className={current === 19 ? "scroll left inactive" : "scroll left"} onClick={moveCity} ></div>
                <div className={current === 0 ? "scroll right inactive" : "scroll right"} onClick={moveCity}></div>
                <ul
                    className="result__wrapper"
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                >
                    {this.handleDisplay()}
                </ul>
            </section>
        );
    }
}

export default ResultList;
