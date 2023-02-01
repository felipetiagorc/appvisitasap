## 1. O que tem? 

* O layout se adapta a tela de pc, tablet, e celular.
* Exibe modo escuro ou claro conforme preferência do usuário.
* Exibe um formulário para cada documento obrigatório, passando uma matriz do tipo: [{id: 1, tipoDoc: "RG"}, {id: 2, tipoDoc: "CPF"}]
* Permite enviar arquivos de 2 formas: selecionando os que estão salvos ou tirando foto com o celular.
* O arquivo está sendo salvo na pasta 'public/uploads' do próprio projeto através do FileSystem e da biblioteca Multer. 
* Também estão prontas as telas: de login, lista de imagens aguardando análise, perfil do usuário, e uma tela de cadastro. (com dados falsos por enquanto)

## 2. O que falta?
* a lógica de autenticação do usuário (como e quando ele vai acessar o app)
* a lógica de permissão (quando vai poder enviar arquivo, e quais tipos de arquivos - atualmente aceita: jpg, png, e pdf).
* exibir mensagem de sucesso quando o arquivo for salvo no banco
* exibir lista dos arquivos enviados pelo usuário (a tela está pronta, falta sincronizar com os dados reais)
* consertar falha aleatória que ocorre no titulo durante transição de pagina. (possivel problema de sincronizar state do servidor com state do front-end)
* consertar botoes que não fecham sozinho depois de clicado (precisa clicar fora pra fechar)
* Falta implementar como notificar o usuário que o documento foi analisado / ou que há pendência.
* Painel de administração ? (falta sincronizar com dados reais, se necessário)
* Revisar segurança da aplicação.
* Revisar se tem as funcionalidades necessárias.
* Revisar a aparência (cores, brasão)

## Tecnologias:
* Estrutura: [NextJS]  (https://nextjs.org/)
* Framework: [ReactJS]  (https://reactjs.org/)
* Estilos: [TailwindCSS] (https://tailwindcss.com/) + [DaisyUI] (https://daisyui.com/)
* Template: (https://github.com/srobbin01/daisyui-admin-dashboard-template)

# Estrutura de Pastas:

* "components" - componentes comuns e reaproveitáveis do projeto.
* "containers" - componentes relativos ao layout: LeftBar, Header, PageContent, etc.
* "features" - outros recursos que possuem lógica de página. Cada recurso é uma pasta, e pode ter pasta adicional para agrupar diferentes funcionalidades como painel de administração, modals, notificações.
* "pages" - aqui ficam os arquvos que são rotas para paginas. (em cada pagina a gente usa components, containers e features)

## Gerenciamento do estado com Redux Toolkit:

* "/store/slices" - onde fica cada slice individual ('fatias de store' criados com 'createSlice') 
* "/store/store.js" - onde fica o 'configureStore', que conecta cada slice ao store e exporta como 'reducer'  

