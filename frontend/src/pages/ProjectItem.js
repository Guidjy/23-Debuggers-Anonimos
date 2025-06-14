import ProgressBar from "../components/ProgressBar";
import Header from "../components/Header";
import SideBar from "../components/SideBar"; // Certifique-se de que o caminho está correto
import ButtonCircle from "../components/ButtonCircle";
import { FaRocketchat, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import "./ProjectItem.css";

const ProjectItem = () => {
  const taskLists = [
    {
      id: 1,
      title: "Para Fazer",
      tasks: ["Comprar insumos", "Enviar relatório", "Revisar código"],
    },
    {
      id: 2,
      title: "Em Progresso",
      tasks: ["Desenvolver novo módulo", "Testar integração"],
    },
    {
      id: 3,
      title: "Concluídas",
      tasks: ["Planejar sprint", "Reunião com cliente"],
    },
  ];

  const navigate = useNavigate(); // Inicialize o hook de navegação

  const handleGoBack = () => {
    navigate('/dashboard'); // Navega de volta para o dashboard
  };

  return (
    <div className="project-page-layout"> {/* Renomeado de 'area-dash' para algo mais descritivo para esta página */}
      <SideBar />
      <div className="project-main-content"> {/* Adicionada uma classe aqui para estilização */}
        <Header />
        <div className="project-page-wrapper">
          <div className="project-details-section">
            <div className="details-card-one">
              <ProgressBar percentage={90} color="#2563eb" height={30} />
              <ButtonCircle />
              <button className="cta-button">Receber TAP</button>
            </div>
            <div className="details-card-two">
              <h3>Relatório do Projeto</h3>
              <p>Visualize aqui os dados e métricas do seu projeto</p>
            </div>
          </div>
          <div className="project-tasks-section">
            <div className="project-task-boards">
              {taskLists.map((list) => (
                <div key={list.id} className="task-board-column">
                  <h3 className="board-column-title">{list.title}</h3>
                  <ul>
                    {list.tasks.map((task, i) => (
                      <li key={i} className="board-task-item">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
           {/* Botão flutuante para voltar ao dashboard */}
           <button className="back-to-dashboard-button" onClick={handleGoBack}>
            <FaArrowLeft/>
          </button>
          <button className="chat-floating-button">
            <FaRocketchat/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;