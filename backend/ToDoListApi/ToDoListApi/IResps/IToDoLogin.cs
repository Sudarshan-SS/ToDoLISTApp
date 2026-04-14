using ToDoListApi.DTOs;

namespace ToDoListApi.IResps
{
    public interface IToDoLogin
    {
        Task<LoginRes> UserLogin(LoginInfo user);
    }
}
