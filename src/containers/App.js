import React, { Component } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/Searchbox.js';
import {robots} from '../robots.js';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component{
    constructor(){
        super()
        this.state={
            robots:robots,
            searchfield:''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typecode.com/users')
        .then(response=> response.json())
        .then(users=>this.setState({robots:users}));
    }
    onSearchChange=(event)=>{
        this.setState({searchfield: event.target.value});
        console.log(event.target.value);
    }
    render(){
        const filteredRobots=this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        });
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                <CardList robots={filteredRobots}/>
                </ErrorBoundry>
                </Scroll>
        </div>
        );
    }
   
};
export default App;