# ==========================================================
# Dockerfile per al Frontend de KernelCore (React 19 + Vite + Nginx)
# Multi-stage build per a màxima lleugeresa i seguretat
# ==========================================================

# Etapa 1: Compilació de l'aplicació
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor web d'alt rendiment Nginx
FROM nginx:alpine

# Copiar fitxer de configuració de Nginx amb proxy invers
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar els fitxers compilats de l'etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposar port HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
