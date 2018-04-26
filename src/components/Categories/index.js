import React, { Component } from "react";
import CategoryItem from './CategoryItem';

class Categories extends Component {
	render() { 
		return (
			<div className="col-md-2 sidebar">
				<h2>Categories</h2>
				<button className="btn btn-outline-secondary" onClick={() => this.props.showAll()}>Show all</button>
				<ul className="list-group flex-column">
					{this.props.categories.map( (category) => {
						return <CategoryItem handleToggle={this.props.handleToggle} key={category.id} category={category}/>
					})}
				</ul>
			</div>
		 )
	}
}
 
export default Categories;