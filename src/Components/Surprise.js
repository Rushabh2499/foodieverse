import React from 'react'
import { Container} from 'react-bootstrap';

export default function Surprise() {
  return (
      <>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'0 0 0 0'}}
        >
              <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
          <center><h4>BIG SURPRISE COMING SOON!</h4>
        </center>
        </div>
        </Container>
    </>
  );
}