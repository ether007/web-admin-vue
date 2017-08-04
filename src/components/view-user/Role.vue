<template>
  <section>
    <el-col :span="24" class="toolbar" style="">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="form.name" placeholder="角色名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onShowAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table
        ref="table"
        :data="dataRoles"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>


        <el-table-column
          prop="name"
          label="角色名"
          width="120">
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="90">
          <template scope="scope">
            <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
            <el-tag type="gray" v-if="scope.row.status==0">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="permission"
          label="权限"
          show-overflow-tooltip>
          <template scope="scope">
            <span v-for="p in scope.row.permission" :key="p.path">{{p.name}},</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button @click="onShowUpdate(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-row>
        <el-col :span="24" style="margin-top: 8px;text-align: center">
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="20"
              layout="total, prev, pager, next"
              :total="rowCount">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <!-- Form -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio class="radio" v-model="form.status" :label="1">激活</el-radio>
          <el-radio class="radio" v-model="form.status" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <multiselect v-model="form.permission" :options="permissionOptions"
                       :multiple="true" :close-on-select="false"
                       :clear-on-select="false" :hide-selected="true"
                       :preserve-search="true" placeholder="选择权限"
                       label="name" track-by="name">
            <template slot="tag" scope="props">
              <span class="custom__tag"><span>{{ props.option.name }}</span>
                <span class="custom__remove" @click="props.remove(props.option)">❌</span>
              </span>
            </template>
          </multiselect>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: {Multiselect},
    data() {
      return {
        formLabelWidth: "80px",
        dialogFormVisible: false,
        currentPage: 1,
        rowCount: 200,
        permissionOptions: [],
        multipleSelection: [],
        form: {
          id: -1,
          name: '',
          status: 1,
          permission: []
        },
        dataRoles: [
          {id: 1, name: '管理员', status: 1, permission: [{path: '/user/list',name: '用户列表'}, {path: '/user/add',name: '添加用户'}]},
          {id: 2, name: '产品', status: 0, permission: [{path: '/user/delete',name: '删除用户'}, {path: '/user/add',name: '添加用户'}]},
          {id: 3, name: '技术', status: 0, permission: []},
        ]
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange: function (val) {
        this.multipleSelection = val;
      },
      onSubmit: function () {
        console.info('show submit',this.form);
      },
      onShowAdd: function () {
        this.form = {
          id: -1,
          name: '',
          status: 1,
          permission: []
        }
        this.dialogFormVisible = true;
        this.permissionOptions = this.$store.getters.leafPermission
      },
      onShowUpdate: function (row) {
        this.form = {
          id: row.id,
          name: row.name,
          status: row.status,
          permission: row.permission
        }
        this.dialogFormVisible = true;
        this.permissionOptions = this.$store.getters.leafPermission
      },
      handleDeleteClick: function(row){
        console.info('del',row.id);
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

