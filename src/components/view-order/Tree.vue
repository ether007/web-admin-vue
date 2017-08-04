<template>
<div>
  <section>
    <el-col :span="24"></el-col>
    <el-row>
      <el-col :span="12">
        <el-tree
          :data="permissionRouter"
          show-checkbox
          node-key="path"
          ref="tree"
          highlight-current
          :props="permissionRouterProps">
        </el-tree>
      </el-col>
    </el-row>


    <el-col :span="24">
      <div class="buttons">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </div>
    </el-col>

  </section>
</div>
</template>

<script>
  import {permissionRouter} from '../../router'

  export default {
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          path: '/g',
          name: '商品'
        }, {
          path: '/tree',
          name: 'tree'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys(['/d']);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    data() {
      return {
        permissionRouter:permissionRouter,
        permissionRouterProps:{
          children: 'children',
          label: 'name',
          id:'path'
        }
      };
    }
  };
</script>
