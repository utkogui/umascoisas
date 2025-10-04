# WooCommerce Headless E-commerce

Uma loja online headless construída com Next.js e WooCommerce, sem uso de Docker.

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: WordPress + WooCommerce
- **Banco de Dados**: MySQL
- **Estado**: Zustand
- **API**: WooCommerce REST API

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://www.mysql.com/) (versão 8.0 ou superior)
- [PHP](https://www.php.net/) (versão 8.0 ou superior)
- [Composer](https://getcomposer.org/)
- [WP-CLI](https://wp-cli.org/)

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd woo-headless-ecommerce
```

### 2. Instale as dependências do frontend

```bash
npm install
```

### 3. Configure o banco de dados

```bash
# Crie o banco de dados
mysql -u root -p -e "CREATE DATABASE woo_headless;"
```

### 4. Configure o WordPress

```bash
# Execute o script de configuração
./scripts/setup-wordpress.sh
```

### 5. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite o arquivo .env.local com suas configurações
nano .env.local
```

### 6. Inicie o servidor de desenvolvimento

```bash
# Terminal 1 - Frontend Next.js
npm run dev

# Terminal 2 - WordPress (usando PHP built-in server)
cd wordpress
php -S localhost:8080
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# WooCommerce API Configuration
WOOCOMMERCE_URL=http://localhost:8080
WOOCOMMERCE_CONSUMER_KEY=ck_sua_chave_aqui
WOOCOMMERCE_CONSUMER_SECRET=cs_sua_chave_secreta_aqui

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui

# Database Configuration
DB_NAME=woo_headless
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_HOST=localhost
```

### Obter Chaves da API WooCommerce

1. Acesse: `http://localhost:8080/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys`
2. Clique em "Add key"
3. Preencha:
   - **Description**: Headless Store
   - **User**: api_user
   - **Permissions**: Read/Write
4. Copie as chaves geradas para o arquivo `.env.local`

## 📁 Estrutura do Projeto

```
woo-headless-ecommerce/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── Header.tsx         # Cabeçalho da loja
│   ├── ProductCard.tsx    # Card do produto
│   ├── ProductGrid.tsx    # Grid de produtos
│   └── Loading.tsx        # Componente de loading
├── hooks/                 # Hooks customizados
│   ├── useProducts.ts     # Hook para produtos
│   └── useCart.ts         # Hook para carrinho
├── lib/                   # Utilitários e configurações
│   └── woocommerce.ts     # Cliente da API WooCommerce
├── scripts/               # Scripts de configuração
│   └── setup-wordpress.sh # Script de setup do WordPress
├── wordpress/             # Instalação do WordPress
└── README.md              # Este arquivo
```

## 🎨 Funcionalidades

### ✅ Implementadas

- [x] Listagem de produtos
- [x] Interface responsiva
- [x] Integração com WooCommerce API
- [x] Sistema de carrinho (localStorage)
- [x] Filtros por status de estoque
- [x] Design moderno com Tailwind CSS

### 🚧 Em Desenvolvimento

- [ ] Página de detalhes do produto
- [ ] Sistema de checkout
- [ ] Autenticação de usuários
- [ ] Filtros e busca
- [ ] Páginas de categoria
- [ ] Sistema de avaliações

## 🔌 API Endpoints

O projeto utiliza a WooCommerce REST API v3:

- **Produtos**: `/wp-json/wc/v3/products`
- **Categorias**: `/wp-json/wc/v3/products/categories`
- **Pedidos**: `/wp-json/wc/v3/orders`
- **Clientes**: `/wp-json/wc/v3/customers`

## 🛒 Gerenciamento do Carrinho

O carrinho é gerenciado localmente usando Zustand com persistência no localStorage. Para implementar um carrinho server-side, considere:

1. Usar um plugin de carrinho headless
2. Implementar um sistema de sessões
3. Usar um serviço externo como Snipcart

## 🚀 Deploy

### Frontend (Vercel)

```bash
# Instale a Vercel CLI
npm i -g vercel

# Faça o deploy
vercel
```

### Backend (Servidor)

1. Configure um servidor web (Apache/Nginx)
2. Configure PHP e MySQL
3. Faça upload dos arquivos do WordPress
4. Configure as variáveis de ambiente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todos os pré-requisitos estão instalados
2. Confirme se as variáveis de ambiente estão corretas
3. Verifique os logs do WordPress e Next.js
4. Abra uma issue no GitHub

## 📚 Recursos Úteis

- [Documentação do WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do Zustand](https://github.com/pmndrs/zustand)
