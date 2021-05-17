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

import SringBootDemo.SpringBootDemo.Entity.EmployeeCRUD;
import SringBootDemo.SpringBootDemo.Entity.UserDetails;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping ("/USER_CRUD")
public class User_CRUDController {
	
	List<UserDetails> userDetailsLst = new ArrayList<UserDetails>();
	
	User_CRUDController()
	{
		UserDetails userDetailsObj1 = new UserDetails (1,"Charan", "Kumar", "charan@gmail.com", "234234234", "Bangalore","560018");
		UserDetails userDetailsObj2 = new UserDetails (2,"Rajesh", "Kumar", "charan@gmail.com", "234234234", "Bangalore","560018");
		UserDetails userDetailsObj3 = new UserDetails (3,"Rajesh1", "Kumar", "charan@gmail.com", "234234234", "Bangalore","560018");
		UserDetails userDetailsObj4 = new UserDetails (4,"Rajesh2", "Kumar", "charan@gmail.com", "234234234", "Bangalore","560018");
		
		userDetailsLst.add(userDetailsObj1);
		userDetailsLst.add(userDetailsObj2);
		userDetailsLst.add(userDetailsObj3);
		userDetailsLst.add(userDetailsObj4);
		
	}
	
	@PostMapping ("/InsertUserDetails")
	public List<UserDetails> InsertUserDetails (@RequestBody UserDetails userDetailsObj)
	{
		System.out.println("Received data is :"+userDetailsObj);
		
		int count = userDetailsLst.size();
		userDetailsObj.setUserId(++count);
		userDetailsLst.add(userDetailsObj);
		
		return userDetailsLst;
		
	}
	
	@GetMapping ("/getAllUsers")
	public List<UserDetails> getAllUsers ()
	{ 
		
		System.out.println("Inside getAllUsers()...");
		return userDetailsLst;		
	}

	
	

    @GetMapping ("/GetUserDetailsById")
	public UserDetails GetUserDetailsById (@RequestParam int id)
	{ 
		
		System.out.println("Inside GetUserDetailsById()...Received id "+id);
		
		UserDetails userDetailsObjToReturn=null;
		
		for (UserDetails userDetailsObj : userDetailsLst)
		{
			if (userDetailsObj.getUserId()== id)
				userDetailsObjToReturn = userDetailsObj;
		}
		
		return userDetailsObjToReturn;		
	}
			
    
	
    @DeleteMapping ("/deleteUserByID")
	public String deleteUserByID (@RequestParam int id)
	{ 
		
		System.out.println("Inside deleteUserByID()...Received id "+id);
		
		 int count=0;
		
		for (UserDetails userDetailsObj : userDetailsLst)
		{
			if (userDetailsObj.getUserId()== id)			 
				break;
			
			++count;
			 
		}
		
		userDetailsLst.remove(count);
		
		return "Given object is deleted";		
	}
		
    
    
	@PutMapping (path="/updateUserDetails") 
	public String updateUserDetails (@RequestBody UserDetails userDetailsObj)
	{ 
		 System.out.println("updateEmployee() is executed...Received data is  object is "+userDetailsObj);	
		 
		 UserDetails userDetailsObjTemp = null; 
		 int count=0;
		 

			for (UserDetails userDetailsLstObj : userDetailsLst ) 
			{
				
				if (userDetailsLstObj.getUserId() == userDetailsObj.getUserId())
				{					
					userDetailsLst.set(count, userDetailsObj);
					 
				}
				++count;					
			} 
			String str = "Record successfully updated...";
			
			return str;
	} 
}
