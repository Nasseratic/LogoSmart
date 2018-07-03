<template>
  <Modal :loading="true" ok-text="Add" cancel-text="Cancel" v-model="modle1" title="Add new server" @on-ok="submitForm" @on-cancel="afterModle()">
    <Form ref="serverValidate" :model="form" :rules="ruleValidate">
      <FormItem prop="url">
        <Input type="text" v-model="form.url" placeholder="URL">
        </Input>
      </FormItem>
      <FormItem prop="type">
        <Select v-model="form.type" placeholder="Type">
          <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
    </Form>
    <!-- <i-switch v-model="form.active" size="large"></i-switch> -->
          <Button slot="footer" type="primary"   @click="submitForm" :disabled="loading" >{{loading?'LOADING..':'ADD'}}</Button>
  </Modal>
</template>
<script>
import API from "../API";

export default {
  props: ["modleState", "afterModle"],
  data() {
    return {
      loading: false,
      modle1: this.modleState || false,
      form: {
        url: "",
        type: "",
        active: false
      },
      types: ["inpaint", "gan", "detection"],
      ruleValidate: {
        url: [
          {
            required: true,
            message: "Please fill in the url.",
            trigger: "blur"
          },
          { type: "url", message: "Incorrect url format", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "Please fill in the type.",
            trigger: "blur"
          },
          {
            type: "enum",
            enum: ["inpaint", "gan", "detection"],
            message: "Wrong type",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["serverValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          API.post("server", this.form).then(res => {
            this.afterModle();
            this.$Message.success("server added");
          }).finally(()=>{
            this.loading = false;
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  },
  watch: {
    modleState(newValue) {
      this.modle1 = this.modleState;
    }
  }
};
</script>