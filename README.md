CodeJourney!

Plataforma de desafios de programação com execução de código em ambiente isolado. Inspirada no LeetCode, permite que usuários resolvam desafios de JavaScript e tenham seu código avaliado automaticamente por casos de teste reais.



TECNOLOGIAS

Backend
- **Node.js** com **TypeScript**
- **Express** — framework HTTP
- **Prisma ORM** — acesso ao banco de dados
- **PostgreSQL** — banco de dados relacional
- **JWT** — autenticação stateless
- **bcrypt** — hash de senhas
- **Docker** — containerização e execução segura de código
- **dockerode** — controle de containers via Node.js

 Frontend
- **React** com **TypeScript**
- **Vite** — bundler
- **Tailwind CSS** — estilização
- **Monaco Editor** — editor de código (mesmo do VSCode)
- **React Router** — navegação

 Arquitetura


frontend/          # React + TypeScript + Tailwind
backEnd/
  src/
    controllers/   # Recebe req/res, chama services
    services/      # Lógica de negócio
    routes/        # Definição de rotas
    middleware/    # Autenticação JWT
  prisma/
    schema.prisma  # Modelos do banco
    migrations/    # Histórico de mudanças
    seed.ts        # Dados iniciais


SEGURANÇA

- Senhas armazenadas com **bcrypt** (hash irreversível)
- Autenticação via **JWT** em todas as rotas protegidas
- Código do usuário executado em container Docker isolado
  - Sem acesso à rede (`NetworkDisabled: true`)
  - Limite de memória: 50MB
  - Limite de CPU: 50%
  - Timeout de 5 segundos (proteção contra loops infinitos)
  - Container destruído automaticamente após execução
- Variáveis sensíveis via `.env` (nunca no repositório)
- Mensagens de erro genéricas no login (proteção contra enumeração de usuários)

 Como rodar localmente

 Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js 20+](https://nodejs.org)

. Clone o repositório

git clone https://github.com/seu-usuario/codejourney
cd codejourney


 Configure as variáveis de ambiente
Crie um arquivo `.env` dentro da pasta `backEnd`:

DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=codeJourney
JWT_SECRET=sua_chave_secreta_aqui


 Suba os containers

cd backEnd
docker compose up --build


O comando irá automaticamente:
- Subir o PostgreSQL
- Aplicar as migrations
- Popular o banco com 9 desafios (3 por nível)
- Iniciar o servidor na porta 3000

 Rode o frontend

cd frontend
npm install
npm run dev


Acesse: `http://localhost:5173`


 Como funciona a avaliação de código

1. Usuário escreve uma função no editor
2. Frontend envia o código para a API
3. Backend cria um **container Docker temporário**
4. O código é executado com cada caso de teste
5. O output é comparado com o resultado esperado
6. Container é destruído após a execução
7. Resultado retorna para o usuário


Usuário → API → Container Docker → Output → Comparação → Resultado


## Autor

Desenvolvido por Izaque como projeto de portfólio para aprendizado de backend com Node.js, TypeScript, Docker e boas práticas de segurança.
