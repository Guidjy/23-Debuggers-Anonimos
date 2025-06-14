function TaskList() {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Minhas Tarefas</h2>
      <ul className="space-y-3">
        <li className="p-3 bg-blue-100 rounded-lg shadow-sm">
          🔧 Ajustar layout do dashboard
        </li>
        <li className="p-3 bg-blue-100 rounded-lg shadow-sm">
          🧠 Definir categorias de tarefas
        </li>
        <li className="p-3 bg-blue-100 rounded-lg shadow-sm">
          ➕ Criar função para adicionar tarefa
        </li>
      </ul>
    </div>
  );
}

export default TaskList;
