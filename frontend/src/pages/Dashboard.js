import { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function Dashboard() {
  const [taskLists, setTaskLists] = useState([
    {
      id: 1,
      title: 'Projeto 1',
      responsavel: 'Vitória',
      entrega: '20/06/2025',
      status: 'Em andamento',
    },
    {
      id: 2,
      title: 'Projeto 2',
      responsavel: 'Giulia',
      entrega: '25/06/2025',
      status: 'Concluído',
    },
    {
      id: 3,
      title: 'Projeto 3',
      responsavel: 'Lucas',
      entrega: '30/06/2025',
      status: 'Aguardando aprovação',
    },
    {
      id: 4,
      title: 'Projeto 4',
      responsavel: 'Marcos',
      entrega: '05/07/2025',
      status: 'Em planejamento',
    },
    {
      id: 5,
      title: 'Projeto 5',
      responsavel: 'Beatriz',
      entrega: '10/07/2025',
      status: 'Cancelado',
    },
  ]);

  const handleDelete = (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este projeto?');
    if (confirm) {
      setTaskLists((prev) => prev.filter((proj) => proj.id !== id));
    }
  };

  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="main-area">
          <Header />

          <div className="card">
            <div className="card-header">
              <h2>Meus Projetos</h2>
              <button
                className="add-button"
                title="Adicionar projeto"
                aria-label="Adicionar projeto"
              >
                +
              </button>
            </div>

            <div className="task-lists">
              {taskLists.map((list) => (
                <div key={list.id} className="task-list">
                  <button
                    className="delete-button"
                    title="Excluir projeto"
                    onClick={(e) => {
                      e.stopPropagation(); // previne propagação caso clique no card
                      handleDelete(list.id);
                    }}
                  >
                    ×
                  </button>
                  <h3 className="list-title">{list.title}</h3>
                  <ul>
                    <li><strong>Responsável:</strong> {list.responsavel}</li>
                    <li><strong>Entrega:</strong> {list.entrega}</li>
                    <li><strong>Status:</strong> {list.status}</li>
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
            background-color: #eff6ff;
            color: #1e293b;
          }

          .main-area {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .card {
            background: white;
            margin: 5rem auto 2rem auto;
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
            background-color: #2563eb;
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
            background-color: #1e40af;
          }

          .task-lists {
            display: flex;
            flex-wrap: wrap;
            gap: 1.25rem;
            justify-content: flex-start;
          }

          .task-list {
            background-color: #f0f9ff;
            border-radius: 0.75rem;
            padding: 1rem 1.25rem;
            min-width: 220px;
            max-width: 25%;
            flex: 1 1 22%;
            display: flex;
            flex-direction: column;
            position: relative;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .task-list:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          }

          .delete-button {
            position: absolute;
            top: 0.5rem;
            right: 0.75rem;
            background: transparent;
            border: none;
            font-size: 1.25rem;
            font-weight: bold;
            color: #1e40af;
            cursor: pointer;
          }

          .delete-button:hover {
            color: #b91c1c;
          }

          .list-title {
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1e40af;
          }

          ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
          }

          ul li {
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
          }

          @media (max-width: 768px) {
            .task-list {
              flex: 1 1 100%;
              max-width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}

export default Dashboard;