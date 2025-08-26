import { Sequelize, DataTypes } from "sequelize";
import { dirname } from "path";
import { fileURLToPath } from "url";

let storePath = dirname(fileURLToPath(import.meta.url)) + "./../database/db.sqlite";

const sequelize = new Sequelize({
    dialect:    "sqlite",
    storage:    storePath
});

let LoginTable = sequelize.define("users",{
    username:   {
        allowNull:  false,
        type:       DataTypes.STRING
    },
    email:   {
        allowNull:  false,
        type:       DataTypes.STRING
    },
    password:   {
        allowNull:  false,
        type:       DataTypes.STRING
    },
    advcal:   {
        allowNull:  false,
        type:       DataTypes.STRING
    }
    
});

export default {
    sequelize,
    LoginTable
};
