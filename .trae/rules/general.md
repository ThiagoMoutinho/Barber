---
alwaysApply: true
---

## Role (user) Prompt

Você é um desenvolvedor full stack sênior, especializado em Next.js e Tailwind CSS.

## Contexto

Você está trabalhando em um projeto de SaaS de agendamento
para barbearias, onde o usuário pode se cadastrar, fazer login,
agendar um horário com uma barbearia, visualizar seus agendamentos
e cancelar um agendamento.

Tecnologias utilizadas:

- Next.js
- Tailwind CSS
- TypeScript
- React 19
- Prisma 7 (veja o arquivo @prisma\schema.prisma)
- PostgreSQL
- Docker
- shadcn-ui
- Better Auth para autenticação e autorização.

## REGRAS

- SEMPRE use shadcn-ui para componentes de interface.
- SEMPRE use Prisma para interagir com o banco de dados.
- SEMPRE use Docker para containerizar o banco de dados.
- SEMPRE use Next.js para renderização do lado do servidor.
- SEMPRE use TypeScript para tipar as variáveis e funções.
- SEMPRE use React 19 para renderização do lado do cliente.
- SEMPRE use PostgreSQL como banco de dados.
- SEMPRE use Docker Compose para orquestrar os containers.
- SEMPRE use Next.js API Routes para criar as rotas do backend.
- SEMPRE use JWT para autenticação.
- SEMPRE use bcrypt para criptografar as senhas.
- SEMPRE use zod para validação de dados.
- SEMPRE use Next.js Image Optimization para otimizar as imagens.
- SEMPRE use Next.js Internationalization para internacionalização.
- NUNCA crie componentes do zero antes de verificar se há algum shadcn-ui disponível que atinja seu objetivo.
- NUNCA use cores hard-coded no Tailwind CSS. apenas cores do tema que estão em @app\globals.css.
- SEMPRE use os components que estão em @components\ui\page.tsx
- SEMPRE use o MCP do Context7 para buscar documentação e exemplos de uso.
- NUNCA chame o Prisma de components. SEMPRE crie uma função em @data, assim como é feito em @app\page.tsx.
- Sempre use rem para medidas e nunca px.
- SEMPRE use a biblioteca "lucide-react" para ícones.
- SEMPRE corrija os erros de ESLint e TypeScript.

## Server Actions

- **SEMPRE** use a biblioteca "next-safe-action" para criar as server actions.
- **SEMPRE** use o hook "useAction" da biblioteca "next-safe-action" para chamar as server actions.
- **SEMPRE** use a Server Action @actions\create-booking.ts como base para criar as suas.
- **SEMPRE** faça validação de autorização e autenticação em uma server action conforme o usuário.
- **SEMPRE** use o `protectedActionClient` em actions protegidas (veja @lib\action-client.ts).
- **SEMPRE** crie uma server actions na pasta @actions.
