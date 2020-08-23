<template>
  <div class="enroll">
    <h2>{{ $t("Register") }}</h2>
    <el-form label-width="80px" :model="form" ref="from" :rules="rules">
      <el-form-item :label="this.$t('Name')">
        <el-input
          v-model="form.name"
          :placeholder="this.$t('pleaseInput')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="this.$t('Area')" class="all">
        <el-cascader
          :options="SelectRegion"
          v-model="form.id"
          :placeholder="this.$t('pleaseInput')"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item :label="this.$t('PhoneNumber')">
        <el-input
          v-model="form.phone"
          :disabled="phoneDisable"
          autocomplete="new-password"
          :placeholder="this.$t('pleaseInput')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="this.$t('PassWord')">
        <el-input
          v-model="form.password"
          autocomplete="new-password"
          show-password
          :placeholder="this.$t('pleaseInput')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="this.$t('Email')">
        <el-input
          v-model="form.email"
          :disabled="mailDisable"
          :placeholder="this.$t('pleaseInput')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('from')">
          {{ $t("Create") }}
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          {{ $t("Reset") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regist, getAddress } from "../api/Default";

export default {
  name: "enroll",
  props: {
    phone: String
  },
  data() {
    return {
      mailDisable: false,
      phoneDisable: false,
      form: {
        name: "",
        id: "",
        phone: "",
        email: "",
        password: ""
      },
      SelectRegion: [],
      rules: {
        name: [{ required: true, message: "", trigger: "blur" }],
        area_id: [{ required: true, message: "", trigger: "blur" }],
        mobile_phone: [{ required: true, message: "", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.phone) {
      this.form.phone = this.phone;
      this.phoneDisable = true;
    }
    if (this.$route.query.mail) {
      this.mailDisable = true;
      this.form.email = this.$route.query.mail;
    }
  },
  async created() {
    try {
      const resp = await getAddress();
      this.SelectRegion = this.test1(resp.data.data);
    } catch (error) {
      this.$message.error(this.$t(error.data.error));
    }
  },
  methods: {
    submitForm(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.form.id = this.form.id.pop();
            await regist(this.form);
            this.$alert(this.$t("tip1"), {
              confirmButtonText: this.$t("Confirm"),
              type: "success",
              callback: () => {
                this.$router.push("/login");
              }
            });
          } catch (error) {
            this.$message.error(this.$t(error.data.code));
          }
        }
      });
    },
    test1(array) {
      array.forEach(item => {
        Object.keys(item).forEach(key => {
          if (
            item[key] &&
            item[key].constructor &&
            item[key].constructor === Array
          ) {
            // eslint-disable-next-line no-param-reassign
            item.children = item[key];
            // eslint-disable-next-line no-param-reassign
            delete item[key];
            this.test1(item.children);
          } else {
            if (key === "area_id") {
              // eslint-disable-next-line no-param-reassign
              item.value = item.area_id;
            } else {
              if (!item.value) {
                // eslint-disable-next-line no-param-reassign
                item.value = item[key];
              }
              // eslint-disable-next-line no-param-reassign
              item.label = item[key];
            }
            // eslint-disable-next-line no-param-reassign
            delete item[key];
          }
        });
      });
      return array;
    }
  }
};
</script>
<style lang="scss" scoped>
.enroll {
  text-align: center;
}
.all {
  .el-cascader {
    width: 100%;
    max-width: 500px;
  }
  text-align: left;
}
</style>
