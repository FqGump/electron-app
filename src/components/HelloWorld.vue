<script setup>

let fileList = [], 

handleRemove = function (file, fileList) {
  console.log(file, fileList)
},
handlePreview = function (file) {
  console.log(file)
},
handleExceed = function (files, fileList) {
  this.$message.warning(
    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
    } 个文件`
  )
},
beforeRemove = function (file, fileList) {
  return this.$confirm(`确定移除 ${file.name}？`)
}

</script>

<template>

  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
    :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
    </template>
  </el-upload>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
