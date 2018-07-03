<template>
  <div id="app">
    <div class="layout">
      <Layout style="min-height:100vh;">
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <h2 class="admin">
            <Avatar icon="person" size="small" /> Admin Panel</h2>
          <Menu :active-name="$route.path.split('/')[1]" theme="dark" width="auto" :class="menuitemClasses">
            <router-link to="/users">
              <Menu-item  name="/users">
              <Icon type="ios-people"></Icon>
              <span>Users</span>
            </Menu-item>
            </router-link>
            <router-link to="/servers">
              <Menu-item name="/servers">
              <Icon type="cube"></Icon>
                <span>Servers</span>
              </Menu-item>
            </router-link>
            <Menu-item name="1-3">
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
  </div>
</template>



<script>
export default {
    data() {
        return {
            isCollapsed: false
        };
    },
    computed: {
        menuitemClasses: function() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
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

.admin{
  color: #fff;
  text-align: left;
  padding: 20px;
}
.layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
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
</style>