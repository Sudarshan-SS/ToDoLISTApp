using ToDoListApi.DTOs;
using ToDoListApi.Models;

namespace ToDoListApi.IResps
{
    public interface IToDODashboardresp
    {
        Task AddNewTaskAsync(Task_data task);
        Task<List<Task_data>> GetTodoList(Gettodolistreq gettodolistreq);
        Task<int> Updatetaskstatus(Updatetaskstatusreq updatetaskstatusreq);
    }
}
