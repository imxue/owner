<template>
  <el-container>
    <el-header>
      <span>{{ $t("OwnerPlatform") }}</span>
    </el-header>
    <el-main>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <div class="formHeader">
          <p>{{ $t("UserLogin") }}</p>
          <el-dropdown style="" @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-language"></use>
              </svg>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh-CN">中文简体</el-dropdown-item>
              <el-dropdown-item command="zhTw">中文繁體</el-dropdown-item>
              <el-dropdown-item command="en-US">English</el-dropdown-item>
              <el-dropdown-item divided command="1">默认</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-form-item prop="Account">
          <el-input
            prefix-icon="el-icon-s-custom"
            type="text"
            size="large"
            v-model="ruleForm.Account"
            :placeholder="this.$t('PhoneNumberAddEmail')"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="Password">
          <el-input
            prefix-icon="el-icon-edit"
            type="password"
            v-model="ruleForm.Password"
            :placeholder="this.$t('LoginPassword')"
            show-password
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="submitForm('ruleForm')"
            style="width:100%; height:46px;"
            >{{ $t("Submit") }}</el-button
          >
        </el-form-item>

        <el-form-item class="footer">
          <el-button type="text" size="mini" @click="handleGoForgetPW">
            {{ $t("ForgetPassword") }}
          </el-button>
          <el-button type="text" size="mini" @click="handleGoEnroll">
            {{ $t("RegisteredUser") }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import "../icon/iconfont";
import { login } from "@/api/Default";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        Account: "",
        Password: ""
      },
      loading: false,
      options: [
        {
          value: "owner",
          label: this.$t("Ower")
        }
      ],
      value: this.$t("Ower"),
      rules: {
        Account: [
          { required: true, message: this.$t("NotEmpty"), trigger: "blur" }
        ],
        Password: [
          { required: true, message: this.$t("NotEmpty"), trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "1") {
        localStorage.removeItem("lang");
        this.$i18n.locale = navigator.language;
      } else {
        localStorage.setItem("lang", command);
        this.$i18n.locale = command;
      }
      document.title = this.$t("OwnerPlatform");
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          this.ruleForm.platform = "owner";
          login(this.ruleForm)
            .then(
              e => {
                switch (e.data.code) {
                  case 0:
                    localStorage.setItem("token", e.data.token);
                    this.$router.push("/");
                    break;
                  case 1:
                    alert(e.data.error);
                    break;
                  case 2:
                    alert(e.data.error);
                    break;
                  case 3:
                    alert(e.data.error);
                    break;
                  case 4:
                    alert(e.data.error);
                    break;
                }
              },
              e => {
                alert(e.data.error);
              }
            )
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    handleGoForgetPW() {
      this.$router.push("/ForgetPW");
    },
    handleGoEnroll() {
      this.$router.push("/Enroll");
    }
  }
};</script
>>
<style lang="scss" scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.el-container {
  background: #3b4759;
  height: 100%;
  min-width: 862px;
}
.el-header {
  background: #fff;
  line-height: 60px;
  padding-left: 200px;
  font-size: 24px;
}
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  padding: 10px;
  width: 520px;
  text-align: center;

  p {
    color: #fff;
    font-size: 24px;
    margin-bottom: 40px;
  }
  .el-link {
    color: #fff;
  }
  .el-form-item {
    margin-bottom: 40px;
  }
  .formHeader {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-dropdown {
    cursor: pointer;
  }
}
</style>
