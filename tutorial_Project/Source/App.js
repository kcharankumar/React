import React, {Component} from 'react'
import {Link} from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TutorialList from './components/tutorial-list.component'
import AddTutorial from './components/add-tutorial.component'
import Tutorial from './components/tutorial.component'
import './App.css';



class App extends Component
{
   render()
   {
      return (
        <div>
           <Router> 
          <nav className="navbar navbar-expand navbar-dark bg-dark">
          
             <a href="/tutorials" className="navbar-brand"> bezkoder</a>            
             <div className="navbar-nav mr-auto">
               <li className="nav-item"> <Link to={"/tutorials"} className="nav-link"> Tutorials</Link>  </li>
               <li className="nav-item"> <Link to={"/add"} className="nav-link"> Add </Link>  </li>
             </div>
              
          </nav>
             <div className="container mt-3">
              
               <Switch>
                  <Route exact path={["/", "/tutorials"]} component={TutorialList} />
                  <Route exact path={["/add"]} component={AddTutorial} />
                  <Route exact path={["/UpdateDeleteTutorials/:id"]} component={Tutorial} />
               </Switch>
              
             </div>
             </Router> 
        </div>   
      );
   }
}
  

export default App;
