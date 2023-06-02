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
          <el-dropdown>
            <span class="el-dropdown-link">
              <svg-icon icon-class="more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push({path:'/roleAdd',query:{id:`${item.roleId}`} })">编辑角色</el-dropdown-item>
              <el-dropdown-item @click.native="delRole(item.roleId)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-button class="addBtn" size="mini" @click="$router.push('/roleAdd')">
        添加角色
      </el-button>
    </div>
    <div class="right-wrapper">
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
        <el-tab-pane :label="`成员列表(${memeberTotal})`" name="user">
          <div class="user-wrapper">
            <el-table
              :data="roleUserList"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="250"
                label="序号"
              />
              <el-table-column
                prop="name"
                label="员工姓名"
              />
              <el-table-column
                prop="userName"
                label="登录账号"
              />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { getRoleListAPI, getTreeListAPI, getRoleDetailAPI, getRoleUserAPI, delRoleUserAPI } from '@/api/system'
import { addDisabled } from '@/utils/format'
export default {
  name: 'Role',
  data() {
    return {
      memeberTotal: 0, // 当前成员数
      roleUserList: [], // 当前角色下的成员列表
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
    this.getRoleUserList(this.roleList[0].roleId)
  },
  created() {
  },
  methods: {
    // 删除
    delRole(roleId) {
      this.$confirm('是否确认删除当前角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRoleUserAPI(roleId)
        this.getRoleList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    // 获取角色成员
    async getRoleUserList(roleId) {
      const res = await getRoleUserAPI(roleId)
      this.roleUserList = res.data.rows
      this.memeberTotal = res.data.total
    },
    // 添加角色获取数据
    async getRoleList() {
      const ress = await getRoleListAPI()
      this.roleList = ress.data
    },
    // 点击的元素
    async switchRoule(id, index) {
      this.currentIndex = index
      this.treeInstance(id)
      this.getRoleUserList(id)
    },
    // 获取tree数据
    async treeInstance(id) {
      const res = await getRoleDetailAPI(id)
      this.perms = res.data.perms
      this.$refs['tree'].forEach((treeInstance, key) => {
        treeInstance.setCheckedKeys(this.perms[key])
      })
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
