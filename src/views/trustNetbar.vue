<template>
  <div class="Enroll">
    <el-header>
      <baseHeader />
    </el-header>
    <div class="box">
      <transition name="fade">
        <span v-bind:class="{ active: phoneVerification }"
          >1.{{ $t("InputFranchiseeAccount") }}</span
        >
      </transition>
      <span v-bind:class="{ active: userInfo }"
        >2.{{ $t("ConfirmFranchiseePhone") }}</span
      >
      <span v-bind:class="{ active: apply }"
        >3.{{ $t("SubmitEscrowApplication") }}</span
      >
      <span v-bind:class="{ active: sucess }"
        >4.{{ $t("FranchiseeConfirmsHosting") }}</span
      >
    </div>
    <div v-if="phoneVerification">
      <div class="from">
        <el-form ref="form" :model="form" label-width="120px" size="medium">
          <el-form-item :label="this.$t('Account')">
            <el-input
              v-model="firstInput"
              :placeholder="this.$t('MobileorEmail')"
              @change="test"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="Rowfooter">
          <el-button
            type="primary"
            v-on:click="HandleNext"
            :disabled="disabled"
            >{{ $t("Next") }}</el-button
          >
          <el-button type="primary" v-on:click="HandleBack">
            {{ $t("CancelOperation") }}
          </el-button>
        </div>
      </div>
    </div>
    <div class v-if="userInfo">
      <div class="from">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item :label="this.$t('Account')">
            <el-input v-model="form.mobilephone" disabled></el-input>
          </el-form-item>
          <el-form-item :label="this.$t('FranchiseeName')">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" v-on:click="Handlesubmit">
          {{ $t("InformationSub") }}
        </el-button>
        <el-button type="primary" v-on:click="HandleBack">
          {{ $t("ReturnLogin") }}
        </el-button>
      </div>
    </div>
    <div v-show="apply" class="footer">
      <label v-if="!resultx"
        >{{ $t("ToFranchisee") }}【{{ this.form.name }}】{{
          $t("SubmitTo")
        }}【{{ barName }}】{{ $t("CafeToConfirm") }}</label
      >
      {{ resultx }}
      <el-button type="primary" v-on:click="HandleBack">{{
        $t("ReturnIndex")
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { trustNetbar, getUserInfoByphone } from "@/api/Default";
import baseHeader from "../components/baseHeader.vue";
export default {
  name: "trustNetbar",
  data() {
    return {
      phoneVerification: true,
      userInfo: false,
      sucess: false,
      isActive: true,
      disabled: true,
      apply: false,
      form: {
        mobilephone: "",
        name: "",
        barId: ""
      },
      firstInput: "",
      barName: "",
      resultx: ""
    };
  },
  components: {
    baseHeader
  },
  created() {
    this.form.barId = this.$route.query.barid;
    this.barName = this.$route.query.name;
  },
  methods: {
    HandleNext() {
      if (this.firstInput) {
        getUserInfoByphone(this.firstInput).then(
          e => {
            this.form.mobilephone = this.firstInput;
            this.phoneVerification = false;
            this.userInfo = true;
            this.form.name = e.data.data.name;
          },
          e => {
            this.$message({
              showClose: true,
              message: `${this.$t(e.data.error)}`,
              type: "error"
            });
          }
        );
      }
    },
    HandleNextSucess() {
      this.userInfo = false;
      this.apply = true;
    },
    HandleBack() {
      this.$router.push("/");
    },
    async Handlesubmit() {
      // trustNetbar(this.form).then(e => {
      //   this.resultx = e.data;
      //     typeof e.data === "string"
      //       ? (this.resultx = e.data)
      //       : (this.resultx = "");
      //   this.HandleNextSucess();
      //   },
      //   (e) => {
      //     console.log(e)
      //   }
      // }
      try {
        let resp = await trustNetbar(this.form);
        if (typeof resp.data === "string") {
          this.resultx = resp.data;
        } else {
          this.resultx = "";
          this.HandleNextSucess();
        }
      } catch (e) {
        this.$message({
          showClose: true,
          message: this.$t(`${e.data.code}`),
          type: "error"
        });
      }
    },
    test(x) {
      if (x) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};</script
>>

<style lang="scss" scoped>
.Enroll {
  background: #fff;
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #3aa79d;
  }
  .title {
    margin-top: 20px;
    span {
      padding-left: 300px;
      font-size: 20px;
    }
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
    width: 600px;

    margin: 0 auto;

    .Rowfooter {
      margin-top: 20px;
    }
  }
  .active {
    border-bottom: 4px solid #f87c00;
  }
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-button {
      margin-top: 30px;
    }
  }
}
</style>
