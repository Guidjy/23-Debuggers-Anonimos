import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  return (
    <div>
      <h2>Página de Login</h2>
    </div>
  );
}

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
  },
};

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