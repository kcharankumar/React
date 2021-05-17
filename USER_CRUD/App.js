import react,{Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListEmployeeComponent from './Employee_CRUD/component/ListEmployeeComponent'
import CreateEmployeeComponent from './Employee_CRUD/component/CreateEmployeeComponent'
import ViewEmployeeComponent from './Employee_CRUD/component/ViewEmployeeComponent'
import UserActionApp from './USER_CRUD/components/UserActionApp';


 
class App extends Component
{
  render()
  {
   return(
      <div>
         <UserActionApp/>
      </div> 
   ); 
   }
}

export default App;