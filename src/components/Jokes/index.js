import React, { Component } from 'react';
class Jokes extends Component {
	changeJokesNumber = (e) => {
		var value = e.target.value;

		if (value >= 1 && value <= 10) this.props.handleChangeNumber(value);
	}
	render() {
		return (
			<div className="col-md-10">
				<label>Number of jokes to show: </label>
				<input type="text" onChange={this.changeJokesNumber}/>
				<div>
					{this.props.jokes.map( (joke, idx) => {
						return (<div className="p-3 mb-2 bg-light">
									<p>Category: {joke.data.value.categories}</p>
									<p className="lead" key={idx}>{joke.data.value.joke}</p>
								</div>)
					})}
				</div>
			</div>
		);
	}
}
 
export default Jokes;