<template>
  <div class="Enroll">
    <div class="Header">
      <span>{{ $t("OwnerPlatform") }}</span>
    </div>
    <div class="title">
      <span>{{ $t("ResetPassword") }}</span>
    </div>

    <div class="">
      <div class="from">
        <div class="row">
          <label>{{ $t("CurrentPassword") }}</label>
          <input type="text" name="phone" />
        </div>
        <div class="row">
          <label>{{ $t("NewPassword") }}</label>
          <input name="code" type="text" />
        </div>
        <div class="row">
          <label>{{ $t("ConfireNewPassword") }}</label>
          <input name="code" type="text" />
        </div>

        <div class="Rowfooter">
          <input
            id="btn"
            type="button"
            :value="this.$t('EditPassword')"
            v-on:click="HandleNextSucess"
          />
          <input
            id="btn1"
            type="button"
            v-on:click="HandleBack"
            :value="this.$t('Cancel')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePw",
  data() {},
  methods: {
    HandleBack() {
      this.$router.push("/");
    }
  }
};</script
>>

<style lang="scss" scoped>
.Enroll {
  background: #fff;
  .Header {
    height: 100px;
    background: #fff;
    border-bottom: 2px solid;
    span {
      line-height: 100px;
      font-size: 24px;
      padding-left: 300px;
    }
  }
  .title {
    margin-top: 20px;
    span {
      padding-left: 300px;
      font-size: 20px;
    }
  }
  .from {
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .row {
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      margin-bottom: 40px;
      label {
        width: 100px;
      }

      input {
        padding: 10px;
        flex: 1;
      }
    }
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
    border-bottom: 4px solid #f87c00;
  }
}
</style>
