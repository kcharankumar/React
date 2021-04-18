package SringBootDemo.SpringBootDemo.com.sunsoft.controller;
 
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import SringBootDemo.SpringBootDemo.Entity.Employee;
import SringBootDemo.SpringBootDemo.Entity.EmployeeCRUD;
import SringBootDemo.SpringBootDemo.Entity.Tutorials;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping ("/EMPLOYEE_CRUD")
public class Employee_CRUDController {
	
	static List<EmployeeCRUD> employeeCRUDLst; 

	
	Employee_CRUDController()
	{
		employeeCRUDLst = new ArrayList<EmployeeCRUD>();
		EmployeeCRUD employeeCRUDObj1 = new EmployeeCRUD (1, "Charan", "Kumar", "kcharankumar@gamail.com");
		EmployeeCRUD employeeCRUDObj2 = new EmployeeCRUD (2, "Prajwal", "Kumar", "kcharankumar@gamail.com");
		EmployeeCRUD employeeCRUDObj3 = new EmployeeCRUD (3, "Dev", "anand", "kcharankumar@gamail.com");
		
		employeeCRUDLst.add (employeeCRUDObj1);
		employeeCRUDLst.add (employeeCRUDObj2);
		employeeCRUDLst.add (employeeCRUDObj3);
	}
	
	
	@GetMapping (path="/getAllEmployeeData") 
	public List<EmployeeCRUD> getAllEmployeeData ()
	{
		 System.out.println("getTotorialData() is executed..."); 
		 
  		 return employeeCRUDLst;
		 
	}
	
	
	@PostMapping (path="/insertEmployeeData") 
	public String insertEmployeeData (@RequestBody EmployeeCRUD EmployeeCRUDObj)
	{
		System.out.println("insertEmployeeData() is executed...Data received from Angular is "+EmployeeCRUDObj);
		 
		int count = employeeCRUDLst.size();
		EmployeeCRUDObj.setId(++count);
		
		employeeCRUDLst.add(EmployeeCRUDObj);
		
		String returnString = "Record is successfully added...";
		return returnString;
	} 
	

	@GetMapping (path="/getEmployeeByID") 
	public  EmployeeCRUD  getEmployeeByID (@RequestParam ("id") int id)
	{
		 System.out.println("getTutorialDataByID() is executed...Received data is "+id);	
		 
		 EmployeeCRUD EmployeeCRUDObjTemp = null; 
		 
 
			for (EmployeeCRUD EmployeeCRUDObj : employeeCRUDLst ) 
			{
				if (EmployeeCRUDObj.getId() == id)
				{
					EmployeeCRUDObjTemp = EmployeeCRUDObj; 
				}
					
			}
			
			return EmployeeCRUDObjTemp;
		 
	}
	
	
	@DeleteMapping (path="/deleteEmployeeByID") 
	public String deleteEmployeeID(@RequestParam ("id") int id)
	{
		 
		System.out.println("deleteEmployeeID() is executed...Received data is "+id); 
		
		 int count=0;
		 

		for (EmployeeCRUD EmployeeCRUDObj : employeeCRUDLst ) 
		{
			
			if (EmployeeCRUDObj.getId() == id)			 		
				break;
			 
			++count;					
		} 
 
		employeeCRUDLst.remove(count);
		String str = "success";
		
		return str;
		
		 
	} 
	
	
	@PutMapping (path="/updateEmployee/{id}") 
	public String updateEmployee (@PathVariable ("id") int id, @RequestBody EmployeeCRUD EmployeeCRUDObj)
	{ 
		 System.out.println("updateEmployee() is executed...Received data is "+id + " And object is "+EmployeeCRUDObj);	
		 
		 EmployeeCRUD EmployeeCRUDObjTemp = null; 
		 int count=0;
		 

			for (EmployeeCRUD EmployeeCRUDObjIter : employeeCRUDLst ) 
			{
				
				if (EmployeeCRUDObjIter.getId() == id)
				{
					EmployeeCRUDObj.setId(id);
					employeeCRUDLst.set(count, EmployeeCRUDObj);
					 
				}
				++count;					
			} 
			String str = "Record successfully updated...";
			
			return str;
	} 
	
	

}
