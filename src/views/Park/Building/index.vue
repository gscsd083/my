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
    </div>
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
          <!-- :type="" -->
          <!-- {{ status===1?'租赁中':'闲置中' }} -->
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button
              size="mini"
              type="text"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
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
import { getBuildingListAPI } from '@/api/building'
export default {
  name: 'Building',
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      total: 0,
      buildingList: [],
      currentPage: 1
    }
  },
  mounted() {
    this.getBuildingList()
  },
  methods: {
    async getBuildingList() {
      const row = await getBuildingListAPI(this.params)
      this.buildingList = row.data.rows
      this.total = row.data.total
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.params.pageSize = val
      this.params.page = 1

      this.getBuildingList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.getBuildingList()
    },
    doSearch() {
      this.params.page = 1
      this.getBuildingList()
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
