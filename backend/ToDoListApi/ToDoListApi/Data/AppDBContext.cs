using Microsoft.EntityFrameworkCore;
using ToDoListApi.Models;


namespace ToDoListApi.Data
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<ToDo_Users> ToDo_Users { get; set; }
        public DbSet<Task_data> Task_data { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDo_Users>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();


            modelBuilder.Entity<Task_data>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
