namespace ToDoListApi.Models
{
    public class ToDo_Users
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public bool? Isactive { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
}
