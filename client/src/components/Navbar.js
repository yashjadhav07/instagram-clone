import React,{useContext} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import { ExploreIcon } from "./Icons";
import homelogo from "./imgs/home.png";
import pluslogo from "./imgs/plus.png";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';



const NavBar = ()=>{

     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
      return(
          <Navbar collapseOnSelect fixed='top' expands='sm' bg='light' variant='dark'>
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="container-fluid">
                { state ? (
                  <>
                  <Nav.Item className="mc-auto">
                    <Nav.Link as={Link} to={state ? "/myfollowingpost" : "/signin"}>
                      <img
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                        src={homelogo}
                        alt="homelogo"
                      />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Nav.Link as={Link} to="/create">
                      <img
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                        src={pluslogo}
                        alt="pluslogo"
                      />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Nav.Link as={Link} to="/"><ExploreIcon/></Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Nav.Link as={Link} to="/profile">
                      <img
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                        src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                        alt="profilelogo"
                      />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Button variant='outline-danger' onClick={()=>{
                             localStorage.clear()
                             dispatch({type:"CLEAR"})
                             history.push('/signin')
                           }}
                    >Logout</Button>
                  </Nav.Item>

              </>
            ) : (
              <>
              <Nav.Item>
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </Nav.Item>
              </>
            )
            }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

    )

}


export default NavBar
