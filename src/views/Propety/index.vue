<template>
  <div>
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input
        v-model="params.enterpriseName"
        size="small"
        clearable
        placeholder="请输入内容"
        class="search-main"
        @clear="doSearch"
      />
      <div class="search-label">缴费时间： </div>
      <el-date-picker
        v-model="params.time"
        size="small"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      />
      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <el-button type="primary" size="small" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" size="small" @click="addBuilding">添加账单</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="tableList">
        <el-table-column type="index" label="序号" />
        <el-table-column label="账单编号" prop="billNumber" />
        <el-table-column label="企业名称" prop="enterpriseName" />
        <el-table-column label="租赁楼宇" prop="buildingName" />
        <el-table-column label="物业费(元/m²)" prop="propertyFeePrice" />
        <el-table-column label="账单金额(元)" prop="paymentAmount" />
        <el-table-column label="缴费时间" prop="createTime" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="text" @click="lookConfir(scope.row)">查看</el-button>
            <el-button size="mini" type="text" @click="delExterprise(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <el-pagination
      :hide-on-single-page="total<=params.pageSize"
      :current-page.sync="params.page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 添加弹框 -->
    <el-dialog
      :title="addForm.id?'查看账单':'添加账单'"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单接口 -->
      <div v-show="!addForm.id" class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="选择租户" prop="enterpriseId">
            <el-select v-model="addForm.enterpriseId" placeholder="请选择租户">
              <el-option
                v-for="item in enterprise"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁楼宇" prop="floors">
            <el-select v-model="addForm.floors" placeholder="请选择租赁楼宇">
              <el-option
                v-for="item in areaNameall"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="缴费周期" prop="time">
            <el-date-picker
              v-model="addForm.time"
              size="small"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="支付金额" prop="paymentAmount">
            <el-input v-model="addForm.paymentAmount" :disabled="true" placeholder="请输入支付金额" />
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentMethod">
            <el-select v-model="addForm.paymentMethod" placeholder="请选择支付方式">
              <el-option label="微信" value="1" />
              <el-option label="支付宝" value="2" />
              <el-option label="现金" value="3" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 查看列表 -->
      <div v-show="addForm.id">
        <p>租户名称：{{ addForm.enterpriseName }}</p>
        <p>租赁楼宇：{{ addForm.buildingName }}</p>
        <p>缴费周期：{{ addForm.startTime }}至{{ addForm.endTime }} </p>
        <p>物业费(元/m²)： {{ addForm.propertyFeePrice }}</p>
        <p>账单金额(元)：{{ addForm.paymentAmount }}</p>
        <p>支付方式：{{ poleTypes(addForm.paymentMethod) }}</p>
        <p>缴费时间：{{ addForm.createTime }}</p>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getPropetyListAPI, getEnterpriseListAllAPI, getBuildingListAllAPI, getPaymentListAllAPI, editPropertyfeeListAPI, delPropertyfeeListAPI } from '@/api/propety'
export default {
  data() {
    return {
      params: {
        enterpriseName: '', // 企业名称
        time: [], // 起止时间
        page: 1, // 当前页码
        pageSize: 10 // 页面大小
      },
      addForm: {
        enterpriseId: null, // 企业id
        floors: null, // 楼宇id
        time: [], // 续费周期
        paymentAmount: null, // 支付金额
        paymentMethod: null // 付款方式1微信2支付宝3现金
      },
      // 添加数据校验
      addFormRules: {
        enterpriseId: [
          { required: true, message: '请输入企业id', trigger: 'change' }
        ],
        floors: [
          { required: true, message: '请输入楼宇id', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择续费周期', trigger: 'change' }
        ],
        paymentAmount: [
          { required: true, message: '请检查支付金额', trigger: 'blur' }
        ],
        paymentMethod: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ]
      },
      enterprise: [], // 租户列表
      areaNameall: [], // 楼宇列表
      total: 0,
      rentTime: '',
      dialogVisible: false,
      tableList: []
    }
  },
  computed: {

  },
  watch: {
    addForm: {
      async handler(val) {
        if (!val.floors || !val.time.length) return null
        const { floors: buildingId, time: [startTime, endTime] } = val
        const res = await getPaymentListAllAPI({ buildingId, startTime, endTime })
        this.addForm.paymentAmount = res.data
      },
      deep: true

    }
  },
  mounted() {
    this.doSearch()
  },
  methods: {
    async doSearch() {
      if (this.params.time === null) this.params.time = []
      const { enterpriseName = '', time: [start = '', end = ''], page, pageSize } = this.params
      const res = await getPropetyListAPI({ enterpriseName, start, end, page, pageSize })
      this.tableList = res.data.rows
      this.total = res.data.total
    },
    // 查询时间清除
    // cleartime() {
    //   this.addForm.time = []
    // },
    // 数据映射
    poleTypes(val) {
      const arr = { 1: '微信', 2: '支付宝', 3: '现金' }
      // console.log(arr[1])
      return arr[val]
    },
    // 查看
    lookConfir(row) {
      this.dialogVisible = true
      this.addForm = row
    },
    // 删除
    delExterprise(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 1. 调用接口
        await delPropertyfeeListAPI(id)
        // 2. 重新拉取列表
        this.doSearch()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 分页切换每页条数
    handleSizeChange(val) {
      this.params.page = 1
      this.params.pageSize = val
      this.doSearch()
    },
    // 分页切换页码
    handleCurrentChange(val) {
      this.params.page = val
      this.doSearch()
    },
    // 打开添加弹窗
    async addBuilding() {
      this.dialogVisible = true
      const enterprise = await getEnterpriseListAllAPI() // 企业列表
      const building = await getBuildingListAllAPI() // 楼宇列表
      this.enterprise = enterprise.data
      this.areaNameall = building.data
    },
    // 关闭添加弹窗
    closeDialog() {
      this.dialogVisible = false
      this.$refs['addForm'].resetFields()
      this.addForm = {
        enterpriseId: null,
        floors: null,
        time: [],
        paymentAmount: null,
        paymentMethod: null
      }
    },
    // 添加
    async confirmAdd() {
      if (this.addForm.id) {
        this.closeDialog()
        return
      }
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          const { enterpriseId, floors: buildingId, time: [startTime, endTime], paymentAmount, paymentMethod } = this.addForm
          await editPropertyfeeListAPI({ enterpriseId, buildingId, startTime, endTime, paymentAmount, paymentMethod })
          console.log('添加成功')
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.doSearch()
          this.dialogVisible = false
        }
      })
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
