namespace ToDoListApi.DTOs
{
    public class Addnewtaskreq
    {
        public string? Username { get; set; }
        public string? Description { get; set; }
        public string? Priority { get; set; }
        public string? Taskstatus { get; set; }
        public DateOnly? CreatedAt { get; set; } 
    }
}
