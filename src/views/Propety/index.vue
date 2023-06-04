<template>
  <div>
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input v-model="params.name" size="small" clearable placeholder="请输入内容" class="search-main" @clear="doSearch" />
      <div class="search-label">缴费时间： </div>
      <el-date-picker
        v-model="rentTime"
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
      <el-button type="primary" size="small">添加账单</el-button>
    </div>
    <div class="table">
      <el-table style="width: 100%" :data="[]" @expand-change="expandHandle">

        <el-table-column type="index" label="序号" />
        <el-table-column label="账单编号" />
        <el-table-column label="企业名称" />
        <el-table-column label="租赁楼宇" />
        <el-table-column label="物业费(元/m²)" />
        <el-table-column label="账单金额(元)" />
        <el-table-column label="缴费时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="delExterprise(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        name: ''
      },
      rentTime: '',
      expandHandle: '',
      tableList: {}
    }
  },
  methods: {
    doSearch() {},
    delExterprise(id) {}
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
