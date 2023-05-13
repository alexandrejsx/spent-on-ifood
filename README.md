# spent-on-ifood

Descubra quanto você gastou no Ifood.

## Como utilizar

1. Clonar o repositório em seu computador
2. Criar um arquivo `.env` na raiz do projeto, e adicionar a variável `IFOOD_TOKEN` com o valor do seu token de autenticação para a API
3. Abrir o terminal na raiz do projeto e instalar as dependências com o comando `yarn`
4. Executar o script com o comando `yarn start`

O script irá imprimir no console o resultado das requisições para o endpoint de pedidos, até que a data de criação do último pedido seja maior que a data informada.

## Observações

- Certifique-se de ter o Node.js instalado em seu computador
- A data informada para comparação está no arquivo `index.ts`, na constante `date`
