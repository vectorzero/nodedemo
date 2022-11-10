"use strict"

console.log()
process.on("exit", () => {
  console.log()
})

// 第一个参数没传递报错，退出进程
if (!process.argv[2]) {
  console.error("[文件名]必填 - Please enter new file name")
  process.exit(1)
}

// 路径模块
const path = require("path")
// 文件模块
const fs = require("fs")
// 保存文件
const fileSave = require("file-save")

// 参数
const fileName = process.argv[2]

const Files = [
  {
    filename: `index.vue`,
    content: `
<template>
  <div></div>
</template>
<script>
export default {
  name: '${fileName}'
};
</script>`,
  },
]
const filePath = path.resolve(__dirname, "./demo/pages", fileName)
Files.forEach((file) => {
  fileSave(path.join(filePath, file.filename))
    .write(file.content, "utf8")
    .end("\n")
})
