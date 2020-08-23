<template>
  <div class="enrollWrapper">
    <el-dialog
      :visible.sync="dialogVisible"
      center
      :modal="false"
      :close-on-click-modal="false"
      @close="close"
    >
      <transition name="component-fade" mode="out-in">
        <component :is="view" @sign-up="Goto"></component>
      </transition>
      <div class="footer">
        <span @click="Signup('all')">
          <i class="el-icon-back"></i>
          <span v-show="this.view !== 'EnrollOption'" @click="Signup('all')">
            {{ $t("ReturnToSignIn") }}
          </span>
          <span v-show="this.view === 'EnrollOption'" @click="GoBackToLogin()">
            {{ $t("ReturnToLogin") }}
          </span>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import EnrollOption from "../components/EnrollOption.vue";
import EnrollEmail from "../components/EnrollEmail.vue";
import EnrollPhone from "../components/EnrollPhone.vue";
import Enroll from "../components/Enroll.vue";

export default {
  name: "Enroll",
  data() {
    return {
      dialogVisible: true,
      view: "EnrollOption",
      isDisabled: false,
      buttonName: this.$t("SendVerificationCode"),
      viewoption: {
        phone: EnrollPhone,
        email: EnrollEmail,
        all: EnrollOption,
        reg: Enroll
      }
    };
  },
  methods: {
    Goto(e) {
      this.view = this.viewoption[e];
    },
    Signup() {
      this.view = "EnrollOption";
    },
    close() {
      this.$router.push("/login");
    },
    GoBackToLogin() {
      this.$router.push("/login");
    }
  },
  created() {
    const params = qs.parse(this.$route.query);
    if (params.mail) {
      this.view = this.viewoption.reg;
    }
  },
  components: {
    EnrollOption,
    EnrollEmail,
    EnrollPhone,
    Enroll
  }
};
</script>
<style lang="scss" scoped>
.enrollWrapper {
  height: 100vh;
  background: linear-gradient(90deg, #3b4759, #566377);
}
.enrollWrapper {
  .el-dialog {
    min-width: 450px !important;
  }
}
.myHeader {
  line-height: 60px;
  border-bottom: #218799;
  z-index: 99;
}
.footer {
  margin-top: 40px;
  span {
    cursor: pointer;
    color: #218799;
  }
}
</style>
