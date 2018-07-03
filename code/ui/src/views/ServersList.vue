<template>
  <Table border :columns="columns7" :data="servers" no-data-text="No Server Exist"></Table>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            columns7: [
                {
                    title: "URL",
                    key: "url",
                    render: (h, params) => {
                        return h("div", [
                            h("strong", params.row.url)
                        ]);
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
                                            this.show(params._id);
                                        }
                                    }
                                },
                                params.active?"Deactivate":"Activate"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: params.active?"warning":"success",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params._id);
                                        }
                                    }
                                },
                                params.active?"Deactivate":"Activate"
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
                                            this.remove(params._id);
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
        edit(id) {
            this.$router.push("/server/"+id);            
        },
        remove(id) {
            let index = this.servers.map(i=>i._id).indexOf(id);
            this.servers.splice(index, 1);
            axios.delete(window.baseURL+'server/'+id);
        }
    },
    created(){
        axios.get(window.baseURL+'server').then( res => {
            this.servers = res.data.data;
            window.servers = res.data.data;
        });
    }
};
</script>
