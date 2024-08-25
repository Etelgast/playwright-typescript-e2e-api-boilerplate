FROM mcr.microsoft.com/playwright:v1.46.1-jammy

WORKDIR /build

COPY package.json ./

RUN npm i && npx playwright install chromium

COPY . .

