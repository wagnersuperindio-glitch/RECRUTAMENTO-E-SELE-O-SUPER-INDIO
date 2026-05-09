# Publicacao da Pagina Publica no GitHub Pages

## O que este pacote publica

Esta pasta foi preparada para publicar a **pagina publica de vagas e cadastro** da rede.

Ela inclui:

- visual da pagina publica;
- artes da marca;
- vagas abertas em JSON estatico;
- fallback para GitHub Pages;
- formulario em modo publico com envio por e-mail ao RH.

## O que nao vai para o GitHub Pages

O **dashboard interno com login** nao deve ir para o GitHub Pages.

Motivo:

- o dashboard usa autenticacao;
- o dashboard depende de API e backend;
- GitHub Pages publica site estatico, nao servidor dinamico.

## Estrutura desta pasta

- `index.html`
- `styles.css`
- `app.js`
- `assets/`
- `data/site-config.json`
- `.nojekyll`

## Como publicar

### Opcao recomendada

1. Criar um repositório novo no GitHub
2. Subir o conteudo desta pasta na raiz do repositório
3. Ir em `Settings > Pages`
4. Em `Build and deployment`, escolher:
   - `Deploy from a branch`
   - branch `main`
   - pasta `/ (root)`
5. Salvar

Depois disso, o GitHub Pages deve gerar um link fixo como:

- `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## Como a pagina se comporta

### Quando estiver no servidor local

Se a pagina conseguir acessar:

- `/api/site-config`
- `/api/site-lead`

ela continua operando integrada ao backend local.

### Quando estiver no GitHub Pages

Ela muda automaticamente para **modo estatico publico**:

- carrega dados de `data/site-config.json`
- mostra vagas publicas
- abre o e-mail do RH no envio do formulario

## Ajustes recomendados antes de divulgar

- revisar o arquivo `data/site-config.json`
- trocar ou atualizar vagas publicadas
- revisar WhatsApp do RH
- revisar e-mail do RH

## Direcao final

Use este pacote para criar um link fixo gratuito da **pagina publica de candidatos**.

Mantenha o **dashboard interno** no ambiente protegido da empresa.
