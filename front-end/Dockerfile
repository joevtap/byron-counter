FROM node:20.17-alpine

WORKDIR /app
COPY . .

ARG PORT

EXPOSE ${PORT}

RUN ["npm", "i", "-g", "pnpm"]
RUN ["pnpm", "install"]
RUN ["pnpm", "run", "build"]
CMD ["node", "build"]