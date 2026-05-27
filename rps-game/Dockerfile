# ── Stage 1: Build ─────────────────────────────────────────────────
# No build step needed for plain HTML/CSS/JS
# We serve directly via nginx

# ── Stage 2: Serve ─────────────────────────────────────────────────
FROM nginx:1.25-alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy app files
COPY index.html /usr/share/nginx/html/
COPY style.css  /usr/share/nginx/html/
COPY app.js     /usr/share/nginx/html/
COPY assets/    /usr/share/nginx/html/assets/

# Custom nginx config for SPA-friendly serving
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]