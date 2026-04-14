using ToDoListApi.DTOs;

namespace ToDoListApi.IServices
{
    public interface IToDoService
    {
        Task<LoginRes> UserLogin(LoginInfo user);
        Task<Addnewtaskres> Addnewtask(Addnewtaskreq addnewtaskreq);
        Task<List<Gettodolistres>> Gettodolist(Gettodolistreq gettodolistreq);
        Task<Updatetaskstatusres> Updatetaskstatus(Updatetaskstatusreq updatetaskstatusreq);
    }
}
