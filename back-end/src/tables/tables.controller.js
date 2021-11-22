const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//middleware
const REQUIRED_PROPERTIES = [
    "table_name", 
    "capacity",
];

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

//CRUD
async function list(req, res){
    const data = await service.list();
    res.json({ data });
}

async function create(req, res){
    const data = await service.create(req.body.data);
    res.status(201).json({ data })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [
        hasRequiredProperties, 
        asyncErrorBoundary(create)
    ],
};