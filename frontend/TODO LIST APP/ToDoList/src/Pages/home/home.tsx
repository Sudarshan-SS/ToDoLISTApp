import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import type {
  Gettodolistres,
  Gettodolistreq,
  Updatetaskstatusreq,
  Addnewtaskreq,
} from "../../Models/Dashboardmodels";
import { useAuth } from "../../Services/AuthContext";
import Dashboardservice from "../../Services/Dashboardservice";
import "./home.css"


// ─── Utils ────────────────────────────────────────────────────────────────────
const isSameDay = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const datePart = dateStr.split("T")[0];
  const date = new Date(datePart);
  if (isNaN(date.getTime())) return false;
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "-";
  const datePart = dateStr.split("T")[0];
  const date = new Date(datePart);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  isTodayTask: boolean;
  onToggleTodayTask: () => void;
}

function Sidebar({ isTodayTask, onToggleTodayTask }: SidebarProps) {

  const navigate =useNavigate();
  const btnlogoutclick=()=>{
     const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) return;
  
  localStorage.removeItem("Token");
  toast.success("Logged out successfully!");
  navigate("/");
  };
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">📋 Todo App</h2>
      <nav className="sidebar-nav">
        <button
          type="button"
          className={`sidebar-btn ${!isTodayTask ? "active" : ""}`}
          onClick={() => isTodayTask && onToggleTodayTask()}
        >
          📁 All Tasks
        </button>
        <button
          type="button"
          className={`sidebar-btn ${isTodayTask ? "active" : ""}`}
          onClick={() => !isTodayTask && onToggleTodayTask()}
        >
          📅 Today's Tasks
        </button>
         <button
          type="button"
          className={`sidebar-btn `}
          onClick={btnlogoutclick}
        >
         Log Out
        </button>
      </nav>
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
interface HeaderProps {
  onTaskAdded: () => void;
}

