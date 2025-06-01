![image](./docs/main-interface.png)

# Wartale XP Calculator 🎮📈

Uma calculadora de experiência (XP) para o servidor **Wartale** do jogo **Priston Tale**.  
Com ela, jogadores podem estimar quanto tempo levarão para alcançar um determinado nível com base no rendimento atual de
XP em campo.

## ✨ Funcionalidades

- Cálculo de tempo estimado para subir de nível.
- Temporizador de 60 segundos com alerta sonoro para registrar o rendimento de XP.
- Registro e reutilização dos dados dos personagens para evitar reentradas manuais.
- Interface amigável desenvolvida com React.

## 🧑‍💻 Tecnologias

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Docker](https://www.docker.com/) / [Podman](https://podman.io/) para containerização e execução da aplicação

## 🕹️ Para quem é este projeto?

Feito para jogadores do **Wartale**, servidor alternativo do clássico MMORPG **Priston Tale**, que desejam otimizar seu
tempo de evolução.

## ☁️ Infraestrutura

O projeto está hospedado em uma máquina **EC2** da **Amazon Web Services (AWS)** e tem CI/CD automatizado configurado,
utilizando o Github Actions para o deploy.

## 📦 Instalação e execução

Para rodar o projeto localmente, você precisará do **Docker** ou **Podman** instalado na sua máquina. Todas as
dependências da aplicação são gerenciadas dentro do container.

### Passos para rodar

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/wartale-xp-calculator.git
   cd wartale-xp-calculator
   ```

2. Executando o container

- Caso você use o Docker:
  ```
  ./run-container-docker.sh
  ```
- Caso você use o Podman:

  ```
  ./run-container-podman.sh
  ```

  Dependendo do sistema operacional, pode ser necessário tornar o script executável com o comando:

  ```
  chmod +x ./run-container-{podman | docker}.sh
  ```
