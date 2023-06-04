<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>{{ id?'修改':'添加' }}企业</span>
      </div>
      <div class="right">
        黑马程序员
      </div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <el-form ref="ruleForm" label-width="100px" :model="addForm" :rules="rules">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode">
              <el-select v-model="addForm.industryCode">
                <el-option
                  v-for="item in industryList"
                  :key="item.industryCode"
                  :value="item.industryCode"
                  :label="item.industryName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseId">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="upload"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpge文件,且不超过5M</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <img v-if="addForm.businessLicenseUrl" :src="addForm.businessLicenseUrl" alt="">
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary" @click="confirmSubmit">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { getIndustryListAPI, uploadAPI, createExterpriseAPI, getEnterpriseDetailAPI, updateExterpriseAPI } from '@/api/enterprise'
export default {
  name: 'AppAdd',
  data() {
    // const validataMobile = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入手机号'))
    //   } else if (/^1[3-9]\d{9}$/.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('手机号格式不正确'))
    //   }
    // }
    return {
      addForm: {
        name: '', // 企业名称
        legalPerson: '', // 法人
        registeredAddress: '', // 注册地址
        industryCode: '', // 所在行业
        contact: '', // 企业联系人
        contactNumber: '', // 联系人电话
        businessLicenseUrl: '', // 营业执照url
        businessLicenseId: '' // 营业执照id
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请输入法人名称', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        industryCode: [
          { required: true, message: '请输入所在行业', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入企业联系人', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
          // { validator: validataMobile, trigger: 'blur' }
        ],
        businessLicenseId: [
          { required: true, message: '请上传合同文件' }
        ]
        // businessLicenseUrl: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        // businessLicenseId: [{ required: true, message: '请输入企业名称', trigger: 'blur' }]
      },
      industryList: [] // 可选行业列表
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  mounted() {
    this.getIndustryList()
    if (this.id) {
      this.getEnterpriseDetail()
    }
  },
  methods: {
    async getIndustryList() {
      const res = await getIndustryListAPI()
      this.industryList = res.data
    },
    async upload(res) {
      const file = res.file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'businessLicense')
      const ref = await uploadAPI(formData)

      this.addForm.businessLicenseId = ref.data.id
      this.addForm.businessLicenseUrl = ref.data.url
      this.$refs.ruleForm.validateField('businessLicenseId')

      console.log(this.addForm)
    },
    // 上传前校验
    beforeAvatarUpload(file) {
      const allowType = ['image/jpeg', 'image/jpe', 'image/png']
      const istype = allowType.includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!istype) {
        this.$message.error('上传头像图片只能是 JPG/JPGE/PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return istype && isLt5M
    },

    // 统一校验
    confirmSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        console.log(valid)
        if (!valid) return
        if (this.id) {
          await updateExterpriseAPI({ ...this.addForm, id: this.id })
        } else {
          await createExterpriseAPI(this.addForm)
        }
        this.$router.back()
        this.$message({
          message: `${this.id ? '编辑' : '新增'}成功`,
          type: 'success'
        })
      })
    },

    async getEnterpriseDetail() {
      const res = await getEnterpriseDetailAPI(this.id)
      const { businessLicenseId, businessLicenseUrl, contact, contactNumber, industryCode, legalPerson, name, registeredAddress } = res.data
      this.addForm = { businessLicenseId, businessLicenseUrl, contact, contactNumber, industryCode, legalPerson, name, registeredAddress }
    }

  }
}
</script>

<style scoped lang="scss">
.add-enterprise {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: bold;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left:20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form{
          display: flex;
          flex-wrap: wrap;
          .el-form-item{
            width: 50%;
          }
        }
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
