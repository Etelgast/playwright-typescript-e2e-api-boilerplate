FROM mcr.microsoft.com/playwright:v1.46.1-jammy

RUN apt-get update && apt-get install -y --no-install-recommends openjdk-8-jdk

WORKDIR /app

COPY package*.json ./

RUN npm ci && npx playwright install chromium

COPY . .

