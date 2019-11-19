<template>
  <div class="EnrollOption">
    <h2>{{ $t("UserReg") }}</h2>
    <el-card shadow="hover" @click.native="Signup('phone')">
      <i class="el-icon-phone"></i>
      <span>{{ $t("PhoneReg") }}</span>
    </el-card>
    <el-card shadow="hover" @click.native="Signup('email')" class="two">
      <i class="el-icon-message"></i>
      <span>{{ $t("EmailReg") }}</span>
    </el-card>
    <!-- <div class="footer">
      <span>{{ $t("Forgot") }}?</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "EnrollOption",
  methods: {
    Signup(e) {
      this.$emit("sign-up", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.EnrollOption {
  span {
    margin-left: 10px;
  }
}
.el-card {
  cursor: pointer;
}
.two {
  margin-top: 20px;
}
.footer {
  margin-top: 40px;
  color: #218799;
  cursor: pointer;
}
</style>
