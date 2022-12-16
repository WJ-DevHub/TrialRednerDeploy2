import React from 'react';
import AllRecipe from './pages/AllRecipe.js';
import AddNew from './pages/AddNew.js';
import axios from 'axios';


export default class RecipeBook extends React.Component {
    
    state = {
        page : 'list',
        data : [

        ],
        newTitle:"",
        newIngredients:""
    };
    
    BASE_API_URL = "https://trial-deployment.onrender.com";

    async componentDidMount(){
      console.log(`ComponentDidMount`);
      const response = await axios.get(`${this.BASE_API_URL}/recipes`);
      console.log(response.data);
      this.setState({
        data: response.data
      })
    }

    renderPage () {
        if (this.state.page === 'list') {
            return <AllRecipe recipes={this.state.data} />
        } else if (this.state.page === 'add') {
            return <React.Fragment>
            <AddNew 
            onUpdateFormField={this.updateFormField}
            newTitle={this.state.newTitle}
            newIngredients={this.state.newIngredients}
            onAddNew={this.addNew}
                    />
                  </React.Fragment>
        }
    };

    addNew = async () => {
      console.log(`Add New Recipe`);
      //base temp recipe
      const newRecipe = {
          //_id: Math.round(Math.random()* 10000 + 1), //let mongodb give an id
          title: this.state.newTitle,
          ingredients: this.state.newIngredients.split(",")//split based a comma and insert into an array
      }
  
      const response = await axios.post(this.BASE_API_URL + "/recipes", newRecipe);
      newRecipe._id = response.data.insertedId;
      
      this.setState({
          data: [...this.state.data, newRecipe],
          page: "list",
          newTitle: "",
          newIngredients: "",
      })
      console.log(`New Recipe Added: ${response.data.insertedId}`);
  
  
    }
  

    switchPage = (page) => {
        this.setState({
            page: page
        })
    };

    updateFormField = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    fetchData = async () => {
      let response = await axios.get(this.url + "recipes");
      this.setState({
        data: response.data
      });
   };

    render () {
        return(
            <React.Fragment>
                <h1>Recipe Book</h1>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Menu</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" onClick={() => this.switchPage('list')}>All Recipes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => this.switchPage('add')}>Add New</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div>{this.renderPage()}</div>
            </React.Fragment>
        )
    }

}