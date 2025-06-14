# code-race-25
Projeto da hackathon coderace 2025 na AMF (TESTEE)

# Documentação dos Modelos Django

## Modelo: Projeto

**Descrição**: Representa um projeto no sistema.

### Campos:
- **nome** (`CharField`)
  - **Descrição**: Nome do projeto
  - **Tipo**: String
  - **Tamanho máximo**: 50 caracteres
  - **Obrigatório**: Sim

- **criador** (`ForeignKey` para `User`)
  - **Descrição**: Usuário que criou o projeto
  - **Relação**: Muitos-para-um (um usuário pode criar muitos projetos)
  - **Comportamento ao deletar**: CASCADE (se o usuário for deletado, todos seus projetos serão deletados)

### Métodos:
- **`__str__`**: Retorna o nome do projeto para representação textual

---

## Modelo: RelatorioProjeto

**Descrição**: Armazena relatórios associados a projetos.

### Campos:
- **titulo** (`CharField`)
  - **Descrição**: Título do relatório
  - **Tipo**: String
  - **Tamanho máximo**: 50 caracteres
  - **Obrigatório**: Sim

- **conteudo** (`TextField`)
  - **Descrição**: Conteúdo detalhado do relatório
  - **Tipo**: Texto longo
  - **Tamanho máximo**: 3000 caracteres
  - **Obrigatório**: Sim

- **ultima_atualizacao** (`DateTimeField`)
  - **Descrição**: Data e hora da última atualização
  - **Tipo**: Data/Hora
  - **Automático**: Atualizado automaticamente quando o objeto é salvo (`auto_now=True`)

- **projeto** (`ForeignKey` para `Projeto`)
  - **Descrição**: Projeto ao qual o relatório pertence
  - **Relação**: Muitos-para-um (um projeto pode ter muitos relatórios)
  - **Comportamento ao deletar**: CASCADE (se o projeto for deletado, todos seus relatórios serão deletados)

### Métodos:
- **`__str__`**: Retorna o título do relatório para representação textual

---

## Modelo: Funcionario

**Descrição**: Representa um funcionário da organização.

### Campos:
- **nome** (`CharField`)
  - **Descrição**: Nome do funcionário
  - **Tipo**: String
  - **Tamanho máximo**: 50 caracteres
  - **Obrigatório**: Sim

- **cargo** (`CharField`)
  - **Descrição**: Cargo/função do funcionário
  - **Tipo**: String
  - **Tamanho máximo**: 50 caracteres
  - **Obrigatório**: Não (pode ser blank ou null)

- **projetos** (`ManyToManyField` para `Projeto`)
  - **Descrição**: Projetos aos quais o funcionário está associado
  - **Relação**: Muitos-para-muitos (um funcionário pode estar em vários projetos, um projeto pode ter vários funcionários)
  - **related_name**: 'funcionarios' (permite acessar todos funcionários de um projeto via `projeto.funcionarios.all()`)

### Métodos:
- **`__str__`**: Retorna o nome do funcionário para representação textual

---

## Modelo: TermoAberturaProjeto

**Descrição**: Armazena documentos de termo de abertura de projetos.

### Campos:
- **titulo** (`CharField`)
  - **Descrição**: Título do termo de abertura
  - **Tipo**: String
  - **Tamanho máximo**: 50 caracteres
  - **Obrigatório**: Sim

- **documento** (`FileField`)
  - **Descrição**: Arquivo do termo de abertura
  - **Tipo**: Arquivo
  - **Local de upload**: 'documentos/' (diretório dentro de MEDIA_ROOT)
  - **Obrigatório**: Sim

- **projeto** (`ForeignKey` para `Projeto`)
  - **Descrição**: Projeto ao qual o termo de abertura pertence
  - **Relação**: Muitos-para-um (um projeto pode ter um termo de abertura)
  - **Comportamento ao deletar**: CASCADE (se o projeto for deletado, seu termo de abertura será deletado)

### Métodos:
- **`__str__`**: Retorna o título do termo para representação textual

---

## Modelo: EstruturaAnaliticaProjeto

**Descrição**: Representa a EAP (Estrutura Analítica do Projeto).

### Campos:
- **n_tarefas** (`IntegerField`)
  - **Descrição**: Número de tarefas na EAP
  - **Tipo**: Inteiro
  - **Valor padrão**: 0
  - **Obrigatório**: Sim

