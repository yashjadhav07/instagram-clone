import React,{useContext,useState,useEffect} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import { ExploreIcon } from "./Icons";
import homelogo from "./imgs/home.png";
import pluslogo from "./imgs/plus.png";
import { Navbar, Nav, Container, Button, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';



const NavBar = ()=>{
     const [query,setQuery] = useState("")
     const [ans,setAns] = useState([])

     const {state,dispatch} = useContext(UserContext)
     useEffect(()=>{
         var temp_q = query
         if(temp_q==="") temp_q="-"
         fetch('/search-users',{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 query:temp_q
             })
         }).then(res=>res.json())
         .then(result=>{
           setAns(result.user)
           console.log(result)
         }).catch(err=>{
             console.log(err)
         })
       },[query])
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
                    <Row>
                      <Col style={{paddingRight: "0px"}} sm={8}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Email"
                          value={query}
                          onChange={(e)=>setQuery(e.target.value)}
                        />
                      </Col>
                      <Col style={{paddingLeft: "5px"}} sm={4}>
                        <DropdownButton id="dropdown-basic-button" title="Search">
                        {
                          ans.map(item=>{
                           return(
                             <Dropdown.Item><Link to={item._id !== state._id?"/profile/"+item._id :"/profile" }>
                               {item.email}</Link></Dropdown.Item>
                           )
                         }
                         )
                        }
                        </DropdownButton>
                      </Col>
                    </Row>


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
