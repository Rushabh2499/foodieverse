import React, { useState } from 'react'
import { Form, FormControl, Button, Container}  from 'react-bootstrap'
import { useHistory} from 'react-router-dom'
import SmallChips from './Chip'

export default function Search(){
  const [searchTerm,setSearchTerm] = useState('')
  const history = useHistory();
  const handleChange = (event)=>{
    setSearchTerm(event.target.value)
  }

  const handleClick = () =>{
    history.push({
      pathname: '/recipes',
      search : `${searchTerm}`});
  }

    return(
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{ padding:'0'}}
      >
           <div className="w-100" style={{maxWidth:"600px" , padding:"20px", }}>
        <Form inline class="form-center">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 inp" name="searchTerm" onChange={handleChange}/>
          <Button type="submit" variant="outline-success" onClick={handleClick}>Search</Button>
        </Form>
        </div>
        </Container>
        <SmallChips></SmallChips>
        </>
    )
}