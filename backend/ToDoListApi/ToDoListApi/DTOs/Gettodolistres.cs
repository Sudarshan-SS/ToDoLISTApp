namespace ToDoListApi.DTOs
{
    public class Gettodolistres
    {
        public int? TaskID { get; set; }
        public string? username { get; set; }
        public string? Description { get; set; }
        public DateOnly? Createddate { get; set; }
        public string? status { get; set; }
        public string? priority { get; set; }
    }
}
