import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Spinner.css';

export default function Login() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Estado de loading para controle do loader no botão
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'login') {
      if (nome && senha) {
        setLoading(true); // ativa loader

        fetch('http://localhost:8000/registro/login/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: nome,
            password: senha,
          })
        })
        .then(response => response.json())
        .then(response => {
          setLoading(false); // desativa loader

          if (response.success) {
            localStorage.setItem('usuarioLogado', nome);
            navigate('/dashboard');
            navigate('/dashboard');
          } else {
            alert("Usuário ou senha inválidos!");
          }
        })
        .catch(() => {
          setLoading(false);
          alert('Erro na conexão, tente novamente.');
        });
      } else {
        alert('Preencha todos os campos para entrar.');
      }
    } else {
      // Lógica de registro
      fetch('http://localhost:8000/registro/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: nome,
          email: email,
          password: senha,
          passwordConfirmation: confirmarSenha
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response.status === 200) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      })
      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
      if (nome && email && senha) {
        console.log('Tentativa de registro com:', { nome, email, senha });
        // Simula um registro bem-sucedido e muda para a tela de login
        alert('Registro realizado com sucesso! Faça o login para continuar.');
        setAuthMode('login');
      } else {
        alert('Preencha todos os campos para se registrar.');
      }
    }
  };

  // Função para limpar os campos ao trocar de modo
  const switchMode = (mode) => {
    setAuthMode(mode);
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Container das abas para Login e Registrar */}
        <div style={styles.tabContainer}>
          <div
            style={authMode === 'login' ? styles.activeTab : styles.tabButton}
            onClick={() => switchMode('login')}
          >
            Login
          </div>
          <div
            style={authMode === 'register' ? styles.activeTab : styles.tabButton}
            onClick={() => switchMode('register')}
          >
            Registrar
          </div>
        </div>
        
        {/* Título dinâmico */}
        <h2 style={styles.title}>{authMode === 'login' ? 'Login' : 'Criar Conta'}</h2>
        
          <input
            type="text"
            placeholder="Usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
            required
          />
        {/* Campo de email, visível apenas no modo de registro */}
        {authMode === 'register' && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        )}
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
          required
        />

        {/* Campo de confirmar senha, visível apenas no modo de registro */}
        {authMode === 'register' && (
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            style={styles.input}
            required
          />
        )}

        <button 
          type="submit" 
          style={{ 
            ...styles.button, 
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner" style={{width: '24px', height: '24px', borderWidth: '4px', margin: '0 auto'}}></div>
          ) : (
            authMode === 'login' ? 'Entrar' : 'Registrar'
          )}
        </button>

        {/* Link para "Esqueceu sua senha?", visível apenas no modo de login */}
        {authMode === 'login' && (
          <p style={styles.forgotPassword}>
            Esqueceu sua senha?
          </p>
        )}
      </form>
    </div>
  );
}

// Estilos foram atualizados para incluir as novas opções
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  tabButton: {
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    color: '#6b7280',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    color: '#1e3a8a',
    fontWeight: 'bold',
    borderBottom: '2px solid #2563eb',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#1e3a8a',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
    marginTop: '0.5rem',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: '0.5rem',
    color: '#2563eb',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  spinner: {
    margin: '3rem auto',
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #2563eb',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
  }
};