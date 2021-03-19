import React,{useRef, useState} from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';


export default function SignUp (){
    const emailRef = useRef();
    const passwordRef = useRef();
    const displayNameRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    
    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== 
            confirmPasswordRef.current.value){
            return setError("Passwords do not match");
        }

        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value);
            alert("Email verification mail sent.");
            history.push('/')
        }catch(error){
            setError(error.message);
        }
        
        setLoading(false);
    }

    return(
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="displayName ">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={displayNameRef} required/>
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>

                    <Form.Group id="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={confirmPasswordRef} required/>
                    </Form.Group>

                    <Button disabled={loading} className="w-100" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
        </div>
        
        </>
    );
}