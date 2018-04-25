import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    componentDidMount = () => {
        var categories = 'http://api.icndb.com/categories';

        axios.get(categories)
            .then((response) => {
                if (response.data.type === 'success') {
                    this.setState({
                        categories: response.data.value
                    });
                }
            });

    }
  render() {
    return (
      <div className="App">
          <div className="jokesCategories">
              <ul>
                  {this.state.categories.map((category) => <li>{}</li>)}
              </ul>
          </div>
          <div className="randomJokes">

          </div>
      </div>
    );
  }
}

export default App;