function Header({ onTaskAdded }: HeaderProps) {
  const [newTaskInput, setNewTaskInput] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddTask = async () => {
    if (!newTaskInput.trim()) {
      toast.error("Please enter a task");
      return;
    }
    if (!taskPriority) {
      toast.error("Please select a priority");
      return;
    }

    const username = user?.username ?? "";
    if (!username) {
      toast.error("Session expired. Please login again.");
      navigate("/");
      return;
    }

    const req: Addnewtaskreq = {
      Username: username,
      Description: newTaskInput.trim(),
      Priority: taskPriority,
      Taskstatus: "Not Completed",
      CreatedAt: new Date().toLocaleDateString("en-CA"),
    };

    setIsAdding(true);
    try {
      const result = await Dashboardservice.Addnewtask(req);
      if (result.taskaddingstatus) {
        toast.success("Task added successfully!");
        onTaskAdded();
        setNewTaskInput("");
        setTaskPriority("");
      } else {
        toast.error("Unable to add task. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="header">
      <div className="header-inputs">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAdding}
        />
        <select
          className="priority-select"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          disabled={isAdding}
        >
          <option value="">Priority</option>
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button
          type="button"
          className="add-btn"
          onClick={handleAddTask}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "+ Add Task"}
        </button>
      </div>
    </div>
  );
}

// ─── TaskTable ────────────────────────────────────────────────────────────────
interface TaskTableProps {
  tasks: Gettodolistres[];
  isLoading: boolean;
  onStatusChange: (taskId: number, status: string) => void;
  startindex: number;
}

const statusBadgeClass: Record<string, string> = {
  Completed: "badge badge-completed",
  "In Progress": "badge badge-inprogress",
  "Not Completed": "badge badge-notcompleted",
};

const priorityBadgeClass: Record<string, string> = {
  high: "priority priority-high",
  medium: "priority priority-medium",
  low: "priority priority-low",
};

function TaskTable({ tasks, isLoading, onStatusChange ,startindex}: TaskTableProps) {
  if (isLoading) {
    return (
      <div className="empty-state">
        <span className="spinner" />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📭</p>
        <p className="empty-text">No tasks found.</p>
        <p className="empty-sub">Add a new task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Created On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task.taskID}
              className={task.status === "Completed" ? "row-completed" : ""}
            >
              <td>{startindex +index + 1}</td>
              <td className="task-desc">{task.description}</td>
              <td>
                <span className={priorityBadgeClass[task.priority] ?? "priority"}>
                  {task.priority ?? "-"}
                </span>
              </td>
              <td>{formatDate(task.createddate)}</td>
              <td>
                {task.status === "Completed" ? (
                  <span className={statusBadgeClass["Completed"]}>
                    ✅ Completed
                  </span>
                ) : (
                  <select
                    className="status-select"
                    value={task.status}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "") onStatusChange(task.taskID, val);
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Completed">Not Completed</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const [todoList, setTodoList] = useState<Gettodolistres[]>([]);
  const [isTodayTask, setIsTodayTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const startindex = (currentPage - 1) * tasksPerPage;

  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.username ?? "";

  const handleTaskAdded = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  // const handleToggleTodayTask = useCallback(() => {
  //   setIsTodayTask((prev) => !prev);
  // }, []);

  const handleToggleTodayTask = useCallback(() => {
  setIsTodayTask((prev) => !prev);
  setCurrentPage(1); // reset page
}, []);

  const fetchTodoList = useCallback(async () => {
    if (!username) {
      toast.error("Session expired. Please login again.");
      navigate("/");
      return;
    }

    const req: Gettodolistreq = { Username: username };
    setIsLoading(true);
    try {
      const result = await Dashboardservice.GetTodolist(req);
      setTodoList(result);
    } catch (error) {
      console.error("Failed to fetch todo list:", error);
      toast.error("Failed to load tasks. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, [username, navigate]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (isMounted) await fetchTodoList();
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [username, fetchTodoList, refresh]);

  const handleStatusChange = useCallback(
    async (taskId: number, status: string) => {
      const req: Updatetaskstatusreq = { TaskId: taskId, Status: status };
      const toastId = toast.loading("Updating status...");
      try {
        const result = await Dashboardservice.UpdateTaskStatus(req);
        if (result.TaskId !== null) {
          toast.success("Status updated!", { id: toastId });
          setRefresh((prev) => !prev);
        } else {
          toast.error("Update failed. Try again.", { id: toastId });
        }
      } catch (error) {
        console.error("Failed to update task status:", error);
        toast.error("Something went wrong.", { id: toastId });
      }
    },
    []
  );

  // const visibleTasks = isTodayTask
  //   ? todoList.filter((task) => isSameDay(task.createddate))
  //   : todoList;

    const filteredTasks = isTodayTask
  ? todoList.filter((task) => isSameDay(task.createddate))
  : todoList;

const startIndex = (currentPage - 1) * tasksPerPage;
const paginatedTasks = filteredTasks.slice(
  startIndex,
  startIndex + tasksPerPage
);

  const completedCount = todoList.filter((t) => t.status === "Completed").length;
  const totalCount = todoList.length;

  return (
    <div className="app-layout">
      <Toaster position="top-right" />
      <Sidebar
        isTodayTask={isTodayTask}
        onToggleTodayTask={handleToggleTodayTask}
      />
      <div className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              {isTodayTask ? "Today's Tasks" : "All Tasks"}
            </h1>
            <p className="page-subtitle">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{
                width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
        <Header onTaskAdded={handleTaskAdded} />
        <TaskTable
          //tasks={visibleTasks}
          tasks={paginatedTasks}
          
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
          startindex={startindex}
        />
        <div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
  >
    ⬅ Prev
  </button>

  <span>Page {currentPage}</span>

  <button
    disabled={startIndex + tasksPerPage >= filteredTasks.length}
    onClick={() => setCurrentPage((prev) => prev + 1)}
  >
    Next ➡
  </button>
</div>
      </div>
    </div>
  );
}

export default Dashboard;