import React from 'react'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/esm/Col';
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Row from 'react-bootstrap/esm/Row';
import {AiTwotoneHighlight} from 'react-icons/ai';
import {BsFacebook, BsInstagram} from 'react-icons/bs';
import {BiSmile} from 'react-icons/bi';
import {FaImage} from 'react-icons/fa';
import {AiOutlineFolder} from 'react-icons/ai';
import {AiOutlineGif} from 'react-icons/ai';
import {BsClock} from 'react-icons/bs';
import {AiFillCaretDown} from 'react-icons/ai';


function SinglePost() {
  return (
    <div>   
        <Container> 
            <from>
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
                        <textarea rows="5" className="new_textarea form-control" ></textarea>      
                        </Col>   
                        <Col sm={12} >
                           <div className="d-flex justify-content-between border new_border-color my-3 p-2"  >
                                <div>
                                        <ul className="mb-0">
                                            <li className="d-inline-block px-2"><BiSmile/> </li>
                                            <li className="d-inline-block px-2"><FaImage/> </li>
                                            <li className="d-inline-block px-2"><AiOutlineFolder/> </li>
                                            <li className="d-inline-block px-2"><AiOutlineGif/> </li>
                                        </ul>
                                </div>
                                <div>
                                    <ul className="mb-0">
                                        <li className="d-inline-block px-2"><BsClock/> </li>
                                        <li className="d-inline-block"><p className="mb-0">Today 12:00 </p> </li>
                                    </ul>
                                </div>  
                                
                            </div> 
                            <div className="text-end">
                                    <button class="bg-black btn text-white">
                                        Publish <AiFillCaretDown/>
                                    </button>
                                </div>
                        </Col>   
                    </Row>
                   
                </div>
            </from>
        </Container>
        
    </div>
    )
}

export default SinglePost