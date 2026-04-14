import ApiClient from "./Api-Client";
import {type Addnewtaskreq ,type Addnewtaskres, type Gettodolistreq, type Gettodolistres, type Updatetaskstatusreq, type Updatetaskstatusres} from "../Models/Dashboardmodels";


const Dashboardservice={
    Addnewtask:async (Request:Addnewtaskreq):Promise<Addnewtaskres>=>{
        try{
            
            const response =await ApiClient.post<Addnewtaskres>("/ToDo/AddNewTask",Request);
            
             const res:Addnewtaskres={
                taskaddingstatus:response.data.taskaddingstatus,
                responsemessage:response.data.responsemessage
             }
            return res;
        }
        catch(error){
            console.log("Api ERROR "+error);
            const res:Addnewtaskres={
                taskaddingstatus:false,
                responsemessage:"Something went wrong"
            }

            return res;
        }
        
    },


    GetTodolist:async (Request:Gettodolistreq):Promise<Gettodolistres[]>=>{
        try{
            
            const response =await ApiClient.post<Gettodolistres[]>("/ToDo/GetToDoList",Request);
            
           

            return response.data;
        }
       catch (error) {
    console.log("GetTodolist API Error:", error);
    throw error;   
  }
        
    },


    UpdateTaskStatus:async (Request:Updatetaskstatusreq):Promise<Updatetaskstatusres>=>{
        try{
            const response =await ApiClient.post<Updatetaskstatusres>("/ToDo/UpdateStatus",Request);
            console.log(response.data);
            return response.data;
        }
        catch (error) {
    console.log("UpdateTaskStatus API Error:", error);
    throw error;   
  }
    }



};


export default Dashboardservice;