<template>
  <div class="enrollEmail">
    <div class="validPhone"></div>
    <component :is="view" @enroll="enroll" :phone="phone"></component>
  </div>
</template>

<script>
import EnrollPhone from "./validPhone.vue";
import enroll from "./Enroll.vue";

export default {
  name: "enrollemail",
  data() {
    return {
      input: "",
      phone: "",
      view: EnrollPhone,
      enrollView: {
        enroll
      }
    };
  },
  components: {
    EnrollPhone,
    enroll
  },
  methods: {
    enroll(e) {
      this.phone = e.value.mobilephone;
      this.view = this.enrollView[e.key];
    }
  }
};
</script>
