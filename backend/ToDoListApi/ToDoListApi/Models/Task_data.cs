namespace ToDoListApi.Models
{
    public class Task_data
    {
        public int Id { get; set; }
        public String? Username {get; set; }
        public String? Description { get; set; }
        public DateOnly CreatedDate { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
    }
}
