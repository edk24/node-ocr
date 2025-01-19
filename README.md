# 简单的 node-ocr 服务

## 技术

- tesseract-ocr
- express

## 快速启动

> 前提您已经安装好了 `tesseract-ocr`

```shell
# 安装依赖
$ npm install

# 运行
$ npm run start
```

## Dockerfile

```shell
# 构建镜像并运行一个 demo 容器
$ docker-compose up --build
```

- 服务端口 3000