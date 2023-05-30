<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">楼宇名称：</div>
      <el-input
        v-model="params.name"
        clearable
        placeholder="请输入内容"
        class="search-main"
        @clear="doSearch"
      />
      <el-button type="primary" @click="doSearch">查询</el-button>
      <el-button type="primary" @click="addBuilding">添加楼宇</el-button>
    </div>
    <!-- 添加楼宇弹框 -->
    <el-dialog
      :title="addForm.id?'修改楼宇':'添加楼宇'"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
    <!-- 表格区域 -->
    <div class="table">
      <el-table
        stripe
        style="width: 100%"
        :data="buildingList"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          label="楼宇名称"
          width="180"
          prop="name"
        />
        <el-table-column
          label="层数"
          prop="floors"
        />
        <el-table-column
          label="在管面积(m²)"
          width="120"
          prop="area"
        />
        <el-table-column
          label="物业费(元/m²)"
          width="120"
          prop="propertyFeePrice"
        />
        <el-table-column
          label="状态"
          prop="status"
        >
          <template #default="scope">
            {{ scope.row.status===1?'闲置中':'租赁中' }}
          </template>
          <!-- {{ status===1?'租赁中':'闲置中' }} -->
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
    <!-- 分页区域 -->
    <el-pagination
      :hide-on-single-page="total<=params.pageSize"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getBuildingListAPI, createBuildingListAPI, delBuildingListAPI, editBuildingListAPI } from '@/api/building'
export default {
  name: 'Building',
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      // 添加数据
      addForm: {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      },
      // 添加数据校验
      addFormRules: {
        name: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' }
        ],
        floors: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入楼宇面积', trigger: 'blur' }
        ],
        propertyFeePrice: [
          { required: true, message: '请输入楼宇物业费', trigger: 'blur' }
        ]
      },
      // 默认总数据条数
      total: 0,
      // 服务器返回数据暂存
      buildingList: [],
      // 分页默认页数
      currentPage: 1,
      // 添加弹窗，默认关闭
      dialogVisible: false
    }
  },
  // 生命周期函数，页面渲染完成执行
  mounted() {
    this.getBuildingList()
  },
  // 普通函数，需要触发才执行
  methods: {
    // 调接口得到返回的数据
    async getBuildingList() {
      const row = await getBuildingListAPI(this.params)
      this.buildingList = row.data.rows
      this.total = row.data.total
    },
    // 分页切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.params.pageSize = val
      this.params.page = 1

      this.getBuildingList()
    },
    // 分页切换页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.getBuildingList()
    },
    // 查询，返回第一页并渲染返回的查询结构
    doSearch() {
      this.params.page = 1
      this.getBuildingList()
    },
    // 打开添加弹窗
    addBuilding() {
      this.dialogVisible = true
    },
    // 关闭添加弹窗
    closeDialog() {
      this.dialogVisible = false
      this.addForm = {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      }
    },
    // 添加函数
    confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          console.log('添加')
          if (this.addForm.id) {
            await editBuildingListAPI(this.addForm)
          } else {
            await createBuildingListAPI(this.addForm)
          }
          // 2. 获取列表
          this.getBuildingList()
          // 3. 关闭弹框
          this.dialogVisible = false
        }
      })
    },
    // 删除
    async confirmDel(id) {
      this.$confirm('确认删除当前楼宇吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delBuildingListAPI(id)
        this.getBuildingList()
      }).catch(() => {})
    },
    // 编辑
    edit(row) {
      // 1. 打开弹框
      this.dialogVisible = true
      // 2. 解构必要字段
      const { id, area, floors, name, propertyFeePrice } = row
      // 3. 数据回填
      this.addForm = {
        id, area, floors, name, propertyFeePrice
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container{
  padding:10px;
}
.search-container{
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237,237,237,.9);;
  padding-bottom: 20px;
  .search-label{
    width:100px;
  }
  .search-main{
    width: 220px;
    margin-right: 10px;
  }
}
</style>
