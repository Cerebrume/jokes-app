import React, { Component } from "react";
import axios from 'axios';
import Loading from './img/Loading_icon.gif';
import Categories from './components/Categories';
import Jokes from './components/Jokes';

class App extends Component {
	state =  {
		isLoading: true,
		categories: [],
		activeCategories: [],
		jokes: [],
		jokesToShow: 1
	}
	
	componentDidMount = () => {
		
		var categoriesAPI = "http://api.icndb.com/categories";

		axios.get(categoriesAPI).then(response => {
			if (response.data.type === "success") {
				var categories = response.data.value.map( (item, idx) => {
					return {
						id: idx,
						name: item,
						active: true
					}
				})
				this.setState({
					categories: categories,
					activeCategories: categories
				});
				this.loadJokes().then( (item) => {
					this.setState({
						jokes: item,
						isLoading: false,
						
					})
				});
			}
			else {
				this.setState({
					isLoading: true
				})
			}
		});
	};

	toggleCategory = (id) => {
		var activeCategories = this.state.categories.map( (item) => {
			if (item.id === id) {
				item.active = !item.active;
			}
			return item;
		});
		this.setState({
			activeCategories: activeCategories,
		});
		this.loadJokes().then( (item) => {
			this.setState({
				jokes: item,
				isLoading: false
			})
		});
	}

	loadJokes = (value = 1) => {
		var activeCategories = this.state.activeCategories.filter( (item) => {
			return item.active
		}).map( (item) => {
			return item.name + ''
		})
		var url = activeCategories.length !== 0 ? 'http://api.icndb.com/jokes/random?limitTo=[' + activeCategories +  ']' : 'http://api.icndb.com/jokes/random?';
		var count = this.state.jokesToShow;
		var jokes = [];

		for (let i = 0; i < count; i++) {
			jokes.push(axios.get(url));
		}
		
		return Promise.all(jokes)
			.then(response => {
				return response;
		});
	}

	showAll = () => {
		var activeAll = this.state.activeCategories.map( (item) => {
			if (!item.active) item.active = true;
			console.log(item)
			return item
		});
		this.setState({
			categories: activeAll,
			activeCategories: activeAll
		});
		this.loadJokes().then( (item) => {
			this.setState({
				jokes: item,
			})
		});
	}

	handleChangeNumber = (value) => {
		this.setState({
			jokesToShow: value
		}, () => {
			this.loadJokes(value).then( (item) => {
				this.setState({
					jokes: item,
				})
			});
		})
	}

	render() {
		if (this.state.isLoading) return (<img className="text-center" width="150" height="100" src={Loading} alt="Loading"/>)
		return (
			<div className="jumbotron jumbotron-fluid">
				<div className="container-fluid">
					<div className="row">
						<Categories showAll={this.showAll} handleToggle={this.toggleCategory} categories={this.state.categories}/>
						<Jokes jokes={this.state.jokes} handleChangeNumber={this.handleChangeNumber}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