- **projeto** (`ForeignKey` para `Projeto`)
  - **Descrição**: Projeto ao qual a EAP pertence
  - **Relação**: Muitos-para-um (um projeto tem uma EAP)
  - **Comportamento ao deletar**: CASCADE (se o projeto for deletado, sua EAP será deletada)

### Métodos:
- **`__str__`**: Retorna uma string identificando a EAP do projeto

---

## Modelo: TarefaEAP

**Descrição**: Representa uma tarefa na Estrutura Analítica do Projeto.

### Campos:
- **titulo** (`CharField`)
  - **Descrição**: Título da tarefa
  - **Tipo**: String
  - **Tamanho máximo**: 70 caracteres
  - **Obrigatório**: Sim

- **descricao** (`CharField`)
  - **Descrição**: Descrição detalhada da tarefa
  - **Tipo**: String
  - **Tamanho máximo**: 140 caracteres
  - **Obrigatório**: Sim

- **responsaveis** (`ManyToManyField` para `Funcionario`)
  - **Descrição**: Funcionários responsáveis pela tarefa
  - **Relação**: Muitos-para-muitos (uma tarefa pode ter vários responsáveis, um funcionário pode ser responsável por várias tarefas)
  - **related_name**: 'tarefas' (permite acessar todas tarefas de um funcionário via `funcionario.tarefas.all()`)

- **projeto** (`ForeignKey` para `Projeto`)
  - **Descrição**: Projeto ao qual a tarefa pertence
  - **Relação**: Muitos-para-um (um projeto pode ter muitas tarefas)
  - **related_name**: 'tarefas' (permite acessar todas tarefas de um projeto via `projeto.tarefas.all()`)
  - **Comportamento ao deletar**: CASCADE (se o projeto for deletado, suas tarefas serão deletadas)

### Métodos:
- **`__str__`**: Retorna o título da tarefa para representação textual

---

## Modelo: QuadroKanban

**Descrição**: Representa um quadro Kanban para gerenciamento visual de tarefas.

### Campos:
- **titulo** (`CharField`)
  - **Descrição**: Título do quadro Kanban
  - **Tipo**: String
  - **Tamanho máximo**: 50 caracteres
  - **Obrigatório**: Sim

- **numero_de_cards** (`IntegerField`)
  - **Descrição**: Número de cards no quadro
  - **Tipo**: Inteiro
  - **Valor padrão**: 0
  - **Obrigatório**: Sim

- **projeto** (`ForeignKey` para `Projeto`)
  - **Descrição**: Projeto ao qual o quadro Kanban pertence
  - **Relação**: Muitos-para-um (um projeto pode ter um quadro Kanban)
  - **Comportamento ao deletar**: CASCADE (se o projeto for deletado, seu quadro Kanban será deletado)

### Métodos:
- **`__str__`**: Retorna o título do quadro para representação textual

---

## Modelo: CardKanban

**Descrição**: Representa um card em um quadro Kanban.

### Campos:
- **tarefa** (`CharField`)
  - **Descrição**: Descrição breve da tarefa no card
  - **Tipo**: String
  - **Tamanho máximo**: 70 caracteres
  - **Obrigatório**: Sim

- **status** (`CharField`)
  - **Descrição**: Status atual do card (ex: "para fazer", "em andamento", "concluído")
  - **Tipo**: String
  - **Tamanho máximo**: 20 caracteres
  - **Valor padrão**: "para fazer"
  - **Obrigatório**: Sim

- **descricao** (`CharField`)
  - **Descrição**: Descrição detalhada da tarefa
  - **Tipo**: String
  - **Tamanho máximo**: 140 caracteres
  - **Obrigatório**: Não (pode ser blank ou null)

- **data_de_entrega** (`DateField`)
  - **Descrição**: Data prevista para conclusão da tarefa
  - **Tipo**: Data
  - **Obrigatório**: Sim

- **quadro** (`ForeignKey` para `QuadroKanban`)
  - **Descrição**: Quadro Kanban ao qual o card pertence
  - **Relação**: Muitos-para-um (um quadro pode ter muitos cards)
  - **Comportamento ao deletar**: CASCADE (se o quadro for deletado, todos seus cards serão deletados)

### Métodos:
- **`__str__`**: Retorna a descrição da tarefa no card para representação textual