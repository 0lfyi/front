#########################################
#              FIRST STAGE              #
#########################################

FROM node:19.0.1 AS builder

ARG CI_COMMIT_SHA=""
ENV REACT_APP_CI_COMMIT_SHA $CI_COMMIT_SHA

ENV REACT_APP_API_HOST "https://api.0l.fyi"

RUN npm install -g npm

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

#########################################
#             SECOND STAGE              #
#########################################

FROM nginx:1.23.0

COPY --from=builder /app/build /app

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

