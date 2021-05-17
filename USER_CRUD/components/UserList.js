import React, {Componet} from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';
import UserService from '../services/UserService';

class UserList extends React.Component
{
   constructor(props)   
   {
       super (props);

       this.state = {error:null, users:[], response:{}}

       this.deleteUser = this.deleteUser.bind (this)
   }

   componentDidMount()
   {
      UserService.getAllUsers().then (res =>
        {
           this.setState ({users: res.data});
           console.log ("List of users obtained : "+res.data);
        //   alert ("Data obtained in UserList::getAllUsers().."+res.data);
        },
        (error) => {alert ("UserList::componentDidMount()..Error"+ error); this.setState({error}); } 
        )    
   }

  
   deleteUser (userId)
   {
      // alert ("DeleteUser "+userId);
       UserService.deleteUser(userId).then (res =>
        {
            this.setState({response:res.data, users:this.state.users.filter (user => user.userId !== userId)});
        },
        (error) => {this.setState({error}); }  
        )
        
   }
    

   render()
   {
      const {error, users}=this.state;

      if (error)
      {
          return (
           <div> Error : {error.message}</div>  

          );
      }
      else{
        return(
            //Change btn-primary and see the result.
           <div>
            <table className="btn btn-primary">
                <thead>
                    <tr>
                       <th> First Name </th>
                       <th> Last Name </th>
                       <th> Email ID </th>
                       <th> Phone Number </th>
                       <th> Address </th>
                       <th> Pincode </th>
                       <th> Action </th> 
                    </tr>
                </thead>
                <tbody>
                {
                    users.map (user => 
                    ( 
                       <tr key={user.userId}>
                         <td> {user.firstName}</td> 
                         <td> {user.lastName}</td>
                         <td> {user.emailId}</td>
                         <td> {user.phoneNumber}</td>
                         <td> {user.address}</td>
                         <td> {user.pinCode}</td>
                         <td> 
                                                     
                           <Button type="button" variant="info"   onClick={ () => this.props.editUser (user.userId)}>Edit </Button> 
                           <Button type="button" variant="danger" onClick={ () => this.deleteUser(user.userId)}>Delete </Button>
                         </td> 
                       </tr>

                    ))} 
                </tbody> 
                </table>  
           </div> 
          )
       
   }
   }

}

export default UserList