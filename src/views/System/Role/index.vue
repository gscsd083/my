<template>
  <div class="role-container">
    <div class="left-wrapper">
      <div
        v-for="(item,index) in roleList"
        :key="item.roleId"
        class="role-item"
        :class="{active :index===currentIndex }"
        @click="switchRoule(item.roleId,index)"
      >
        <div class="role-info">
          <svg-icon :icon-class="item.index===currentIndex? 'user-active': 'user'" class="icon" />
          {{ item.roleName }}
        </div>
        <div class="more">
          <svg-icon icon-class="more" name="more" />
        </div>
      </div>
      <el-button class="addBtn" size="mini">添加角色</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="功能权限" name="tree">
        <div class="right-wrapper">
          <div class="tree-wrapper">
            <div v-for="item in treeList" :key="item.id" class="tree-item">
              <div class="tree-title">{{ item.title }}</div>
              <el-tree
                ref="tree"
                :data="item.children"
                show-checkbox
                default-expand-all
                node-key="id"
                :props="{ label: 'title' }"
              />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="成员列表(100)" name="number">
        成员列表
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getRoleListAPI, getTreeListAPI, getRoleDetailAPI } from '@/api/system'
function addDisabled(threeList) {
  threeList.forEach(item => {
    item.disabled = true
    if (item.children && item.children.length > 0) {
      addDisabled(item.children)
    }
  })
}
export default {
  name: 'Role',
  data() {
    return {
      roleList: [], // 角色列表
      currentIndex: 0, // 当前选中第几项
      treeList: [], // 权限树形列表
      perms: [], // 当前角色权限点列表
      activeName: 'tree' // 选项卡选中项
    }
  },
  async mounted() {
    await this.getRoleList()
    await this.getTreeList()
    this.treeInstance(this.roleList[0].roleId)
  },
  created() {
  },
  methods: {
    // 添加角色获取数据
    async getRoleList() {
      const ress = await getRoleListAPI()
      this.roleList = ress.data
    },
    // 点击的元素
    async switchRoule(id, index) {
      this.currentIndex = index
      this.treeInstance(id)
    },
    // 获取tree数据
    async treeInstance(id) {
      const res = await getRoleDetailAPI(id)
      this.perms = res.data.perms
      this.$refs['tree'].forEach((treeInstance, key) => {
        treeInstance.setCheckedKeys(this.perms[key])
      })
      console.log(this.perms)
    },
    // 拿到树形数据
    async getTreeList() {
      const res = await getTreeListAPI()
      this.treeList = res.data
      addDisabled(this.treeList)
    },
    // 切换选项卡执行
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  font-size: 14px;
  background-color: #fff;
  padding:20px;
  .left-wrapper {
    width: 200px;
    border-right: 1px solid #e4e7ec;
    padding: 4px;
    text-align: center;

    .role-item {
      position: relative;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;

      &.active {
        background: #edf5ff;
        color: #4770ff;
      }
    }

    .role-info {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }
    .addBtn{
      width: 100%;
      margin-top: 20px;
    }
  }

  .right-wrapper {
    flex: 1;

    .tree-wrapper {
      display: flex;
      justify-content: space-between;

      .tree-item {
        flex: 1;
        border-right: 1px solid #e4e7ec;
        padding: 0px 4px;
        text-align: center;
        .tree-title {
          background: #f5f7fa;
          text-align: center;
          padding: 10px 0;
          margin-bottom: 12px;
        }
      }
    }

    ::v-deep .el-tabs__nav-wrap {
      padding-left: 20px;
    }

    .user-wrapper{
      padding:20px;
    }
  }
}
</style>
