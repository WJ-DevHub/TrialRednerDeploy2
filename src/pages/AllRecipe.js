import React from 'react';

export default function AllRecipe(props){

    return(
        <React.Fragment>
            <h1>All Recipes</h1>

            {props.recipes.map(eachRecipe => {
                return (<React.Fragment>
                    <div className='card' key={eachRecipe.id}>
                        <div className='card-body'>
                            <div className='card-title'>
                                {eachRecipe.title}
                            </div>
                            <ul>
                                {eachRecipe.ingredients.map((eachIngredient,index) => {
                                    return <li key={index}>{eachIngredient}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </React.Fragment>)
            })}
        </React.Fragment>
    )
}