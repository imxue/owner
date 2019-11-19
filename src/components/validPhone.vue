<template>
  <div class="validPhone">
    <h2>{{ $t("PhoneVaild") }}</h2>
    <div class="validPhoneWrapper">
      <div class="inner">
        <el-input
          v-model="mobilephone"
          :placeholder="this.$t('PhoneReg')"
        ></el-input>
        <el-button
          type="primary"
          id="sendCode"
          @click="HandleGetVerifyCode"
          :disabled="isDisabled"
          :loading="loading"
          >{{ buttonName }}</el-button
        >
      </div>
      <el-input
        class="VerifyCode"
        v-model="verifycode"
        :disabled="btnDisable"
        :placeholder="this.$t('Vaild')"
      ></el-input>
    </div>
    <el-button type="primary" @click="validPhone" :disabled="btnDisable">{{
      $t("Continue")
    }}</el-button>
  </div>
</template>

<script>
import { getVerifyCode, validVerifyCode } from "../api/Default";

export default {
  name: "validPhone",
  data() {
    return {
      mobilephone: "",
      verifycode: "",
      loading: false,
      btnDisable: true,
      isDisabled: false,
      time: 60,
      buttonName: this.$t("SendVerificationCode")
    };
  },
  methods: {
    async HandleGetVerifyCode() {
      if (this.mobilephone) {
        this.loading = true;
        try {
          await getVerifyCode({ mobilephone: this.mobilephone });
          this.btnDisable = false;
        } catch (error) {
          this.$message.error(this.$t("getvalidPhonefail"));
        } finally {
          this.loading = false;
        }
      } else {
        this.$message.error(this.$t("NotEmpty"));
      }
    },
    validPhone() {
      const params = {
        key: "enroll",
        value: { mobilephone: this.mobilephone, verifycode: this.verifycode }
      };
      validVerifyCode(params.value).then(
        () => {
          this.$emit("enroll", params);
        },
        () => {
          this.$message.error(this.$t("PleasesendagainSMS"));
        }
      );
    },
    sendMsg() {
      console.log(1);
      const me = this;
      if (me.mobilephone) {
        getVerifyCode({ mobilephone: me.mobilephone }).then(
          () => {
            me.isDisabled = true;
            const interval = window.setInterval(() => {
              me.buttonName = `（${me.time}秒）`;
              this.time = this.time - 1;
              if (me.time < 0) {
                me.buttonName = "重新发送验证码";
                me.time = 60;
                me.isDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          },
          e => {
            console.log(e);
          }
        );

        // start
        // const me = this;
        // me.isDisabled = true;
        // const interval = window.setInterval(() => {
        //   me.buttonName = `（${me.time}秒）`;
        //   this.time = this.time - 1;
        //   if (me.time < 0) {
        //     me.buttonName = '重新发送验证码';
        //     me.time = 60;
        //     me.isDisabled = false;
        //     window.clearInterval(interval);
        //   }
        // }, 1000);
        // end
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
  .el-input {
    margin-right: 10px;
  }
}
.VerifyCode {
  margin-top: 20px;
  margin-bottom: 20px;
}
.validPhone {
  margin: auto;
  max-width: 400px;
}
</style>
