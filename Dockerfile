FROM mcr.microsoft.com/playwright:v1.46.1-jammy

RUN apt-update && apt-get install openjdk-8-jdk

WORKDIR /build

COPY package*.json ./

RUN npm ci && npx playwright install chromium

COPY . .

