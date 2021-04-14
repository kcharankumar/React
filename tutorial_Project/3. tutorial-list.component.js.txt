import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service"
import {Link} from "react-router-dom";
import Tutorials from '../Entity/Tutorials'

export default class TutorialList extends Component{


   constructor(props)
   {
       super (props);
       this.onChangeSearchTitle = this.onChangeSearchTitle.bind (this);
       this.retrieveTutorials = this.retrieveTutorials.bind (this);
       this.refreshList = this.refreshList.bind (this);
       this.setActiveTutorial = this.setActiveTutorial.bind (this);
       this.removeAllTutorials = this.removeAllTutorials.bind (this);
       this.searchTitle = this.searchTitle.bind (this);

       this.state = {tutorials:[], currentIndex:-1, searchTitleString:""};
       this.state = ({currentTutorial:new Tutorials(0,"","",false,false)});
   }

   componentDidMount()
   {
       this.retrieveTutorials();
   }

   onChangeSearchTitle(e)
   {
     if (e.target.value != undefined)  
     {
        var serachTitle1 = e.target.value; 
    
        this.setState({searchTitleString:serachTitle1});
       // alert (this.state.serachTitle);
    }
   }

   retrieveTutorials()
   {
     
       TutorialDataService.getAll ().then (response => 
           {
               this.setState({tutorials: response.data});  
               console.log (response.data);
           })  
           .catch (e => {console.log (e);});
   }

   refreshList()
   {
       this.retrieveTutorials();
       this.state = {currentTutorial:null, currentIndex:-1};
   }

   setActiveTutorial(tutorial, index)
   {
    //alert ("setActiveTutorial"+tutorial);
    
      this.state = {currentIndex:index};
      this.setState (prevState => ({         //This is how you change the state object.
        currentTutorial: {
            ...prevState.currentTutorial,   //Create the object currentTutorial and keep the previous state like this only and change only the requried attributes of the object.
            id:tutorial.id,                 //in this case we are changing all the attributes of currentTutorial
            title:tutorial.title,
            description:tutorial.description,
            submitted:tutorial.submitted,
            published:tutorial.published
        }  
      }));
  
   }


   removeAllTutorials()
   {
      TutorialDataService.deleteAll ().then (response => 
           { 
                 console.log (response.data);
                 this.refreshList();
           })  
           .catch (e => {console.log (e);});
   }

   searchTitle()
   {
      // alert ("Before sending for query..."+this.state.searchTitleString);
       TutorialDataService.findByTitle(this.state.searchTitleString).then (response => 
           {
               this.setState({tutorials: response.data});  
               console.log (response.data);
           })  
           .catch (e => {console.log (e);});
   }

   render()
   {
      const {searchTitleString, tutorials, currentTutorial, currentIndex} = this.state;

      return (
         <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                 <input type="text" className="form-control" placeholder="Serach by Title"
                       value={this.state.serachTitle} onChange={this.onChangeSearchTitle} />

                 <div className="input-group-append">
                   <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}>Search</button>
                 </div>
              </div>
            </div>

            <div className="col-md-6">
              <h4> Tutorials List </h4>

              <ul className="list-group">
                {tutorials && tutorials.map((tutorial,index) => (
                  <li className={"list-group-item"+ (index == currentIndex ?"active":"")}
                    onClick={() => this.setActiveTutorial(tutorial,index)}
                    key={index}> {tutorial.title} </li>
                ))}
              </ul>

              <button className="m-3 btn btn-sm- btn-danger" onClick={this.removeAllTutorials}>Remove All </button>
              </div>

              <div className="col-md-6">
                  {currentTutorial ? (
                    <div>
                       <h4>Tutorial </h4> 
                       <div> <label><strong>Title:</strong></label> {" "} {currentTutorial.title} </div>
                       <div> <label><strong>Description:</strong></label> {" "} {currentTutorial.description} </div>
                       <div> <label><strong>Status:</strong></label> {" "} {currentTutorial.published?"Published":"Pending"} </div>

                       <Link to={"/UpdateDeleteTutorials/"+currentTutorial.id} className="badge badge-warning">Edit</Link>
                       </div>) : (<div> <br/> <p>Pleas click on a tutorial </p> </div> 

                  )}  

              </div>


            </div> 
      );

   }


}