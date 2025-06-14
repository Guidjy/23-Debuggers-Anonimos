import ProgressBar from "../components/ProgressBar";
import Header from "../components/Header";
import ButtonCircle from "../components/ButtonCircle";
import { FaRocketchat } from 'react-icons/fa'; // 'Fa' = Font Awesomeimport { FaFile } from 'react-icons/fa'; // 'Fa' = Font Awesome
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

  return (
    <>
      <Header />
      <div className="container">
        <div className="left">
          <div className="left-one">
            <ProgressBar percentage={90} color="#2563eb" height={30} />
            <ButtonCircle />
          </div>
          <div className="left-two">
            <h3>Relatório do Projeto</h3>
            <p>Visualize aqui os dados e métricas do seu projeto</p>
          </div>
          <div className="left-three">
            <button className="tap-button">Receber TAP</button>
          </div>
        </div>
        <div className="two">
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
        <button className="floating-button">
          <FaRocketchat/>
        </button>
      </div>
    </>
  );
};

export default ProjectItem;