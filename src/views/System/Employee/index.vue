<template>
  <div class="employee-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">员工姓名：</div>
      <el-input v-model="params.name" clearable placeholder="请输入内容" class="search-main" @clear="doSearch" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="addEmployee">添加员工</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="employeeList">
        <el-table-column type="index" label="序号" />
        <el-table-column label="员工姓名" width="120" prop="name" />
        <el-table-column label="登录账号" width="120" prop="userName" />
        <el-table-column label="联系方式" width="120" prop="phonenumber" />
        <el-table-column label="角色" width="120" prop="roleName" />
        <el-table-column label="状态" width="60">
          <template #default="scope">
            {{ scope.row.status===1?'启用':'禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="添加时间" prop="createTime" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delEmployee(scope.row.id)">删除</el-button>
            <el-button size="mini" type="text" @click="resetUser(scope.row.id)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :page-size="params.pageSize"
        :total="total"
        @current-change="pageChange"
      />
    </div>
    <!-- 添加员工弹窗 -->
    <el-dialog
      ref="addForm"
      custom-class="openAnimAbcd"
      :title="addForm.id?'编辑员工': '添加员工'"
      :visible="dialogVisible"
      width="480px"
      @close="closeDialog"
      @open="openDialog"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="80px">
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="登录账号" prop="userName">
            <el-input v-model="addForm.userName" />
          </el-form-item>
          <el-form-item label="联系方式" prop="phonenumber">
            <el-input v-model="addForm.phonenumber" />
          </el-form-item>
          <el-form-item label="分配角色" prop="roleId">
            <el-select v-model="addForm.roleId" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="员工状态" prop="status">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleListAPI } from '@/api/system'
import { getUserListAPI, createEmployeeAPI, delEmployeeAPI, editEmployeeAPI, resetEmployeeAPI, getEmployeeAllAPI } from '@/api/employee'

export default {
  name: 'Employee',
  data() {
    return {
      employeeList: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
        name: '' // 员工姓名
      },
      dialogVisible: false, // 控制弹框打开关闭
      roleList: [], // 角色列表
      addForm: { // 添加的数据
        name: '',
        phonenumber: '',
        roleId: null,
        status: null,
        userName: ''
      },
      // 校验
      addFormRules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请分配角色', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择员工状态', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    // 搜索
    doSearch() {
      this.params.page = 1
      this.getUser()
    },
    // 重置密码
    resetUser(id) {
      resetEmployeeAPI(id)
      this.$confirm('您确定要将密码重置为"123456"?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await resetEmployeeAPI(id)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.getUser()
      })
    },
    // 编辑数据回填
    async edit(Id) {
      const res = await getEmployeeAllAPI(Id)
      const { id, name, userName, roleId, roleName, status, phonenumber } = res.data
      this.addForm = { id, name, userName, roleId, roleName, status, phonenumber }
      this.addEmployee()
    },
    // 删除
    delEmployee(id) {
      this.$confirm('删除员工后将不可登录，确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delEmployeeAPI(id)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getUser()
      })
    },
    // 确认添加
    async confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          // 1. 调用接口
          if (this.addForm.id) {
            await editEmployeeAPI(this.addForm)
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            await createEmployeeAPI(this.addForm)
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
          // 2. 关闭弹框
          this.dialogVisible = false
          // 3. 重新刷新列表
          this.getUser()
        }
      })
    },
    // 获取角色列表
    async openDialog() {
      const res = await getRoleListAPI()
      this.roleList = res.data
    },
    // 关闭弹框
    closeDialog() {
      this.dialogVisible = false
      this.addForm = {
        name: '',
        phonenumber: '',
        roleId: null,
        status: null,
        userName: ''
      }
      this.$refs['addForm'].resetFields()
    },
    // 打开弹框
    addEmployee() {
      this.dialogVisible = true
    },
    // 获取员工列表
    async getUser() {
      const res = await getUserListAPI(this.params)
      this.employeeList = res.data.rows
      this.total = res.data.total
    },
    // 换页
    pageChange(page) {
      this.params.page = page
      this.getUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.employee-container {
  padding: 10px;
}

.el-dialog.openAnimAbcd{
    animation: anim-open 2s ease !important;
}
@keyframes anim-open {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  ;
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
