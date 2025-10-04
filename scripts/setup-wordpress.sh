#!/bin/bash

# Script para configurar WordPress e WooCommerce
# Execute este script após instalar o WordPress

echo "🚀 Configurando WordPress e WooCommerce..."

# Verificar se WP-CLI está instalado
if ! command -v wp &> /dev/null; then
    echo "❌ WP-CLI não encontrado. Instalando..."
    curl -O https://raw.githubusercontent.com/wp-cli/wp-cli/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    sudo mv wp-cli.phar /usr/local/bin/wp
fi

# Navegar para o diretório do WordPress
cd wordpress

# Baixar WordPress se não existir
if [ ! -f "wp-config.php" ]; then
    echo "📥 Baixando WordPress..."
    wp core download
fi

# Criar configuração do banco se não existir
if [ ! -f "wp-config.php" ]; then
    echo "⚙️ Criando configuração do banco..."
    wp config create --dbname=woo_headless --dbuser=root --dbpass= --dbhost=localhost
fi

# Instalar WordPress se não estiver instalado
if ! wp core is-installed; then
    echo "🔧 Instalando WordPress..."
    wp core install --url=localhost:8080 --title="WooCommerce Store" --admin_user=admin --admin_password=admin --admin_email=admin@example.com
fi

# Instalar e ativar WooCommerce
echo "🛒 Instalando WooCommerce..."
wp plugin install woocommerce --activate

# Instalar plugins úteis para headless
echo "📦 Instalando plugins adicionais..."
wp plugin install woocommerce-rest-api --activate
wp plugin install jwt-authentication-for-wp-rest-api --activate
wp plugin install cors --activate

# Configurar WooCommerce
echo "⚙️ Configurando WooCommerce..."
wp option update woocommerce_currency "BRL"
wp option update woocommerce_currency_pos "left"
wp option update woocommerce_price_thousand_sep "."
wp option update woocommerce_price_decimal_sep ","
wp option update woocommerce_price_num_decimals 2

# Criar algumas páginas necessárias
echo "📄 Criando páginas..."
wp post create --post_type=page --post_title="Carrinho" --post_name="carrinho" --post_status=publish
wp post create --post_type=page --post_title="Checkout" --post_name="checkout" --post_status=publish
wp post create --post_type=page --post_title="Minha Conta" --post_name="minha-conta" --post_status=publish

# Configurar permissões para API
echo "🔐 Configurando permissões da API..."
wp option update rest_enabled 1
wp option update rest_authentication_require_api_key 0

# Criar usuário para API
echo "👤 Criando usuário para API..."
wp user create api_user api@example.com --role=administrator --user_pass=api123

echo "✅ Configuração concluída!"
echo ""
echo "📋 Informações importantes:"
echo "   - URL do WordPress: http://localhost:8080"
echo "   - Admin: admin / admin"
echo "   - API User: api_user / api123"
echo ""
echo "🔑 Para obter as chaves da API:"
echo "   1. Acesse: http://localhost:8080/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys"
echo "   2. Clique em 'Add key'"
echo "   3. Descrição: 'Headless Store'"
echo "   4. Usuário: api_user"
echo "   5. Permissões: Read/Write"
echo "   6. Copie as chaves geradas para o arquivo .env.local"
