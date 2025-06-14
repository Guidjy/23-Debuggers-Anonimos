import { useState, useRef, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';

import { FaRocketchat, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

import ProgressBar from "../components/ProgressBar";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ButtonCircle from "../components/ButtonCircle";

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

  const navigate = useNavigate();
  const messagesEndRef = useRef(null); 

  // Estados para o chat
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]); // Array para armazenar as mensagens
  const [currentMessage, setCurrentMessage] = useState(''); // Estado para o texto digitado

  // Função para rolar para o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efeito para rolar para o final sempre que novas mensagens forem adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  // Função para togglar a visibilidade do chat
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  // Função para enviar uma nova mensagem
  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      setMessages(prev => [...prev, { text: currentMessage, sender: 'You' }]); // Adicione a nova mensagem
      setCurrentMessage(''); // Limpa o input
    }
  };

  // 🔥 File Upload Handler
  const handleFileSubmit = async () => {
    if (!file) {
      alert("Selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append('documento', file);
    formData.append('projeto', params); // Assuming params.id is the project id

    try {
      const response = await fetch('http://127.0.0.1:8000/tap/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Arquivo enviado com sucesso!");
      } else {
        const errorData = await response.json();
        alert("Erro ao enviar: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na conexão.");
    }
  };

  const params = useParams();

  return (
    <div className="project-page-layout">
      <SideBar />
      <div className="project-main-content">
        <Header />
        
        <div className="project-page-wrapper">
        
          <div className="project-details-section">
            <div className="details-card-one">
              <ProgressBar percentage={90} color="#2563eb" height={30} />
              <ButtonCircle />
              <button className="cta-button" n>Receber TAP</button>
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

          {/* Botão flutuante de chat */}
          <button className="chat-floating-button" onClick={toggleChat}>
            <FaRocketchat/>
          </button>

          {/* Chat flutuante - renderizado condicionalmente */}
          {showChat && (
            <div className="floating-chat-box">
              <div className="chat-header">
                <h4>Chat do Projeto</h4>
                <button className="chat-close-button" onClick={toggleChat}>X</button>
              </div>
              <div className="chat-messages">
                {messages.length === 0 ? (
                  <p className="no-messages-text">Nenhuma mensagem ainda. Comece a conversar!</p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className="chat-message-item">
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))
                )}
              <div ref={messagesEndRef} /> 
                {/* Elemento para rolagem automática */}
              </div>
              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Enviar ao pressionar Enter
                />
                <button onClick={handleSendMessage} className="send-message-button">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;