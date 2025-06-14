import Header from '../components/Header';
import SideBar from '../components/SideBar';
import TaskList from '../components/TaskList';

function Dashboard() {
  return (
    <div className="flex h-screen bg-blue-50">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex flex-1 p-6 gap-4">
          <TaskList />
          <div className="flex items-start">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow-md"
              title="Adicionar tarefa"
            >
              +
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
