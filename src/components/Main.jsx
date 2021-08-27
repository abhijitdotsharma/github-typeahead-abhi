import React, { useState, useEffect } from 'react';
import './Main.css'


function Main() {

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [countryExists, setCountryExists] = useState(true);


    //makes an api request on each key press(in the input field) with the input value
    useEffect(() => {
        if (input.length > 0) {
            
            fetch(`https://restcountries.eu/rest/v2/name/${input}`)
                .then((response) => response.json())
                .then(data => {
                    if (data.status && data.status === 404) {
                        setCountryExists(false)
                    }
                    else {
                        setCountryExists(true);
                        setSuggestions(data);
                    }
                })
                .catch((err) => console.log(err))
        }
    }, [input])


    const handleChange = (name) => {
        setInput(name)
    }

    const onSuggestionClick = (countryName) => {
        setInput(countryName)
    }

    const renderSomething = () => {
        //If input exists or user has typed something in the input field 
        if (input.length > 0) {
            //If user input has letters relevent to a country's name
            if (countryExists) {
                return (
                    <div className="suggestions-container" >
                        {
                            suggestions.map((suggestion, i) => {
                                return <a href="https://restcountries.eu/#rest-countries" target="_blank" className="single-country"
                                 key={i} onClick={() => onSuggestionClick(suggestion.name)} >{suggestion.name}</a>
      
                            })
                        }
                    </div>)
            }

            //else user has typed something which doesn't correspond to any country name
            else return <h1>Country Doesn't Exist 😟 </h1>
                
        }
    }

    return (
        <div className="Main" >
            <h1>your favourite country 🌎</h1>

            <form>
                <input value={input} className="input" type="text" onChange={(e) => handleChange(e.target.value)} />
            </form>

            {
                renderSomething()
            }

        </div>
    )
}

export default Main;





