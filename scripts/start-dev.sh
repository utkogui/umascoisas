#!/bin/bash

# Script para iniciar os servidores de desenvolvimento
# Frontend (Next.js) e Backend (WordPress)

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando servidores de desenvolvimento...${NC}"
echo ""

# Verificar se os arquivos de configuração existem
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env.local não encontrado. Copiando do exemplo...${NC}"
    cp env.example .env.local
    echo -e "${YELLOW}📝 Edite o arquivo .env.local com suas configurações${NC}"
fi

# Função para iniciar o frontend
start_frontend() {
    echo -e "${GREEN}🌐 Iniciando frontend Next.js...${NC}"
    echo "   URL: http://localhost:3000"
    npm run dev
}

# Função para iniciar o backend
start_backend() {
    echo -e "${GREEN}🔧 Iniciando backend WordPress...${NC}"
    echo "   URL: http://localhost:8080"
    echo "   Admin: http://localhost:8080/wp-admin"
    echo ""
    
    cd wordpress
    php -S localhost:8080 -c php.ini
}

# Verificar argumentos
case "${1:-both}" in
    "frontend"|"f")
        start_frontend
        ;;
    "backend"|"b")
        start_backend
        ;;
    "both"|"")
        echo -e "${YELLOW}💡 Dica: Use './scripts/start-dev.sh frontend' ou './scripts/start-dev.sh backend' para iniciar apenas um servidor${NC}"
        echo ""
        
        # Iniciar backend em background
        start_backend &
        BACKEND_PID=$!
        
        # Aguardar um pouco para o backend inicializar
        sleep 3
        
        # Iniciar frontend
        start_frontend
        
        # Limpar processo do backend quando o frontend for encerrado
        trap "kill $BACKEND_PID 2>/dev/null" EXIT
        ;;
    *)
        echo "Uso: $0 [frontend|backend|both]"
        echo "  frontend (f) - Inicia apenas o frontend Next.js"
        echo "  backend (b)  - Inicia apenas o backend WordPress"
        echo "  both (padrão) - Inicia ambos os servidores"
        exit 1
        ;;
esac
