'use strict'
const db = require('../model/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const loginModel = require('../model/login.model');

exports.registration = async (req, res) => {
    try {
        let data = await loginModel(req.body);

        /* For encrypting the password */
        const encryptedPassword = await bcrypt.hash(data.password, 12);

        /* intializing the token and password to the session*/
        data.password = encryptedPassword;
       

        db.query('insert into tbl_login set ?', data, function (err, records, fields) {
            if (err) {
                throw (err)
            } else {
                if (records.affectedRows > 0) {
                    res.send({
                        status: 200,
                        response: "record inserted successfully",
                    })
                }
            }
        })
    } catch (error) {
        res.send(error)
    }
}

exports.verifyUser = async (req, res) => {
    try {
        await db.query("select password,emailid from tbl_login where emailid = '" + req.body.emailid + "' ", async function (err, records, fields) {
            if (err) {
                throw err;
            } else {
                if (records.length > 0) {
                    const comparedPassword = await bcrypt.compare(req.body.password, records[0].password);

                    /* for sigigning throw the jwt token*/
                    const token = jwt.sign({  emailId: records[0].emailid }, process.env.TOKEN_KEY, {
                        expiresIn: "1h",
                    })

                    if (!comparedPassword) {
                        res.send({
                            status: 404,
                            response: "Failure Incorrect Password!.",
                        })
                    } else {
                        res.send({
                            status: 200,
                            response: "success",
                            token: token,
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.send(error)
    }
}