using ToDoListApi.DTOs;
using ToDoListApi.IResps;
using ToDoListApi.IServices;

namespace ToDoListApi.Services
{
    
    public class ToDoService : IToDoService
    {

        private readonly IToDoLogin _toDoLoginresp;
        private readonly IToDODashboardresp _toDoDashboardresp;

        public ToDoService(IToDoLogin toDoLoginresp, IToDODashboardresp toDoDashboardresp)
        { 
            this._toDoLoginresp=toDoLoginresp;
            this._toDoDashboardresp = toDoDashboardresp;
        }


        public async Task<LoginRes> UserLogin(LoginInfo user)
        {
            var res =new LoginRes();
            try {
                var result = await _toDoLoginresp.UserLogin(user);
                res.Loginstatus = result.Loginstatus;
                res.Token= result.Token;
                res.TokenExpiryTime = result.TokenExpiryTime;
                res.ResMessage = result.ResMessage;
                return res;
            }
            catch (Exception ex) {
                res.Loginstatus = false;
                res.Token = null;
                res.TokenExpiryTime= null;
                res.ResMessage= ex.Message;
                return res;
            }

        }


        public async Task<Addnewtaskres> Addnewtask(Addnewtaskreq addnewtaskreq)
        {
            var res =new Addnewtaskres();
            try
            {
                var newtask = new ToDoListApi.Models.Task_data
           {
              Username = addnewtaskreq.Username,
              Description = addnewtaskreq.Description,
                Priority = addnewtaskreq.Priority,
                Status = addnewtaskreq.Taskstatus,
                CreatedDate = addnewtaskreq.CreatedAt.Value
            };
                 await _toDoDashboardresp.AddNewTaskAsync(newtask);
               
                    res.Taskaddingstatus = true;
                    res.Responsemessage = "Task Added Successfully";
                    return res;
                
               
            }
            catch (Exception ex)
            {
                res.Taskaddingstatus = false;
                res.Responsemessage = ex.ToString();
                return res;
            }
            
        }

        public async Task<List<Gettodolistres>> Gettodolist(Gettodolistreq gettodolistreq)
        {
            try
            {
                var result = await _toDoDashboardresp.GetTodoList(gettodolistreq);
                if (result.Count > 0) {
                    var response = result.Select(t => new Gettodolistres
                {
                    TaskID=t.Id,
                    username = t.Username,
                    Description = t.Description,
                    Createddate = t.CreatedDate,
                    status = t.Status,
                    priority=t.Priority
                    

                        }).ToList();
                    return response;
                }
                return new List<Gettodolistres>();
                
            }
            catch(Exception ex) {
                throw;
            }
        }


        public async Task<Updatetaskstatusres> Updatetaskstatus(Updatetaskstatusreq updatetaskstatusreq) {
            try {
                var result = await _toDoDashboardresp.Updatetaskstatus(updatetaskstatusreq);
                if (result > 0)
                {
                    var res = new Updatetaskstatusres
                    {
                        Taskid = updatetaskstatusreq.TaskId,
                        UpdatedStatus = updatetaskstatusreq.Status
                    };
                    return res;
                }
                else {
                    var res = new Updatetaskstatusres
                    {
                        Taskid = null,
                        UpdatedStatus = null
                    };
                    return res;
                }
                    

            }
            catch(Exception ex) { throw; }  
            
        }
    }
}
