<template>
  <div class="Enroll">
    <div style="border-bottom: 1px solid #3aa79d;">
      <baseHeader />
    </div>

    <div class="box">
      <transition name="fade">
        <span v-bind:class="{ active: phoneVerification }"
          >1.{{ $t("PhoneVerification") }}</span
        >
      </transition>
      <span v-bind:class="{ active: userInfo }"
        >2.{{ $t("ResetPassword") }}</span
      >
      <span v-bind:class="{ active: sucess }"
        >3.{{ $t("ResetSuccessfully") }}</span
      >
    </div>
    <div class="main" v-if="phoneVerification">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item
          prop="phone"
          :label="this.$t('PhoneNumber')"
          label-width="180px"
          id="sendCode"
        >
          <el-row style="display:flex">
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm.phone"
              autocomplete="on"
              :placeholder="this.$t('PhoneNumber')"
              autofocus="true"
            ></el-input>
            <el-button id="sendCode" @click="sendMsg" :disabled="isDisabled">{{
              buttonName
            }}</el-button>
          </el-row>
        </el-form-item>
        <el-form-item
          prop="VerifyCode"
          :label="this.$t('VerificationCode')"
          label-width="180px"
          :rules="[{ required: true, message: this.$t('NotEmpty') }]"
        >
          <el-input
            prefix-icon="el-icon-edit"
            type="text"
            v-model="ruleForm.VerifyCode"
            :placeholder="this.$t('VerificationCode')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="HandleNext">
            {{ $t("Next") }}
          </el-button>
          <el-button v-on:click="HandleBack">{{ $t("ReturnLogin") }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="el-zoom-in-center">
      <div class="main" v-if="userInfo">
        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1">
          <el-form-item
            prop="password"
            label="登录密码"
            label-width="120px"
            id="sendCode"
          >
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm1.password"
              autocomplete="on"
              :rules="[{ required: true, message: this.$t('NotEmpty') }]"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="confirePassowrd"
            label="确认登录密码"
            label-width="120px"
          >
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm1.confirePassowrd"
              :placeholder="this.$t('VerificationCode')"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="HandleNextSucess">{{
              $t("Next")
            }}</el-button>
            <el-button v-on:click="HandleBack">
              {{ $t("ReturnLogin") }}
            </el-button>
          </el-form-item>
        </el-form>
        <!-- xx -->
      </div>
    </transition>
    <div class="main" v-if="sucess">
      <div class="from">
        <div>{{ result }}</div>
        <div>{{ time1 }} {{ $t("ReturnloginAfterSeconds") }}</div>

        <div class="Rowfooter">
          <input id="btn1" type="button" v-on:click="HandleBack" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getVerifyCode, validVerifyCode, resetPassword } from "@/api/Default";
import baseHeader from "../components/baseHeader.vue";
export default {
  name: "forgetPW",
  data() {
    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error(this.$t("NotEmpty")));
    //   } else {
    //     const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    //     if (reg.test(value)) {
    //       callback();
    //     } else {
    //       return callback(new Error("请输入正确手机号"));
    //     }
    //   }
    // };
    var checkpassword = (rule, value, callback) => {
      if (!this.ruleForm1.password) {
        return callback(new Error(this.$t("NotEmpty")));
      } else {
        if (this.ruleForm1.password === value) {
          callback();
        } else {
          return callback(new Error(this.$t("InconsistentPasswordInputTwice")));
        }
      }
    };
    return {
      phoneVerification: true,
      userInfo: false,
      sucess: false,
      isActive: true,
      result: "",
      ruleForm: {
        phone: "",
        VerifyCode: ""
      },
      ruleForm1: {
        password: "",
        confirePassowrd: ""
      },
      rules: {
        phone: [
          { required: true, message: this.$t("NotEmpty"), trigger: "blur" }
        ]
      },
      rules1: {
        password: [{ required: true, message: this.$t("NotEmpty") }],
        confirePassowrd: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ]
      },
      buttonName: this.$t("SendVerificationCode"),
      isDisabled: false,
      time: 60,
      time1: 3 // 返回首页
    };
  },
  components: {
    baseHeader
  },
  methods: {
    HandleNext() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          validVerifyCode(this.ruleForm).then(
            () => {
              this.phoneVerification = false;
              this.userInfo = true;
            },
            e => {
              this.$message({
                message: e.data.error,
                type: "error"
              });
            }
          );
        }
      });
    },
    // Check(value) {
    //   if (!value) {
    //     return 0;
    //   } else {
    //     const Email = /^([A-Za-z0-9_\-\\.\u4e00-\u9fa5])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,8})$/;
    //     const phone = /^1[3|4|5|7|8][0-9]\d{8}$/;
    //     if (Email.test(value)) {
    //       return "Email";
    //     } else if (phone.test(value)) {
    //       return "phone";
    //     } else {
    //       return 1;
    //     }
    //   }
    // },
    // test() {
    //   let re = this.Check(this.ruleForm.phone);
    //   if (re === "Email") {
    //     // email
    //   } else if (re === "phone") {
    //     // 手机验证
    //     getVerifyCode(this.ruleForm.phone).then(e => {
    //       console.log(e);
    //     });
    //   } else if (re === 1) {
    //     // 格式不正确
    //   } else if (re === 0) {
    //     //
    //   }
    // },
    HandleNextSucess() {
      this.$refs["ruleForm1"].validate(valid => {
        if (valid) {
          this.ruleForm1.phone = this.ruleForm.phone;
          resetPassword(this.ruleForm1).then(
            response => {
              this.userInfo = false;
              this.sucess = true;
              this.result = response.data;
              let me = this;
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
              let interval = setInterval(() => {
                --me.time1;
                if (me.time1 < 0) {
                  window.clearInterval(interval);
                }
              }, 1000);
            },
            err => {
              this.$message.error(`${err.data.error}`);
            }
          );
        }
      });
    },
    HandleBack() {
      this.$router.push("/");
    },
    sendMsg() {
      this.$refs["ruleForm"].validateField("phone", error => {
        if (!error) {
          getVerifyCode(this.ruleForm.phone).then(
            () => {
              this.$message({
                message: this.$t("PleaseCheckTheSMS"),
                type: "success"
              });
            },
            () => {
              this.$message({
                message: this.$t("TheSMSfailed"),
                type: "warning"
              });
            }
          );
          let me = this;
          me.isDisabled = true;
          let interval = window.setInterval(function() {
            me.buttonName = "（" + me.time + "sec）";
            --me.time;
            if (me.time < 0) {
              me.buttonName = this.$t("SendVerificationCode");
              me.time = 60;
              me.isDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        }
      });
    }
  }
};</script
>>

<style lang="scss" scoped>
.Enroll {
  background: #fff;
  .el-header {
    border-bottom: 1px solid #3aa79d;
  }
  .box {
    border-bottom: 1px solid;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin: 50px auto;
    text-align: center;
    span {
      padding-bottom: 25px;
      flex: 1;
      margin-bottom: -2px;
    }
  }
  .from {
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    #btn {
      color: #fff;
      background: #667797;
      border: none;
      width: 100px;
      padding: 10px;
      margin-right: 40px;
      border-radius: 4px;
    }
    #btn1 {
      color: #667797;
      background: #fff;
      width: 100px;
      padding: 10px;
      border: 1px solid #667797;
      border-radius: 4px;
    }
    .Rowfooter {
      margin-top: 50px;
    }
  }
  .active {
    border-bottom: 4px solid #3aa79d;
  }
  .main {
    display: flex;
    justify-content: center;
  }
  .el-form {
    width: 500px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
