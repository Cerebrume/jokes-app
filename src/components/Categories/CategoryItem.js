import React, { Component } from 'react';

class CategoryItem extends Component {
    toggleState = () => {
        this.props.handleToggle(this.props.category.id);
    }

    render() { 
        return ( 
            <li className={"list-group-item list-group-item-action " + (this.props.category.active ? "active" : "text-secondary")} onClick={this.toggleState}>
                {this.props.category.name}
            </li>
         )
    }
}
 
export default CategoryItem;