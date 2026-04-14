using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ToDoListApi.Data;
using ToDoListApi.DTOs;
using ToDoListApi.IServices;

namespace ToDoListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {


        private readonly IToDoService toDoService;

        public ToDoController(IToDoService _toDoService)
        {

            toDoService = _toDoService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginRes>> UserLogin([FromBody] LoginInfo loginInfo) {

            var Res =new LoginRes();
            try
            {
                var result= await toDoService.UserLogin(loginInfo);
                Res.Loginstatus = result.Loginstatus;
                Res.Token = result.Token;
                Res.TokenExpiryTime = result.TokenExpiryTime;
                Res.ResMessage = result.ResMessage;
                return Ok(result);
            }
            catch(Exception ex) {
                Res.Loginstatus=false;
                Res.Token = null;
                Res.TokenExpiryTime = null;
                Res.ResMessage = ex.ToString();
                return Ok(Res);
            }

            
        }
        [Authorize]
        [HttpPost("AddNewTask")]
        public async Task<ActionResult<Addnewtaskres>> Addnewtask([FromBody] Addnewtaskreq addnewtaskreq)
        {
            var res = new Addnewtaskres();
            try
            {
                var result = await toDoService.Addnewtask(addnewtaskreq);
                res.Responsemessage = result.Responsemessage;
                res.Taskaddingstatus = result.Taskaddingstatus;
                return res;
            }
            catch (Exception ex) {
                res.Responsemessage = ex.Message;
                res.Taskaddingstatus = false ;
                return res;
            }
        }

        [Authorize]
        [HttpPost("GetToDoList")]
        public async Task<ActionResult<Gettodolistres>> GetTodoTask([FromBody] Gettodolistreq gettodolistreq) { 
            var result=await toDoService.Gettodolist(gettodolistreq);
            return Ok(result);
        }


        [Authorize]
        [HttpPost("UpdateStatus")]
        public async Task<ActionResult<Updatetaskstatusres>> Updatetaskstatus(Updatetaskstatusreq updatetaskstatusreq) { 
            var result=await toDoService.Updatetaskstatus(updatetaskstatusreq);
            if (result.Taskid == null)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
