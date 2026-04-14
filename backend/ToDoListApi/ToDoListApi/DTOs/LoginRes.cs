namespace ToDoListApi.DTOs
{
    public class LoginRes
    {
        public bool Loginstatus { get; set; }
        public string? Token { get; set; }
        public DateTime? TokenExpiryTime { get; set; }
        public string? ResMessage { get; set; }
    }
}
