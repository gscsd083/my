<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary">增加停车计费规则</el-button>
      <el-button @click="exportToExcel">导出Excel</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上线(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式">
          <template #default="scope">
            {{ formatChargeType(scope.row.chargeType) }}
          </template>
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <el-button size="mini" type="text">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="delCarRule(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRuleListAPI, delRuleListAPI } from '@/api/car'
import { utils, writeFileXLSX } from 'xlsx'
export default {
  name: 'Building',
  data() {
    return {
      ruleList: [],
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false
    }
  },
  mounted() {
    this.getRuleList()
  },

  methods: {
    // 刪除
    async delCarRule(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 1. 调用接口
        await delRuleListAPI(id)
        // 2. 重新拉取列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 获取规则列表
    async getRuleList() {
      const res = await getRuleListAPI(this.params)
      this.ruleList = res.data.rows
    },
    // 状态适配
    formatChargeType(v) {
      const MAP = {
        duration: '按时长收费',
        turn: '按次收费',
        partition: '分段收费'
      }
      return MAP[v]
    },
    // 导出excel
    async exportToExcel() {
      const res = await getRuleListAPI(this.params)
      const tableHeader = [
        'ruleNumber',
        'ruleName',
        'freeDuration',
        'chargeCeiling',
        'chargeType',
        'ruleNameView'
      ]
      const sheetData = res.data.rows.map(item => {
        const obj = {}
        tableHeader.forEach(key => {
          if (key === 'chargeType') {
            obj[key] = this.formatChargeType(item[key])
          } else {
            obj[key] = item[key]
          }
        })
        return obj
      })
      // 创建一个工作表
      const worksheet = utils.json_to_sheet(sheetData)
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 把工作表添加到工作簿
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(
        worksheet,
        [
          [
            '计费规则编号',
            '计费规则名称',
            '免费时长(分钟)',
            '收费上线(元)',
            '计费方式',
            '计费规则'
          ]
        ],
        { origin: 'A1' }
      )
      writeFileXLSX(workbook, '停车计费规则.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container {
  margin: 10px 0px;
}
.page-container {
  padding: 4px 0px;
  text-align: right;
}
.form-container {
  padding: 0px 80px;
}
</style>
