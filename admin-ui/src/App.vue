<template>
  <div id="app">
    <div v-if="token" class="layout">
      <Layout style="min-height:100vh;">
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <h2 class="admin">
            <Avatar icon="person" size="small" /> Admin</h2>
          <Menu :active-name="$route.path.split('/')[1]" theme="dark" width="auto" @on-select="menuChange" :class="menuitemClasses">
            <Menu-item name="users">
              <Icon type="ios-people"></Icon>
              <span>Users</span>
            </Menu-item>
            <Menu-item name="servers">
              <Icon type="cube"></Icon>
              <span>Servers</span>
            </Menu-item>
            <Menu-item name="logout">
              <Icon type="android-exit"></Icon>
              <span>Logout</span>
            </Menu-item>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Content :style="{margin: '20px', padding:'30px' , background: '#fff', minHeight: '220px'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </div>
    <Card v-else style="width:450px">
      <img src="./assets/logo.png">
      <Form ref="loginValidate" :model="form" :rules="ruleValidate">
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
        <FormItem>
          <Button type="ghost" class="loginbtn" shape="circle" @click="login" :disabled="loginLoading" >{{loginLoading?'LOADING..':'LOGIN'}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      isCollapsed: false,
      token: localStorage.getItem("api_token") || "",
      form: {
        email: "",
        password: ""
      },
      loginLoading: false,
      ruleValidate: {
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
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    login() {
      this.$refs['loginValidate'].validate(valid => {
        if (valid) {
          this.loginLoading = true;
          axios.post(window.baseURL + "login", this.form).then(res => {
            if (res.data.isAdmin) {
              this.token = res.data.token;
              localStorage.setItem("api_token", this.token);
              window.token = this.token;
            } else {
              this.$Message.error("You are not an admin");
            }
          }).catch(err =>{
              this.$Message.error(err.response.data.message);            
          }).finally(()=>{
            this.loginLoading = false;
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    logout() {
      localStorage.removeItem("api_token");
      this.token = "";
      window.token = "";
    },
    menuChange(type) {
      if (type == "logout") this.logout();
      else {
        this.$router.push("/" + type);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.admin {
  color: #fff;
  text-align: left;
  padding: 20px;
}
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.loginbtn {
  background: #7c68ac !important;
  color: #fff !important;
}

.loginbtn:hover {
  background: #957fc9 !important;
}
</style>