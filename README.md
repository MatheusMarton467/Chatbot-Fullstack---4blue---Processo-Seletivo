# Chatbot-Fullstack---4blue---Processo-Seletivo

Aplicação de um chatbot para avaliação do processo seletivo da 4blue para Dev Full Stack Jr


------------------------Projeto----------------------------------

Este projeto é um protótipo Fullstack (Backend + Frontend) de um sistema de chat. O objetivo é simular a interação de dois usuários (A ou B) com um Chatbot, garantindo que todas as conversas sejam salvas em um banco de dados e que o histórico seja corretamente filtrado por usuário.


-------------------Como Rodar Localmente--------------------------------------

Para rodar o projeto, você precisará ter o Python e o Node.js instalados em sua máquina.

----------------------------Pastas--------------------------------------

Certifique-se de que o projeto esteja organizado da seguinte forma:

chatbot-atendimento/
├── manage.py (Django)
└── frontend/ 
    └── SRC
      └── App.js(React)


------------------Inicialização do Backend (Django)-----------------------

-Navegue até a pasta chatbot-atendimento:

cd chatbot-atendimento

-Ativação do ambiente virtual:

.\venv-backend\Scripts\activate

-Instale as dependências:

pip install django djangorestframework


-Execute as migrações para criar o banco de dados e as tabelas:

python manage.py migrate

-Inicie o servidor Django:

python manage.py runserver


-O servidor da API estará disponível em http://localhost:8000

----------------------------Configuração e Inicialização do Frontend (React)-------------------------

Abra um segundo terminal e navegue até a pasta do frontend:

cd ../frontend


Instale as dependências do React:

npm install


Inicie o aplicativo React:

npm start


O aplicativo será aberto no seu navegador, geralmente em http://localhost:3000

-------------------- Decisões Modelagem --------------------------------------------------------

Foi utiliziado apenas um único Model (Mensagem) para armazenar o par Pergunta-Resposta, com as variaveis :

usuario ----> Guarda qual usuario enviou a mensagem

texto -----> A mensagem enviada pelo usuário

resposta_chatbot --------> A resposta pré definida para o bot

data_envio ---------> Guarda a hora e data enviada da mensagem para fins de melhor clareza de quando foi recebida a mensagem do usuario

Esta estrutura simples faz toda a interação com o usuario coletando os dados da mensagem como conteudo e data e hora da mesma , e tambem respondendo o mesmo com o chat.

------------------- Gerenciamento de Estado  ------------------------------------------------

Usuário Ativo: O activeUser é a variavel onde guarda qual o usuario logado e é passado para todos os componentes que precisam saber qual usuário está logado.

Mensagens: As mensagens do chat e o histórico são gerenciados usando useState, garantindo que os cadastros ou consultas sejam feitas apenas para o usuario que o useState aponta ser o ativo.

