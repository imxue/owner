<template>
  <div class="enrollEmailWrapper">
    <div v-show="!showInfo" class="enrollEmail">
      <h3>{{ $t("EmailReg") }}</h3>
      <el-input v-model="input" :placeholder="this.$t('EmailReg')"> </el-input>
      <el-button type="primary" @click="Submit">{{ $t("Continue") }}</el-button>
    </div>
    <div v-show="showInfo" class="result">
      <span>{{ $t("ToCheckEmail") }}!</span>
      <!-- <el-button @click="linkDownload">去登录</el-button> -->
    </div>
  </div>
</template>

<script>
import { validMail } from "../api/Default";

export default {
  name: "enrollemail",
  data() {
    return {
      input: "",
      showInfo: false,
      eamil: ""
    };
  },
  methods: {
    linkDownload() {
      window.open(`http://${this.eamil}`);
    },
    Signup(e) {
      this.$emit("sign-up", e);
    },
    Submit() {
      let herf = "";
      if (this.input) {
        this.eamil = this.input.slice(this.input.indexOf("@") + 1);
        herf = `${window.location.href}?mail=${
          this.input
        }&timestamp=${new Date().getTime()}`;
        const params = {
          email: this.input,
          htmlbody: `<a href=${herf}>${this.$t("emailTip")}</a>`
        };
        validMail(params).then(
          () => {
            this.showInfo = true;
          },
          e => {
            this.$message.error(e.data.error);
          }
        );
      } else {
        this.$message.error(this.$t("NotEmpty"));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.enrollEmail {
  display: flex;
  margin: auto;
  max-width: 400px;
  min-height: 200px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
}
</style>
