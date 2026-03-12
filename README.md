# Todo App
講義で学んだ知識を利用し、Node.js/JavaScriptを利用したTodoリストの作成を行なった
## 使用技術一覧
<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
</p>

## 機能
・タスクの追加  
・タスクの削除  
・Enterキーでのタスクの追加  
・残り件数の表示

## 使い方
dockerを使ってmongoDBを起動する  
$ docker run --rm --name=my-app-db -p 27017:27017 mongo 
serverを起動する  
$ npm install  
$ node index.js  
ブラウザでアクセス  
http://localhost:3000  

## ディレクトリ構成
❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
todo_app
├── .node_modules
├── .public
│   └── index.js
├── .views
│   └── index.ejs
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── todo.js
