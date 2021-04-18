import axios from 'axios'

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/EMPLOYEE_CRUD";

class EmployeeService
{

    getEmployees()
    {
        return axios.get(EMPLOYEE_API_BASE_URL+"/getAllEmployeeData")
    }

    createEmployee(employee)
    {
        
        var URL = EMPLOYEE_API_BASE_URL + "/insertEmployeeData";
        //alert ("In createEmployee() service and the URL is "+URL );
        console.log("Employee data : "+employee);
        return axios.post (URL, employee);
    }

    getEmployeeById(id)
    {
        var URL = EMPLOYEE_API_BASE_URL + "/getEmployeeByID?id=" + id;
       // alert (URL);
        return axios.get (URL);
    }

    updateEmployee (id, employee)
    {
        var URL = EMPLOYEE_API_BASE_URL + "/updateEmployee/" + id;
       // alert (URL);
        return axios.put (URL, employee); 
    } 

    deleteEmployee (id)
    {
        var URL = EMPLOYEE_API_BASE_URL + "/deleteEmployeeByID?id=" + id;
        return axios.delete (URL); 
    } 
}

export default new EmployeeService()