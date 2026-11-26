
# Stage 1: Build React + Vite application
FROM node:22-alpine AS builder

WORKDIR /app

# Public Vite configuration is embedded at build time; do not pass secrets here.
ARG VITE_SITE_URL=https://duromaker.vercel.app
ARG VITE_GA_MEASUREMENT_ID=
ARG VITE_GTM_ID=
ARG VITE_FB_PIXEL_ID=
ENV VITE_SITE_URL=${VITE_SITE_URL} \
    VITE_GA_MEASUREMENT_ID=${VITE_GA_MEASUREMENT_ID} \
    VITE_GTM_ID=${VITE_GTM_ID} \
    VITE_FB_PIXEL_ID=${VITE_FB_PIXEL_ID}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build production website
RUN npm run build

# Stage 2: Run website using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/security-headers.conf

# Copy production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose web server port
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/health.json || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
