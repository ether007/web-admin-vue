<template>
   <span>
     <span>

       <span>{{node.label}}</span>
       <span style="margin-left: 10px">{{data.path}}</span>
       <span style="margin-left: 10px"><el-tag type="success">激活</el-tag></span>
     </span>
     <span style="float: right; margin-right: 20px" hidden>
              <el-button size="mini" type="warning" @click="append(store, data)">添加</el-button>
              <el-button size="mini" type="info" @click="update(store, node)">修改</el-button>
              <el-button size="mini" type="danger" @click="remove(store, data)">删除</el-button>
     </span>
   </span>
</template>
<script>
  export default {
    data() {
      return{}
    },
    props: {
      node: {
        required: true
      }, data: {
        required: true
      }, store: {
        required: true
      }, remove: {
        required: true
      }, append: {
        required: true
      }, update: {
        required: true
      }
    },
    methods: {}
  }
</script>

<style>
  span{

  }
</style>
