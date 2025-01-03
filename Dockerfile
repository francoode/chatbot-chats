FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install typescript
EXPOSE 3000
CMD ["npm", "run", "start:dev"]