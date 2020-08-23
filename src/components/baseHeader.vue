<template>
  <div class="container">
    <div style="display:flex;justify-content: space-between;">
      <div>
        <span @click="goindex">{{ $t("OwnerPlatform") }}</span>
      </div>
      <div class="left">
        <span style="color:black;">{{ $t("Welcome") }}：</span>
        <span>{{ user.user_name }}</span>
        <span style="margin-left:10px;"> | </span>
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link" style="margin-right:20px;">
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
      </div>
    </div>
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
import checkAuthority from "../util/Authority";
export default {
  name: "Myheader",
  data() {
    return {
      centerDialogVisible: false,
      user: {}
    };
  },
  created() {
    try {
      this.user = JSON.parse(checkAuthority(localStorage.getItem("token")));
    } catch (error) {
      this.user = {
        user_name: "UNKONW"
      };
    }
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
        document.title = this.$t("OwnerPlatform");
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
  .left {
    span {
      font-size: 16px;
      color: green;
    }
  }
  el-dialog {
    border-radius: 20px;
  }
}
</style>
