import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import {Card, ListGroup, ListGroupItem, Row, Col} from "react-bootstrap"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FilledHeartIcon , HeartIcon , CommentIcon} from "./Icons";
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
    useEffect(()=>{
       fetch('/getsubpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[data])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return  (
       <div style={{paddingTop: "55px"}} className="home">
           {
               data.map(item=>{
                return(
                <Card className="home-card" key={item._id}>
                    <Card.Body style={{paddingTop: "0px", paddingLeft: "0px", paddingRight: "0px", paddingBottom: "0px"}}>
                      <Card.Header><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }><h6 style={{marginBottom: "0px"}}>{item.postedBy.name}</h6></Link>
                        {
                        item.postedBy._id === state._id && <i style={{
                            float:"right"
                        }}
                        onClick={()=>deletePost(item._id)
                        }
                        >delete</i>
                        }
                      </Card.Header>
                    </Card.Body>
                  <Card.Img variant="top" src={item.photo} />
                     <Card.Body style={{paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px"}}>
                       <Row>
                         <Col style={{ paddingLeft: "15px", paddingRight: "10px"}} sm={1}>
                           {
                           item.likes.includes(state._id)
                           ?

                            <i onClick={()=>{unlikePost(item._id)}}
                             ><FilledHeartIcon/></i>
                           :
                           <i onClick={()=>{likePost(item._id)}}
                           ><HeartIcon/></i>
                           }
                         </Col>
                         <Col style={{ paddingLeft: "5px"}} sm={11}>
                           <Card.Text>{item.likes.length}</Card.Text>
                         </Col>
                       </Row>
                     </Card.Body>
                   <Card.Body style={{paddingTop: "5px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px"}}>
                     <Card.Title>{item.title}</Card.Title>
                     <Card.Text>{item.body}</Card.Text>
                   </Card.Body>
                   <ListGroup className="list-group-flush">
                   {
                       item.comments.map(record=>{
                           return(
                           <ListGroupItem style={{paddingTop: "5px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px"}} key={record._id}>
                             <span style={{fontWeight:"500", marginRight: "5px"}}>{record.postedBy.name}</span>
                             {record.text}
                          </ListGroupItem>
                           )
                       })
                   }
                 </ListGroup>

                     <Card.Body style={{paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px"}}>
                       <form onSubmit={(e)=>{
                           e.preventDefault()
                           makeComment(e.target[0].value,item._id)
                       }}>
                        <Row>
                          <Col style={{paddingTop: "3px", paddingLeft: "15px", paddingRight: "12px"}} sm={1}>
                            <CommentIcon/>
                          </Col>
                          <Col style={{paddingLeft: "10px", paddingRight: "10px"}} sm={11}>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Add a comment"
                           />
                          </Col>
                        </Row>
                       </form>
                     </Card.Body>
                  </Card>
                )
            })
           }


       </div>
   )
}


export default Home
