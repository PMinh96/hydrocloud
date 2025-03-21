FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và yarn.lock vào thư mục làm việc
COPY package.json yarn.lock* package-lock.json* ./

# Cài đặt dependencies của dự án
RUN yarn install

COPY . .

RUN yarn build

# Cấu hình biến môi trường cho prod
ENV NODE_ENV=production

# Expose cổng mà ứng dụng Next.js sẽ chạy
EXPOSE 3000

CMD ["yarn", "start"]