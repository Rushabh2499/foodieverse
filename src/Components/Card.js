import React from 'react'
import './Card.scss'
import ShareIcon from '@material-ui/icons/Share';
import {IconButton} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import {Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {FavoriteManager} from './FavoriteManager'
import MealHandler from './MealHandler';


export default function Card(props) {


    return (
        <div className="card">
          {/*error && <Alert variant="danger">{error}</Alert>*/}
            <div className="card__body">
                <img src={props.img}
                alt="Recipe img"
                className="card__image"/>
                <h4 className="card__title">{props.title}</h4>
                <p className="card__description">{props.servings}</p>
                <CardActions disableSpacing>
                <FavoriteManager
                      id={props.id}
                      isMyFav={props.isMyFav}
                      changed={props.changed}
                      setChanged={props.setChanged}
                />  
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      <MealHandler
      id={props.id}
      title={props.title}
      />
        
        <Link to={{ pathname:`/full-recipe/${props.id}`,
                    state:{
                      id:props.id,
                      title:props.title,
                      instructions:props.instructions,
                      ingredients:props.ingredients,
                      img:props.img,
                      servings:props.servings
                      
                    }     
                      
                    }}>
  
        <Button variant="outline-danger" className="btn btn-md m-2">
          View Recipe
          </Button>
        </Link>
      </CardActions>
      
        </div>
        </div>
    )
}
