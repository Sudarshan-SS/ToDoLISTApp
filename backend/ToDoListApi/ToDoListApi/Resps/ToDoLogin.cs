using Microsoft.EntityFrameworkCore;
using ToDoListApi.Data;
using ToDoListApi.DTOs;
using ToDoListApi.IResps;
using ToDoListApi.IServices;
using ToDoListApi.Services;

namespace ToDoListApi.Resps
{
    public class ToDoLogin: IToDoLogin
    {
        private readonly AppDBContext appdbcontext;
        private readonly IJwtTokenService jwtTokenService;
        public ToDoLogin(AppDBContext _appdbcontext, IJwtTokenService _jwtTokenService) {
            this.appdbcontext = _appdbcontext;
            this.jwtTokenService = _jwtTokenService;
        }


        public async Task<LoginRes> UserLogin(LoginInfo user) {
            try
            {
                bool isvaliduser = await appdbcontext.ToDo_Users.AnyAsync((s) => s.Username == user.Username && s.Password == user.Password);

                var res = new LoginRes();
                if (isvaliduser)
                {
                    
                    
                        res.Loginstatus = true;
                        var token = jwtTokenService.GenerateToken(user);
                        res.Token = token;
                        res.TokenExpiryTime = DateTime.UtcNow.AddMinutes(60);
                        res.ResMessage = "";
                    return res;

                    
                        
                   
                   

                }
                else
                {
                    res.Loginstatus = false;

                    res.Token = null;
                    res.TokenExpiryTime = null;
                    res.ResMessage = "Not a Registered User";
                    return res;
                }

            }
            catch (Exception ex) {
                var res = new LoginRes();
                res.Loginstatus = false;

                res.Token = null;
                res.TokenExpiryTime = null;
                res.ResMessage = ex.Message;
                return res;
            }
            

            
            
        }

    }
}
