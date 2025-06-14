import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
import ProjectItem from './pages/ProjectItem'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz para a página de login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/project/*" element={<ProjectItem />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;