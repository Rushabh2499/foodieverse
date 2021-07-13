import React,{useState} from 'react'
import { Form , Container, Row, Col , Image, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FormControl } from 'react-bootstrap';
import { approveRecipe , rejectRecipe} from '../api';
import {useAuth} from '../Contexts/AuthContext'

export function UserRecipe(props){

    const recipe = props.location.state.recipe;
    const method = recipe.instructions;
    const ingred = recipe.ingredients.split('$');
    const [show, setShow] = useState(false);
    const [comment,setComment] = useState('');
    const history = useHistory();
    const {currentUser} = useAuth();

    const handleApproval = async() =>{
        const res = await approveRecipe(recipe);
        if(res)
            alert('Recipe approved successfully')
        else 
            alert('Recipe approval unsuccessful. Try again later.')
        
       history.push('/admin-route');
    }

    const showCommentBox = () =>{
        setShow(true);
    }

    const handleComment = (event) =>{
        setComment(event.target.value);
    }

    const handleRejection = async() =>{
        const res = await rejectRecipe(recipe,comment);
        if(res)
            alert('Recipe rejected successfully')
        else 
            alert('Recipe rejection unsuccessful. Try again later.')
        
        history.push('/admin-route');
    }

    return(
        <Container>
            <Row>
                <Col>
                    <Form.Group>
                            <Image src={recipe.image}
                            thumbnail
                            className="h-50 w-25" 
                            alt="Recipe img"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Recipe Title</Form.Label>
                            <Form.Control type="text" placeholder={recipe.recipeTitle} readOnly /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cook Time</Form.Label>
                            <Form.Control type="text" placeholder={recipe.cookTime} readOnly /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Servings</Form.Label>
                            <Form.Control type="text" placeholder={recipe.servings} readOnly /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ingredients</Form.Label>
                                {ingred.map(i => 
                                <Form.Control type="text" placeholder={i} readOnly />  
                                )
                                }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Instructions</Form.Label>
                            <ol>{method.map(m =>
                                <Form.Control type="text" placeholder={m} readOnly /> 
                            )}               
                            </ol>
                    </Form.Group>
                </Col>
            </Row>
            { currentUser.email === process.env.REACT_APP_ADMIN1 ||currentUser.email === process.env.REACT_APP_ADMIN2 
        ||currentUser.email === process.env.REACT_APP_ADMIN3 ||currentUser.email === process.env.REACT_APP_ADMIN4 ?          
    <Row>
                <Col>
                <Button variant="outline-success" className="mr-3" onClick={handleApproval}>Approve Recipe</Button>
                <Button variant="outline-danger" onClick={showCommentBox}>Reject Recipe</Button>

                {show?
            <div className="mt-3">
                <FormControl as="textarea" placeholder="Enter a comment for user" onChange={handleComment} name="comment" />
                <Button variant="outline-primary" className="mt-3" onClick={handleRejection}>Confirm Rejection</Button>
            </div>
            :
            <></>     
             }          
                </Col>
            </Row>
            :
            <></>
    
    }
            
        </Container>

    );
}