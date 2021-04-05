var knex = require("../database/connection");
var bcrypt = require("bcrypt");
class User {

    async new(user) {
        var { email, name, password, role } = user;
        try {

            var password = await bcrypt.hash(password, 10);

            await knex.insert({ email, name, password, role }).table("users");

        } catch (error) {
            console.log(error)
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select("*").from("users").where({ email: email });
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}
module.exports = new User;