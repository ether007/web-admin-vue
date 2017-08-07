<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="form.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="form.region" placeholder="城市">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="primary" @click="onShowAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>


        <el-table-column
          prop="userName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="userAccount"
          label="姓名"
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
          label="注册日期"
          width="180">
          <template scope="scope">{{ parseTime(scope.row.gmt_create) }}</template>
        </el-table-column>

        <el-table-column
          prop="role"
          label="角色"
          show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.issys==1">系统管理员</span>
            <span v-for="p in scope.row.roles" :key="p.id">{{p.roleName}},</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.userAccount" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <multiselect v-model="form.roles" :options="roleOptions"
                       :multiple="true" :close-on-select="false"
                       :clear-on-select="false" :hide-selected="true"
                       :preserve-search="true" placeholder="选择权限"
                       label="roleName" track-by="id">
            <template slot="tag" scope="props">
              <span class="custom__tag"><span>{{ props.option.roleName }}</span>
                <span class="custom__remove" @click="props.remove(props.option)">❌</span>
              </span>
            </template>
          </multiselect>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- end Form -->
  </section>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import {requestUserList,requestRoleList} from '../../api'
  import {parseTime} from '../../utils'
  export default {
    components: {Multiselect},
    data() {
      return {
        roleOptions:[],
        formLabelWidth: "100px",
        dialogFormVisible: false,
        currentPage: 5,
        pageSize: 20,
        rowCount: 1009,
        form: {
          id:-1,
          userName: '',
          roles:[],
          password:'',
          userAccount:''
        },
        tableData: [],
        multipleSelection: []
      }
    },
    mounted: function () {
      this.fetchData()
    },
    methods: {
      parseTime(date){
        return parseTime(date)
      },
      fetchData(){
        requestUserList().then(data=>{
         this.tableData = data.data.data.content
        });
        requestRoleList().then(data=>{
          let d = data.data.data;
          this.roleOptions = d.content;
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(row) {
        console.info('look look', row);
      },
      onSubmit() {
        console.log('submit!',this.form);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onShowAdd() {
        this.dialogFormVisible = true;
      }

    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
