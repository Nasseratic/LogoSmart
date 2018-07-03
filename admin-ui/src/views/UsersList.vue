<template>
    <div>
        <Button type="info" style="display:block; margin-bottom:20px;" @click="modleState=true">
            <Icon type="plus"></Icon> Add new </Button>
        <Table :loading="loading" border :columns="columns7" :data="users"></Table>
        <UserNewEdit :modle-state="modleState" :after-modle="afterModle" />
        <Button type="dashed" style="display:block; margin-top:20px;" @click="loadData">
            <Icon type="refresh"></Icon> refresh </Button>
    </div>
</template>

<script>
import API from "../API";
import UserNewEdit from "./UserNewEdit";
export default {
  components: {
    UserNewEdit
  },
  data() {
    return {
      modleState: false,
      loading: true,
      columns7: [
        {
          title: "Name",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "Email",
          key: "email"
        },
        {
          title: "Admin",
          key: "isAdmin"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "Edit"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row._id);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      users: []
    };
  },
  methods: {
    remove(id) {
      let index = this.users.map(i => i._id).indexOf(id);
      this.users.splice(index, 1);
      API.delete("user/" + id).then(res => {
        this.$Message.success("user deleted");
      });
    },
    edit(row) {
      this.$router.push({ query: row },()=>{
          this.modleState = true;
      }); 
    },
    afterModle() {
      this.$router.push({ query: {} });
      this.modleState = false;
    },
    loadData() {
      this.loading = true;
      API.get("user")
        .then(res => {
          this.users = res.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
