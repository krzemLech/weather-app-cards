import React from 'react';

// component collects input for sorting and filtering the weather cards
const Form = (props) => {
    return (
        <section className="form__wrapper">
            {/* Fieldsets used for flexbox */}
            <fieldset>
                <label htmlFor="cityName">Enter city name: </label>
                <span className="input__wrapper"><input
                    id="cityName"
                    type="text"
                    onChange={props.change}
                /></span>
            </fieldset>
            <fieldset>
                <label htmlFor="filterCities">Filter cities by: </label>
                <span className="input__wrapper"><select name="city-sort" id="filterCities" onChange={props.citySort}>
                    <option value="name">Name</option>
                    <option value="temperature">Temperature</option>
                    <option value="windforce">Wind</option>
                </select></span>
            </fieldset>
        </section>
    );
}

export default Form;