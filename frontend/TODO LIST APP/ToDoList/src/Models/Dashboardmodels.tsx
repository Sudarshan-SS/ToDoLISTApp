export interface Addnewtaskreq {
    Username:string,
    Description:string,
    Priority:string,
    Taskstatus:string,
    CreatedAt:string

 
}

export interface Addnewtaskres{
    taskaddingstatus:boolean,
    responsemessage:string
}

export interface Gettodolistres{
    taskID:number,
     username:string,
     description:string,
     createddate:string,
     status:string   
     priority:string
}


export interface Gettodolistreq{
    Username:string
}

export interface Updatetaskstatusreq{
    TaskId:number,
    Status:string
}

export interface Updatetaskstatusres{
    TaskId:number,
    UpdatedStatus:string
}