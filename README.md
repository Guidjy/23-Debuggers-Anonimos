# gerencia.ia: Inteligência Artificial na Gestão de Projetos

## 🧠 Nome da Equipe
**Debuggers Anônimos**

## 👥 Integrantes da Equipe

### Frontend
- Vitória Luiza Câmara – Desenvolvimento da página de Dashboard, header e sidebar
- Dionatan Eduardo Correa Rodrigues – Desenvolvimento da página de projetos
- Maria Eduarda Costa Barriquello – Desenvolvimento da página de login/cadastro

### Backend
- Guilherme Patrício Pimentel – Implementação das rotas e integração com banco de dados
- Vitor Dallabona – Criação dos modelos, controle de dados e lógica de IA

## 💡 Tema
**Inteligência Artificial aplicada ao que a sua imaginação permitir**

## 🏢 Área do Problema
**Gestão de Projetos**

## ❗ Problema a Ser Resolvido
A gestão de projetos tradicional sofre com ineficiências que atrasam a entrega de valor.

* **Dados Fragmentados:** Planos e status existem em silos, impedindo uma visão unificada do progresso.
* **Alta Carga Operacional:** Gestores investem tempo excessivo em tarefas manuais, como criar cronogramas e compilar relatórios.
* **Decisões Reativas:** A falta de insights em tempo real leva a uma gestão que apenas reage a problemas, em vez de antecipá-los.

## ✅ Descrição da Solução Proposta
O **gerencia.ia** injeta IA em pontos críticos do fluxo de trabalho para eliminar a fricção e potencializar a tomada de decisão.

### 1. Automação da Estrutura do Projeto

* **Como funciona:** A IA analisa um documento **EAP (Estrutura Analítica do Projeto)** e o converte instantaneamente em um **quadro Kanban** funcional.
* **Resultado:** Elimina o tempo de setup manual, reduz erros de transcrição e acelera o início dos trabalhos da equipe.

### 2. Análise de Progresso Inteligente

* **Como funciona:** A IA monitora o andamento das tarefas e gera, sob demanda, **resumos executivos** sobre a saúde do projeto.
* **Resultado:** Transforma a gestão reativa em **proativa**, baseando decisões em insights atuais e não em compilações manuais demoradas.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js, CSS, JavaScript, React-icons
- **Backend**: Django, Python
- **Banco de Dados**: SQLite
- **Outras**: React Router Dom
- **IA**: Chat GPT, Gemini, DeepSeek
- **API**: Gemini API

## 📦 Instruções de Instalação e Execução


**Pré-requisitos:** [Node.js](https://nodejs.org/) (v16+), [Python](https://www.python.org/) (v3.9+).

### 1. Backend (Servidor)

```bash
# Clone o repositório e acesse a pasta
git clone https://github.com/Guidjy/23-Debuggers-Anonimos.git
cd 23-Debuggers-Anonimos/backend_folder

# Crie e ative um ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instale as dependências e rode o servidor
pip install -r requirements.txt
python manage.py runserver
```
> Servidor disponível em `http://127.0.0.1:8000`.

### 2. Frontend (Cliente)

```bash
# Em outro terminal, acesse a pasta do frontend
cd ../frontend_folder

# Instale as dependências e inicie
npm install
npm install react-icons
npm install react-router-dom
npm start
```
> Aplicação disponível em `http://localhost:3000`