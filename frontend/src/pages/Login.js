import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  // Estado para controlar se estamos em modo 'login' ou 'register'
  const [authMode, setAuthMode] = useState('login');
  
  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'login') {
      // Lógica de login
      if (email && senha) {
        console.log('Tentativa de login com:', { email, senha });
        navigate('/dashboard');
      } else {
        alert('Preencha todos os campos para entrar.');
      }
    } else {
      // Lógica de registro
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

        {/* Campo de nome, visível apenas no modo de registro */}
        {authMode === 'register' && (
          <input
            type="text"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
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

        <button type="submit" style={styles.button}>
          {authMode === 'login' ? 'Entrar' : 'Registrar'}
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
};