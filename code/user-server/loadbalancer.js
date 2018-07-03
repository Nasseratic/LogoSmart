const request = require("request");
const express = require("express");
const router = express.Router();
const Server = require("./models/Server");

let servers = {
    inpaint: ["http://localhost:8080/"],
    gan: [],
    detection: []
};

let curs = {
    inpaint: 0,
    gan: 0,
    detection: 0
};

getServers();

setInterval(() => {
    getServers();
}, 2000 * 60);

router.post("/:service(inpaint|gan|detect)/:whatever?", (req, res) => {
    if (servers.inpaint.length) {
        
        const { service } = req.params;
        
        const _req = request({
            url: servers[service][curs[service]] + (req.params.whatever || "")
        }).on("error", error => {
            res.status(500).send(error.message);
        });

        req.pipe(_req).pipe(res);
        
        curs[service] = (curs[service] + 1) % servers[service].length;

    } else {
        res.status(503).json({
            message: "server busy, request again after a second"
        });
    }
});

module.exports = router;

function getServers() {
    Server.find({}).exec((err, serversList) => {
        if (!err) {
            servers.inpaint , servers.gan , servers.detection = [];
            serversList.forEach(server=>{
                servers[server.type].push(server.url);
            });
        }
    });
}
