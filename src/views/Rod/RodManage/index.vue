<template>
  <div>
    <!-- 查询表单 -->
    <div class="search-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="一体杆名称：">
          <el-input v-model="formInline.user" size="small" placeholder="请输入一体杆名称" />
        </el-form-item>
        <el-form-item label="一体杆编号：">
          <el-input v-model="formInline.user" size="small" placeholder="请输入一体杆编号" />
        </el-form-item>
        <el-form-item label="运行状态：">
          <el-select v-model="formInline.region" size="small" placeholder="请选择运行状态">
            <el-option label="全部" value="" />
            <el-option label="正常" value="0" />
            <el-option label="异常" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="button">
      <el-button type="primary" size="mini" @click="addrod">添加一体杆</el-button>
      <el-button size="mini">批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div>
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        :data="formdate"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column
          prop="poleName"
          label="一体杆名称"
          width="150"
        />
        <el-table-column
          prop="poleNumber"
          label="一体杆编号"
          width="120"
        />
        <el-table-column
          prop="poleIp"
          label="一体杆IP"
          width="120"
        />
        <el-table-column
          prop="areaName"
          label="安装区域"
          width="120"
        />
        <el-table-column
          prop="poleType"
          label="一体杆类型"
          width="120"
        >
          <template #default="scop">
            {{ poleTypes(scop.row.poleType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="poleStatus"
          label="运行状态"
          width="120"
        >
          <template #default="poleStatus">
            {{ poleStatus.row.poleStatus?'异常':'正常' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template #default="scope">
            <el-button
              size="mini"
              type="text"
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="confirmDel(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="formInline.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="formInline.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageall"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加弹窗，默认关闭 -->
    <el-dialog
      :title="addForm.id?'编辑一体杆':'添加一体杆'"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单接口
      :rules="addFormRules"-->
      <div>
        <el-form ref="addForm" :model="addForm">
          <el-form-item label="一体杆名称" prop="poleName">
            <el-input v-model="addForm.poleName" />
          </el-form-item>
          <el-form-item label="一体杆编号" prop="poleNumber">
            <el-input v-model="addForm.poleNumber" />
          </el-form-item>
          <el-form-item label="一体杆IP" prop="poleIp">
            <el-input v-model="addForm.poleIp" />
          </el-form-item>
          <el-form-item label="关联区域" prop="areaName">
            <el-select v-model="addForm.poleType" placeholder="请选择区域">
              <el-option
                v-for="item in areaNameall"
                :key="item.id"
                :label="item.areaName"
                :value="item.areaId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="一体杆类型" prop="poleType">
            <!-- <el-input v-model="addForm.poleType" /> -->
            <el-select v-model="addForm.poleType" placeholder="请选择运行状态">
              <el-option label="入口" value="entrance" />
              <el-option label="出口" value="export" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getpoleAPI, getpoleListAPI } from '@/api/rod'
export default {
  name: 'OneHaishu',
  data() {
    return {
      formInline: {
        uname: '',
        uId: '',
        pageSize: 10, // 每页条数
        page: 1 // 分页默认打开页数
      },
      addForm: {
        poleName: '',
        poleNumber: '',
        poleIp: '',
        areaName: '',
        poleType: ''
      },
      areaNameall: [], // 区域列表
      dialogVisible: false, // 添加修改弹窗
      pageall: 0, // 总条数
      formdate: [] // 服务器返回的数据

    }
  },
  mounted() {
    this.getrodList()
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
      this.addForm = {
        poleName: '',
        poleNumber: '',
        poleIp: '',
        areaName: '',
        poleType: ''
      }
    },
    // 打开弹窗
    async addrod() {
      this.dialogVisible = true
      const arr = await getpoleListAPI()
      // console.log(arr)
      this.areaNameall = arr.data
    },
    // 获取页面数据
    async getrodList() {
      const res = await getpoleAPI(this.formInline)
      // console.log(res)
      this.formdate = res.data.rows
      this.pageall = res.data.total
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.formInline.pageSize = val
      this.formInline.page = 1
      this.getrodList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.formInline.page = val
      this.getrodList()
    },
    // 映射一体杆类型
    poleTypes(val) {
      const arr = {
        entrance: '进口',
        export: '出口',
        center: '中心'
      }
      return arr[val] || 'error!参数错误!'
    }

  }

}
</script>
<style lang="scss" scoped>
.search-container{
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237,237,237,.9);

}
.button{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
