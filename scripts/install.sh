#!/bin/bash

# Script de instalação completa do WooCommerce Headless
# Execute este script para configurar todo o ambiente

set -e

echo "🚀 Iniciando instalação do WooCommerce Headless E-commerce..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "Execute este script no diretório raiz do projeto"
    exit 1
fi

# 1. Verificar pré-requisitos
echo "🔍 Verificando pré-requisitos..."

# Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi
print_status "Node.js $(node -v) encontrado"

# MySQL
if ! command -v mysql &> /dev/null; then
    print_error "MySQL não encontrado. Instale MySQL primeiro."
    exit 1
fi
print_status "MySQL encontrado"

# PHP
if ! command -v php &> /dev/null; then
    print_error "PHP não encontrado. Instale PHP 8.0+ primeiro."
    exit 1
fi
print_status "PHP $(php -v | head -n1) encontrado"

# WP-CLI
if ! command -v wp &> /dev/null; then
    print_warning "WP-CLI não encontrado. Instalando..."
    curl -O https://raw.githubusercontent.com/wp-cli/wp-cli/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    sudo mv wp-cli.phar /usr/local/bin/wp
    print_status "WP-CLI instalado"
else
    print_status "WP-CLI encontrado"
fi

# 2. Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
npm install
print_status "Dependências do frontend instaladas"

# 3. Configurar banco de dados
echo "🗄️ Configurando banco de dados..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS woo_headless;" 2>/dev/null || {
    print_warning "Não foi possível criar o banco automaticamente. Crie manualmente:"
    echo "mysql -u root -p -e 'CREATE DATABASE woo_headless;'"
    read -p "Pressione Enter após criar o banco de dados..."
}
print_status "Banco de dados configurado"

# 4. Configurar WordPress
echo "🔧 Configurando WordPress..."
if [ ! -d "wordpress" ]; then
    mkdir wordpress
fi

cd wordpress

# Baixar WordPress
if [ ! -f "wp-config.php" ]; then
    wp core download
    print_status "WordPress baixado"
fi

# Criar configuração
if [ ! -f "wp-config.php" ]; then
    wp config create --dbname=woo_headless --dbuser=root --dbpass= --dbhost=localhost
    print_status "Configuração do WordPress criada"
fi

# Instalar WordPress
if ! wp core is-installed; then
    wp core install --url=localhost:8080 --title="WooCommerce Store" --admin_user=admin --admin_password=admin --admin_email=admin@example.com
    print_status "WordPress instalado"
fi

# Instalar WooCommerce
wp plugin install woocommerce --activate
print_status "WooCommerce instalado e ativado"

# Instalar plugins úteis
wp plugin install woocommerce-rest-api --activate
wp plugin install jwt-authentication-for-wp-rest-api --activate
wp plugin install cors --activate
print_status "Plugins adicionais instalados"

# Configurar WooCommerce
wp option update woocommerce_currency "BRL"
wp option update woocommerce_currency_pos "left"
wp option update woocommerce_price_thousand_sep "."
wp option update woocommerce_price_decimal_sep ","
wp option update woocommerce_price_num_decimals 2
print_status "WooCommerce configurado para Brasil"

# Criar usuário para API
wp user create api_user api@example.com --role=administrator --user_pass=api123 2>/dev/null || {
    print_warning "Usuário api_user já existe"
}
print_status "Usuário para API criado"

cd ..

# 5. Configurar arquivo de ambiente
echo "⚙️ Configurando variáveis de ambiente..."
if [ ! -f ".env.local" ]; then
    cp env.example .env.local
    print_status "Arquivo .env.local criado"
    print_warning "IMPORTANTE: Edite o arquivo .env.local com suas configurações"
else
    print_warning "Arquivo .env.local já existe"
fi

# 6. Criar diretórios necessários
echo "📁 Criando estrutura de diretórios..."
mkdir -p components hooks lib scripts
print_status "Estrutura de diretórios criada"

# 7. Finalizar
echo ""
echo "🎉 Instalação concluída com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo .env.local com suas configurações"
echo "2. Obtenha as chaves da API WooCommerce:"
echo "   http://localhost:8080/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys"
echo "3. Inicie os servidores:"
echo "   Terminal 1: npm run dev (Frontend - http://localhost:3000)"
echo "   Terminal 2: cd wordpress && php -S localhost:8080 (WordPress)"
echo ""
echo "🔑 Credenciais:"
echo "   WordPress Admin: admin / admin"
echo "   API User: api_user / api123"
echo ""
echo "📚 Documentação: README.md"
