import React, { useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'
import ErrorBoundary from '../components/ErrorBoundary'


function App() {

    //Setting the state with useState Hook
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    //Fetches API and updates the users
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
           .then(response => response.json())
           .then(users => {
               setRobots(users)
        })
    }, []) //Adding [] is a shortcut for using componentDidMount

    //everytime the search changes trigger an event
    const onSearchChange = (event)  => {
        setSearchfield(event.target.value)
    }

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
        
    //if no robots, say 'Loading', else return content
    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filterRobots} />
                    </ErrorBoundary> 
                </Scroll>   
            </div>
        );    
}

export default App;