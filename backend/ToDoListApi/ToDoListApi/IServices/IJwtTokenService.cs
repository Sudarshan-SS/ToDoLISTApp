using ToDoListApi.DTOs;
using ToDoListApi.Models;

namespace ToDoListApi.IServices
{
    public interface IJwtTokenService
    {
        string GenerateToken(LoginInfo user);
    }
}
