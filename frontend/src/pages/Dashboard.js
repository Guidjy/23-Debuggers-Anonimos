import Header from '../components/Header';
import SideBar from '../components/SideBar';

function Dashboard() {
  // Exemplo simples de listas e tarefas (pode vir do estado ou props)
  const taskLists = [
    {
      id: 1,
      title: 'Para Fazer',
      tasks: ['Comprar insumos', 'Enviar relatório', 'Revisar código'],
    },
    {
      id: 2,
      title: 'Em Progresso',
      tasks: ['Desenvolver novo módulo', 'Testar integração'],
    },
    {
      id: 3,
      title: 'Concluídas',
      tasks: ['Planejar sprint', 'Reunião com cliente'],
    },
  ];

  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="main-area">
          <Header />

          <div className="card">
            <div className="card-header">
              <h2>Minhas Tarefas</h2>
              <button
                className="add-button"
                title="Adicionar tarefa"
                aria-label="Adicionar tarefa"
              >
                +
              </button>
            </div>

            <div className="task-lists">
              {taskLists.map((list) => (
                <div key={list.id} className="task-list">
                  <h3 className="list-title">{list.title}</h3>
                  <ul>
                    {list.tasks.map((task, i) => (
                      <li key={i} className="task-item">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .dashboard {
            display: flex;
            height: 100vh;
            background-color: #eff6ff; /* bg-blue-50 */
            color: #1e293b; /* gray-800 */
          }

          .main-area {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .card {
            background: white;
            margin: 2rem auto;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 90%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            flex-grow: 1;
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .card-header h2 {
            font-size: 1.75rem;
            font-weight: 700;
          }

          .add-button {
            background-color: #2563eb; /* blue-600 */
            color: white;
            font-size: 2rem;
            width: 48px;
            height: 48px;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.4);
            transition: background-color 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .add-button:hover {
            background-color: #1e40af; /* blue-800 */
          }

          .task-lists {
            display: flex;
            gap: 1.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .task-list {
            background-color: #f0f9ff; /* azul clarinho */
            border-radius: 0.75rem;
            padding: 1rem 1.25rem;
            min-width: 250px;
            max-height: 70vh;
            display: flex;
            flex-direction: column;
          }

          .list-title {
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1e40af; /* azul escuro */
          }

          ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
            overflow-y: auto;
          }

          .task-item {
            background: white;
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            cursor: default;
            user-select: none;
            transition: background-color 0.2s ease;
          }

          .task-item:hover {
            background-color: #dbeafe; /* azul claro hover */
          }
        `}
      </style>
    </>
  );
}

export default Dashboard;
