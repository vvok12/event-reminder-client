FROM node:22-alpine AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS production
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/entrypoint.sh .
RUN chmod +x ./entrypoint.sh
RUN npm ci --omit dev
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]