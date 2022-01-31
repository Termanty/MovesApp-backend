# MovesApp-backend

Node/Express backend for dance moves application.

## to run

```shell
npm install
```

## npm and TypeScript initialisation

```shell
npm init
```

```shell
npm install --save-dev ts-node typescript
```

```shell
tsc --init
```

```shell
npm install express
npm install typescript ts-node @types/node @types/express --save-dev
```

### package.json file

- "scripts": {
  "start": "ts-node index.ts",

### tsconfig file

- "outDir": "./dist"
- "rootDir": "./src"

to end added:

- "exclude": [
  "node_modules"
  ],

- "watch": true'

## Git commands **reminder**

- (for first time git glone)
- git checkout main
- git pull origin main
- git checkout -b <new branch name>
- git add .
- git commit -m "magic added"
- git push -u origin <branch name>
