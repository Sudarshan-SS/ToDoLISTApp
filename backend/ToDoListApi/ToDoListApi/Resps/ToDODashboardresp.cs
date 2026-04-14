using Microsoft.EntityFrameworkCore;
using ToDoListApi.Data;
using ToDoListApi.DTOs;
using ToDoListApi.IResps;
using ToDoListApi.Models;

namespace ToDoListApi.Resps
{
    public class ToDODashboardresp: IToDODashboardresp
    {
        private readonly AppDBContext dbContext;
        public ToDODashboardresp(AppDBContext _dbContext) { 
            this.dbContext = _dbContext;
        }


        

        public async Task AddNewTaskAsync(Task_data task)
        {
            await dbContext.Task_data.AddAsync(task);
            await dbContext.SaveChangesAsync(); 
        }


        public async Task<List<Task_data>> GetTodoList(Gettodolistreq gettodolistreq)
        {
           
                return await dbContext.Task_data.Where(t => t.Username == gettodolistreq.Username).OrderByDescending(t => t.Id).ToListAsync();
           
        }


        public async Task<int> Updatetaskstatus(Updatetaskstatusreq updatetaskstatusreq) {

            return await dbContext.Task_data.Where(t => t.Id == updatetaskstatusreq.TaskId).ExecuteUpdateAsync(setter => setter
        .SetProperty(t => t.Status, updatetaskstatusreq.Status)
    );
        }
    }
}
