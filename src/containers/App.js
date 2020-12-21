import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'
import ErrorBoundary from '../components/ErrorBoundary'


class App extends Component {
    //Constructor holds the state
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    //Lifecycle hook w/ React
    //Fetches API and updates the users
    componentDidMount() {
       fetch('https://jsonplaceholder.typicode.com/users')
       .then(response => response.json())
       .then(users => {
           this.setState({robots: users})
       })
    }

    //everytime the search changes trigger an event
    onSearchChange = (event)  => {
        this.setState({searchfield: event.target.value})
    }


    render() {
        const {robots, searchfield} = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        
        //if no robots, say 'Loading', else return content
        return !robots.length ?
           <h1>Loading</h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filterRobots} />
                        </ErrorBoundary> 
                    </Scroll>
                    
                </div>
            );
        
    }
}

export default App;