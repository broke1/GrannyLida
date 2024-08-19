FROM nginx:alpine

WORKDIR /usr/share/nginx

# COPY ./dist /usr/share/nginx/html

# COPY ./Catalog /usr/share/nginx/Catalog

COPY ./nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

