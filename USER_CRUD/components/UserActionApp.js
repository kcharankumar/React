import React, {Component}  from 'react';

import {Container, Button} from 'react-bootstrap';
import UserList from './UserList';
import UserService from '../services/UserService';
import AddUser from './AddUser';


class UserActionApp extends Component
{
    constructor (props)
    {
        super (props);

        this.state ={
           isAddUser : false,
           error:null,           
           response:{},
           isEditUser:false,
           isUserDetails:true,
           userData:null
        }

        this.onFormSubmit = this.onFormSubmit.bind (this)
    }

    onCreate()
    {
      // alert ("In OnCreate()...");
       this.setState ({userData:null});
        this.setState ({isAddUser : true,isUserDetails:false });
    }

    onDetails()
    {
        this.setState ({isAddUser : false, isUserDetails:true });
    }

 

    onFormSubmit (data)
    {
        //alert ("Inside UserActionApp :: OnFormSubmit...");
          this.setState({isAddUser:true, isUserDetails:false});
      
         //alert (this.state.isEditUser);
        if (this.state.isEditUser)
        {
            UserService.updateUserDetails(data).then (result => {
                // alert (result.data);
                this.setState ({response:result, isAddUser:false, isEditUser:false, isUserDetails:true})
            });
        }
        else{
               UserService.InsertUserDetails (data).then (result => {
               // alert (result.data);
               this.setState ({response:result, isAddUser:false, isEditUser:false, isUserDetails:true}) 
            });
        }

    }

   
    editUser = userId => {
      this.setState({isUserDetails:false});
     // alert ("Inside editUser() "+userId);

      UserService.GetUserDetailsById(userId).then (result => {
         //alert ("UserActionApp::editUser()"+result.data);
        this.setState ({userData:result.data, isAddUser:true, isEditUser:true,isUserDetails:false}); 
      })
    }
     

    render()
    {
        let userForm;
        if (this.state.isAddUser || this.state.isEditUser)
        { 
          // alert ("addUser: " + this.state.isAddUser + " Edit User: "+ this.state.isEditUser);
            userForm = <AddUser onFormSubmit={this.onFormSubmit} user={this.state.userData} />
        }

        return(
          <div>
            <Container>
              <h1 style={{textAlign:'center'}}>CRUD Operations in REACT </h1>
              <hr/>
              {!this.state.isUserDetails && <Button variant="primary" onClick={() => this.onDetails()}>User Details </Button>}
              {!this.state.isAddUser && <Button variant="primary" onClick={() => this.onCreate()}> Add user </Button>} <br/>
              {!this.state.isAddUser &&  <UserList editUser={this.editUser} />}
               {userForm}
            </Container>
          </div>


        )
         
    }
    
}

export default UserActionApp;
