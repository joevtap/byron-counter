FROM node:20.17-alpine

WORKDIR /app
COPY . .

ARG APP_PORT

EXPOSE ${APP_PORT}

RUN ["npm", "i", "-g", "pnpm"]
RUN ["pnpm", "install"]
CMD ["pnpm", "exec", "tsx", "src/main.ts"]