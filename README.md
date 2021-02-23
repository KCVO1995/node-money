# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### 创建数据库
```bash
docker run --name money -v "$PWD/money-data":/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=kcvo -d mysql:5.7
```

### 进入容器&登录mysql
```bash
docker exec -it id bash
mysql -u root -p
```

### 初始化数据库

```bash
CREATE DATABASE money_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE money_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### docker

```bash
docker build -t node-money/node-web-app .
docker run -p 7001:7001 -d node-money/node-web-app
```
