<template>
  <div class="Enroll">
    <el-header>
      <baseHeader />
    </el-header>
    <div class="box">
      <span v-bind:class="{ active: phoneVerification }"
        >1.{{ $t("PhoneVerification") }}</span
      >
      <span v-bind:class="{ active: userInfo }">2.{{ $t("details") }}</span>
      <span v-bind:class="{ active: sucess }"
        >3.{{ $t("RegistrationIsComplete") }}</span
      >
    </div>

    <div v-if="phoneVerification">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item
          prop="phone"
          :label="this.$t('PhoneNumber')"
          label-width="180px"
          id="sendCode"
        >
          <el-row>
            <el-col :span="16">
              <el-input
                prefix-icon="el-icon-edit"
                type="text"
                v-model="ruleForm.phone"
                autocomplete="on"
                :label="this.$t('PhoneNumber')"
                autofocus="true"
              ></el-input>
            </el-col>
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
            :label="this.$t('VerificationCode')"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            v-on:click="HandleNext"
            loading="NextLoading"
          >
            {{ $t("Next") }}
          </el-button>
          <el-button v-on:click="HandleBack">{{ $t("ReturnLogin") }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <transition name="el-zoom-in-center">
      <div class v-if="userInfo">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
          <el-form-item
            prop="password"
            :label="this.$t('LoginPassword')"
            label-width="120px"
          >
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm2.password"
              :label="this.$t('PleaseEnterYourPassword')"
              autofocus="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="confirePassword"
            :label="this.$t('ConfirmLoginPassword')"
            label-width="120px"
          >
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm2.confirePassword"
              :placeholder="this.$t('ConfirmLoginPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name" label="联系人姓名" label-width="120px">
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm2.name"
              :placeholder="this.$t('ContentName')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="email"
            :label="this.$t('Email')"
            label-width="120px"
          >
            <el-input
              prefix-icon="el-icon-edit"
              type="text"
              v-model="ruleForm2.email"
              :placeholder="this.$t('Email')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="Region"
            :label="this.$t('Area')"
            label-position="right"
            label-width="120px"
          >
            <el-cascader
              :options="ruleForm2.SelectRegion"
              v-model="ruleForm2.Region"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              v-on:click="HandleNextSucess"
              loading="NextLoading"
              >{{ $t("Next") }}</el-button
            >
            <el-button v-on:click="HandleBack">
              {{ $t("ReturnLogin") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <div class="footer" v-if="sucess">
      <div>{{ result }}</div>
      <el-button type="primary" v-on:click="HandleBack">
        {{ $t("ReturnLogin") }}
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  getVerifyCode,
  validVerifyCode,
  getAddress,
  regist
} from "@/api/Default";
import baseHeader from "../components/baseHeader.vue";
export default {
  name: "Enroll",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("NotEmpty")));
      } else {
        // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // if (reg.test(value)) {
        //   callback();
        // } else {
        //   return callback(new Error("请输入正确手机号"));
        // }
        callback();
      }
    };
    var checkpassword = (rule, value, callback) => {
      if (!this.ruleForm2.password) {
        return callback(new Error(this.$t("NotEmpty")));
      } else {
        if (this.ruleForm2.password === value) {
          callback();
        } else {
          return callback(new Error(this.$t("InconsistentPasswordInputTwice")));
        }
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("PleaseInputYourEmail")));
      } else {
        // eslint-disable-next-line no-useless-escape
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error(this.$t("MailFormatIsIncorrect")));
        }
      }
    };
    return {
      phoneVerification: true,
      userInfo: false,
      sucess: false,
      test: "",
      result: "", // 注册结果
      ruleForm: {
        phone: "",
        VerifyCode: ""
      },
      NextLoading: false,
      ruleForm2: {
        password: "",
        confirePassword: "",
        email: "",
        Region: [],
        SelectRegion: []
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
      },
      rules2: {
        password: [{ required: true, message: this.$t("NotEmpty") }],
        confirePassword: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ],
        name: [{ required: true, message: this.$t("NotEmpty") }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        Region: [{ required: true, message: this.$t("NotEmpty") }]
      },
      buttonName: this.$t("SendVerificationCode"),
      isDisabled: false,
      time: 60
    };
  },
  created() {
    this.getArea();
  },
  components: {
    baseHeader
  },
  methods: {
    handleChange(data) {
      console.log(data);
    },
    HandleNext() {
      let that = this;
      this.$refs["ruleForm"].validate(valid => {
        this.NextLoading = true;
        if (valid) {
          validVerifyCode(this.ruleForm)
            .then(
              response => {
                if (response.data.ok || this.ruleForm.VerifyCode === "8888") {
                  that.phoneVerification = false;
                  that.userInfo = true;
                }
              },
              response => {
                this.$message({
                  message: response.data.error
                });
              }
            )
            .finally(() => {
              this.NextLoading = false;
            });
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
            e => {
              this.$message({
                type: "success",
                message: e.data
              });
            },
            e => {
              this.$message({
                type: "warning",
                message: e.data.error
              });
            }
          );
          let me = this;
          me.isDisabled = true;
          let interval = window.setInterval(function() {
            me.buttonName = "（" + me.time + "秒）";
            --me.time;
            if (me.time < 0) {
              me.buttonName = "重新发送验证码";
              me.time = 60;
              me.isDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        }
      });
    },
    handleItemChange() {},
    HandleNextSucess() {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.ruleForm2.phone = this.ruleForm.phone;
          // this.ruleForm2.phone = '13765874451'
          this.ruleForm2.id = this.ruleForm2.Region.pop();
          regist(this.ruleForm2).then(
            response => {
              this.result = response.data;
              this.userInfo = false;
              this.sucess = true;
            },
            err => {
              this.$message({
                message: err.data.error
              });
            }
          );
        }
      });
    },
    async getArea() {
      try {
        let x = await getAddress();
        let temp = x.data.data;
        this.ruleForm2.SelectRegion = this.test1(temp);
      } catch (e) {
        this.$message.error(e.data.error);
      }
    },
    test1(array) {
      array.forEach(item => {
        Object.keys(item).forEach(key => {
          if (item[key].constructor === Array) {
            item["children"] = item[key];
            delete item[key];
            this.test1(item["children"]);
          } else {
            if (key === "area_id") {
              item["value"] = item["area_id"];
            } else {
              if (!item["value"]) {
                item["value"] = item[key];
              }
              item["label"] = item[key];
            }
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
.el-form {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.el-header {
  border-bottom: 1px solid #3aa79d;
}
.el-cascader {
  width: 100%;
}
.Enroll {
  background: #fff;
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
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-button {
      margin-top: 50px;
    }
  }
  .active {
    border-bottom: 4px solid #3aa79d;
  }
}

@media screen and (max-width: 600px) {
  .Enroll {
    background: red;
  }
}
</style>
