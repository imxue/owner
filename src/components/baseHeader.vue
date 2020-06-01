<template>
  <div class="container">
    <el-row>
      <el-col
        :lg="{ span: 14, offset: 4 }"
        :md="{ span: 5, offset: 1 }"
        :sm="{ span: 10, offset: 1 }"
        :xs="{ span: 8, offset: 0 }"
      >
        <span @click="goindex">{{ $t("OwnerPlatform") }}</span>
      </el-col>
      <el-col
        :lg="{ span: 2, offset: 0 }"
        :md="{ span: 5, offset: 13 }"
        :sm="{ span: 4, offset: 0 }"
        :xs="{ span: 8, offset: 0 }"
      >
        <i
          class="el-icon-bell"
          style="color:green; margin-right:30px;font-size:20px;"
        ></i>
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <i
              class="el-icon-setting"
              style="color:green; margin-right:10px;font-size:20px;"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-CN">中文简体</el-dropdown-item>
            <el-dropdown-item command="zhTw">中文繁體</el-dropdown-item>
            <el-dropdown-item command="en-US">English</el-dropdown-item>
            <el-dropdown-item divided command="1">默认</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <i
              class="el-icon-user"
              style="color:green; margin-left:18px;font-size:20px;"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">
              {{ $t("Logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-dialog
      title="用户信息"
      :visible.sync="centerDialogVisible"
      width="25%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { logout } from "@/api/Default";
export default {
  name: "header",
  data() {
    return {
      centerDialogVisible: false
    };
  },
  methods: {
    goindex() {
      this.$router.push("/");
    },
    test() {},
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/Login");
    },
    handleCommand(command) {
      if (command === "logout") {
        logout().then(
          () => {
            localStorage.removeItem("token");
            this.$router.push("/Login");
          },
          () => {}
        );
      } else {
        if (command === "1") {
          this.$i18n.locale = navigator.language;
        } else {
          localStorage.setItem("lang", command);
          this.$i18n.locale = command;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 24px;
  width: 100%;
  line-height: 60px;
  span:hover {
    cursor: pointer;
  }
  el-dialog {
    border-radius: 20px;
  }
}
</style>
