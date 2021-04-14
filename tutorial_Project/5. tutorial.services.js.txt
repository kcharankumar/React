import axios from "axios";
import http from "../http-common";

class TutorialDataService{
    getAll()
    {
        return axios.get ("http://localhost:8080/MyTutorial/getAllTutorials");
    }

    getByID(id)
    {
        URL =  'http://localhost:8080/MyTutorial/getTutorialByID?id='+id;
       //alert ("URL : "+URL);
        return axios.get (URL);
    }

    get(title)
    {
        return axios.get ('http://localhost:8080/MyTutorial/getTutorialByTitle/${title}');
    }

    create (data)
    {
        return axios.post ("http://localhost:8080/MyTutorial/tutorials", data);
    }

    update (id, data)
    {
        URL =  'http://localhost:8080/MyTutorial/UpdateTutorials/'+id;
        return axios.put (URL, data);
    }

    delete(id)
    { 
        URL =  'http://localhost:8080/MyTutorial/DeleteTutorials?id='+id;        
        return axios.delete (URL);
    }

    deleteAll()
    { 
            return axios.delete ("http://localhost:8080/MyTutorial/DeleteAll"); 
    }

    findByTitle(title)
    {   var URL = 'http://localhost:8080/MyTutorial/getTutorialByTitle?title='+title;
      //  alert (URL);
        return axios.get (URL);
    }

}

export default new TutorialDataService();