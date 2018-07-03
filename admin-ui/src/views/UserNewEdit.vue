<template>
  <Modal :loading="true" ok-text="Add" cancel-text="Cancel" v-model="modle1" title="Add/Edit User" @on-ok="submitForm" @on-visible-change="updateModel" @on-cancel="afterModle()">
 <Form  ref="userValidate" :model="form" :rules="ruleValidate">
        <FormItem prop="name">
          <Input type="text" v-model="form.name" placeholder="Name">
          <Icon type="person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="email">
          <Input type="email" v-model="form.email" placeholder="Email">
          <Icon type="ios-email-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <i-switch v-model="form.isAdmin" size="large"></i-switch>        
      </Form>
          <Button slot="footer" type="primary"   @click="submitForm" :disabled="loading" >{{loading?'LOADING..':(this.$route.query._id?'EDIT':'ADD')}}</Button>
  </Modal>
</template>
<script>
import API from "../API";

export default {
  props: ["modleState", "afterModle"],
  data() {
    return {
      modle1: this.modleState || false,
      form: {
        name: this.$route.query.name||"",
        email: this.$route.query.email||"",
        password: "",
        isAdmin: this.$route.query.isAdmin || false
      },
      loading: false,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "Please fill in the name.",
            trigger: "blur"
          },
        ],
        email: [
          {
            required: true,
            message: "Please fill in the email.",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["userValidate"].validate(valid => {
        if (valid) {
          this.loading = true;
          API[this.$route.query._id?'put':'post']("user/"+(this.$route.query._id?this.$route.query._id:''), this.form).then(res => {
            if(res.data.status){
              this.afterModle();
              this.$Message.success("server added");
            }
            else{
              this.$Message.error("Fail!");
            }
          }).finally(()=>{
            this.loading = false;
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    updateModel(){
      console.log(this.$route.query.isAdmin);
      
      this.form = {
        name: this.$route.query.name||"",
        email: this.$route.query.email||"",
        password: "",
        isAdmin: this.$route.query.isAdmin || false
      };
    }
  },
  watch: {
    modleState(newValue) {
      this.modle1 = this.modleState;
    }
  }
};
</script>