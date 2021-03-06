import React, {Component} from 'react';
import TutorialDataService from "../services/tutorial.service";
import Tutorials from '../Entity/Tutorials';

export default class Tutorial extends Component
{
    constructor (props)
    {
        super (props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind (this);
        this.getTutorial = this.getTutorial.bind (this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind (this);
        this.deleteTutorial = this.deleteTutorial.bind (this);

      //  this.state = { currentTutorial:{id:null, title:"", description:"", published:false}, message:""};
        this.state = ({currentTutorial:new Tutorials(0,"","",false,false)});
    }

    componentDidMount()
    {
        this.getTutorial (this.props.match.params.id);
    }

    onChangeTitle(e)
    {
        const title= e.target.value;

        this.setState (function (prevState)
        {
           return {
            currentTutorial : {...prevState.currentTutorial, title:title}};

        });
    }

    onChangeDescription(e)
    {
        
        var description1 = e.target.value;

        this.setState ( (prevState) => (
        {            
            currentTutorial : {...prevState.currentTutorial, description:description1} 
        })); 
    }


    getTutorial(id)
    {
        TutorialDataService.getByID (id).then (response => 
            {
                this.setState({currentTutorial: response.data});  
                console.log (response.data);
            })  
            .catch (e => {console.log (e);});
    }


    updatePublished(status)
    {
       var data = {
        id:this.state.currentTutorial.id,
        title:this.state.currentTutorial.title,
        description:this.state.currentTutorial.description,
        published:status 
       };

       TutorialDataService.update (this.state.currentTutorial.id, data).then (response => 
        {
            this.setState(prevState => ({
                currentTutorial: {...prevState.currentTutorial, published:response.data.published}
            }));  
            console.log (response.data);
        })  
        .catch (e => {console.log (e);});
    }

    updateTutorial()
    {
       
        TutorialDataService.update (this.state.currentTutorial.id, this.state.currentTutorial).then (response => 
            {
                console.log (response.data);
                this.setState({message: "The tutorial was updated successfully"});  
               
            })  
            .catch (e => {console.log (e);});
    }

    deleteTutorial()
    {
     
        TutorialDataService.delete (this.state.currentTutorial.id).then (response => 
            {
                console.log (response.data);
                if (console.data == "success")
                  alert ("Deleted successfully");
                this.props.history.push ('/tutorials')  
               
            })  
            .catch (e => {console.log (e);});
    }
    
    render()
    {
       return(
        <div>
           {this.state.currentTutorial ? (
               <div className="edit-form">
                   <h4> Tutorial </h4>
                   <form>
                     <div className="form-group">
                       <label htmlFor="title">Title</label>
                       <input type="text" className="form-control" id="title" value={this.state.currentTutorial.title} onChange={this.onChangeTitle}/>
                     </div>

                     <div className="form-group">
                       <label htmlFor="description">Description</label>
                       <input type="text" className="form-control" id="description" value={this.state.currentTutorial.description} onChange={this.onChangeDescription}/>
                     </div>

                     <div className="form-group">
                       <label><strong>Status:</strong></label>
                       {this.state.currentTutorial.published?"Published":"Pending"}
                     </div> 
                   </form>

                   {this.state.currentTutorial.published ? (
                       <button className="badge badge-primary mr2" onClick={() => this.updatePublished(false)}>Unpublish</button>)
                     : (<button className="badge badge-primary mr2" onClick={() => this.updatePublished(true)}>Publish</button> )}
                   
                     <button className="badge badge-primary mr2" onClick={this.deleteTutorial}>Delete</button>
                     <button type="submit" className="badge badge-primary mr2" onClick={this.updateTutorial}>Update</button>
                     <p>{this.state.mesage}</p>
                     </div>)
                     : (
                         <div>
                             <br/>
                             <p>Please click on a Tutorial </p>
                         </div>
                     )}
                 </div>  
       );


    }


}
