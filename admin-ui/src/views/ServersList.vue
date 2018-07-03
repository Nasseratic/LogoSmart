<template>
<div>
    <Button type="info" style="display:block; margin-bottom:20px;" @click="modleState=true" > <Icon type="plus" ></Icon> Add new </Button>
    <Table :loading="loading" border :columns="columns7" :data="servers" no-data-text="No Server Exist"></Table>
    <ServerNewEdit :modle-state="modleState" :after-modle="afterModle" />
     <Button type="dashed" style="display:block; margin-top:20px;" @click="loadData">
            <Icon type="refresh"></Icon> refresh </Button>
</div>
</template>

<script>
import API  from "../API.js";
import ServerNewEdit from "./ServerNewEdit";

export default {
    components:{
        ServerNewEdit
    },
    data() {
        return {
            modleState: false,
            loading: true,
            columns7: [
                {
                    title: "URL",
                    key: "url",
                    render: (h, params) => {
                        return h("div", [h("strong", params.row.url)]);
                    }
                },
                {
                    title: "Type",
                    key: "type"
                },
                {
                    title: "Action",
                    key: "action",
                    width: 350,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: params.active
                            //                 ? "warning"
                            //                 : "success",
                            //             size: "small"
                            //         },
                            //         style: {
                            //             marginRight: "5px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.show(params._id);
                            //             }
                            //         }
                            //     },
                            //     params.active ? "Deactivate" : "Activate"
                            // ),
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
            servers: []
        };
    },
    methods: {
        remove(id) {
            let index = this.servers.map(i => i._id).indexOf(id);
            this.servers.splice(index, 1);
        API.delete("server/" + id).then( res => {
          this.$Message.success('server deleted');
        });
        },
        afterModle(){
            this.modleState = false;
        },
        loadData(){
            this.loading = true;
            API.get('server').then(res => {
            this.servers = res.data.data
        }).finally(()=>{
            this.loading = false;
        });
        }
    },
    created() {
        this.loadData();
    }
};
</script>
