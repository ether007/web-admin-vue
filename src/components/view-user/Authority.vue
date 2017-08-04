<template>
  <section>
    <el-col>
      <el-col :span="8" class="toolbar" style="">
        <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      </el-col>
    </el-col>

    <el-col :span="24" style="">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        highlight-current
        show-checkbox
        node-key="path"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>
    </el-col>
  </section>
</template>

<script>
  import AuthorityTreeNode from './AuthorityTreeNode'
  import {permissionRouter} from '../../router'

  //获取节点的所有叶子节点
  function leafNode(node, prefix) {
    let leafs = [];
    let children = node.children;
    let action = node.action;
    leafs.push({name: prefix + node.name, path: node.path})
    if (!!action) {
      prefix += "--"
      for (let a of action) {
        leafs.push({name: prefix + a.name, path: a.path})
      }
    }
    if (!!children) {
      prefix += "--"
      for (let a of children) {
        leafs = leafs.concat(leafNode(a, prefix));
      }
    }
    return leafs;
  }


  export default {
    data() {
      return {
        form: {
          id: -1,
          label: '',
          requestPath: '',
          routerPath: '',
          parentId: -1,
          parentLabel: '',
          type: 1
        },
        dialogFormVisible: false,
        formLabelWidth: "80px",
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'path'
        }
      }
    },

    methods: {
      update(store, node) {
        this.dialogFormVisible = true;
      },
      appendRoot() {
        this.dialogFormVisible = true;
      },
      append(store, data) {
        this.dialogFormVisible = true;
      },
      remove(store, data) {
        console.info(store);
        store.remove(data);
      },
      renderContent(h, {node, data, store}) {
        return h(AuthorityTreeNode, {
          props: {
            node: node,
            data: data,
            store: store,
            remove: this.remove,
            append: this.append,
            update: this.update
          }
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    },
    computed: {
      menus: function () {
        let leafs = [];
        for (var node of permissionRouter) {
          leafs = leafs.concat(leafNode(node, ""));
        }
        return leafs;
      }
    },
    mounted: function () {
      this.treeData = permissionRouter;
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  };

</script>
