
---

# Desafio 03 - Site de Vendas de Móveis

Este projeto é um site de vendas de móveis, desenvolvido com React, TypeScript e Vite.

## Funcionalidades

- **Filtragem de Produtos**: Permite filtrar produtos por tipo.
- **Carrinho de Compras**: Adicione produtos ao carrinho.
- **Remover de Compras**: Remover produtos do carrinho.
- **Validação de Endereço**: Valida o endereço de entrega.
- **Validação de Login**: Algumas rotas são protegidas e exigem login. Para fins de aprendizado, um email e senha já foram configurados:
  - **Email**: `user@gmail.com`
  - **Senha**: `123456789`

## Instruções para Inicializar e Rodar a Aplicação

### Pré-requisitos

- **Node.js**: Versão 14 ou superior
- **npm**: Versão 6 ou superior (ou utilize o `yarn`)

### Instalação

1. **Clone o Repositório**:
   ```sh
   git clone https://github.com/seu-usuario/desafio_03.git
   cd desafio_03
   ```

2. **Instale as Dependências**:
   ```sh
   npm install
   ```

### Rodando a Aplicação

#### Modo de Desenvolvimento

1. **Inicie o Servidor de Desenvolvimento**:
   ```sh
   npm run dev
   ```

2. **Abra o Navegador** e acesse [http://localhost:3000](http://localhost:3000).

#### Servidor Backend

1. **Inicie o Servidor Backend**:
   ```sh
   npm run backend
   ```

2. O servidor backend estará disponível em [http://localhost:5000](http://localhost:5000).

### Rodando Testes

1. **Execute os Testes**:
   ```sh
    npm run test
    npm run coverage
   ```

### Build para Produção

1. **Gere a Build para Produção**:
   ```sh
   npm run build
   ```

2. Os arquivos de build serão gerados na pasta `dist`.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Vite**: Ferramenta de construção e desenvolvimento.
- **JSON Server**: Simula uma API RESTful para desenvolvimento.
- **ESLint**: Ferramenta de linting para JavaScript e TypeScript.
- **TailwindCSS**: Framework para estilização.
- **Firebase**: Backend-as-a-Service para autenticação e banco de dados.
- **Axios**: Cliente HTTP para fazer requisições.
- **React Router DOM**: Biblioteca para roteamento em React.
- **React Hook Form**: Biblioteca para gerenciamento de formulários.
- **Zod**: Validador de esquemas para TypeScript.
- **Vitest**: Framework de testes para projetos em Vite.

---
