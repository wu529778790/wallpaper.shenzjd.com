# 使用官方Node.js运行时镜像作为基础镜像
FROM node:19-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./
# 复制pnpm-lock.yaml到工作目录
COPY pnpm-lock.yaml ./

# 复制项目源代码到工作目录, 排除掉src/client下的文件
COPY src/server ./src/server
COPY public ./public
COPY dist ./dist

# 安装项目依赖
RUN npm install pnpm -g
# 使用pnpm安装生产依赖
RUN pnpm install

# 暴露应用端口
EXPOSE 80

# 启动应用
CMD ["npm", "start"]