# # Página de login
[x] Só vai dar sucesso no login se usuario for viniciusrodrigues e senha vuetothemoon
[x] Ao fazer login setar algum atributo no vuex pra definir que de fato essa pessoa fez o login e está autorizada a prosseguir

## Página de listagem
[x] Só pode ser acessada após fazer o login (ou seja verificar se o atributo que foi setado ao fazer login está true)
[x] Caso tentar acessar essa página diretamente é pra enviar o usuário pra tela de login
[] A página deve conter a listagem de cadastros, um botão pra adicionar um novo cadastro (ao clicar irá abrir a modal de cadastro / editar cadastro) e um filtro pra pesquisar por nome.


## Modal de cadastro / editar cadastro
[x] Deve ser uma modal

### Deverá receber as seguintes props:
[x] Se a modal está aberta ou não
[] Receber os dados para serem editados (casa seja edição)

### Deverá enviar os seguintes emits:
[x] emit para fechar a modal
[x] emit para salvar os dados na api

[x] Ao clicar em salvar deverá fazer um emit pra página de listagem e a página de listagem que fará a request pra criação / edição de cadastro

[x] Ao criar um novo registro o mesmo já deve ser listado na página de listagem
[x] Ao editar um registro o mesmo deve ser editado na página de listagem