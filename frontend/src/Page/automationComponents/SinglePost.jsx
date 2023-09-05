import React from 'react'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/esm/Col';
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Row from 'react-bootstrap/esm/Row';
import {AiTwotoneHighlight} from 'react-icons/ai';
import {BsInstagram} from 'react-icons/bs';
import {BsFacebook} from 'react-icons/bs';

function SinglePost() {
  return (
    <div>   
        <Container> 
                <h2> < AiTwotoneHighlight size={20}/> Create Post</h2>
                <div className="">
                    <Row>
                        <Col sm={6} >
                            <div className="  ">
                                <ul >
                                    <li className="d-inline-block px-2"><p>Sharing to</p> </li>
                                    <li className="d-inline-block px-2 " ><BsFacebook size={35}/>
                                    </li>
                                    <li className="d-inline-block px-2"><BsInstagram size={35}/>
                                    </li>
                                </ul>
                            </div>
                        </Col>    
                        <Col  sm={6}>
                            <div className="new_select" >
                                <FormSelect>
                                    <option>Open this select menu</option>
                                    <option >One</option>
                                    <option >Two</option>
                                    <option >Three</option>
                                </FormSelect>
                            </div>
                        </Col>
                        <Col sm={12}>
                                <textarea rows="5" className="new_textarea" ></textarea>    
                        </Col>      
                    </Row>
                   
                </div>
        </Container>
    </div>
    )
}

export default SinglePost