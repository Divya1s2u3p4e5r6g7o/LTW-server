function logins (logins) {
    return {
        loginid : logins.loginid,
        password : logins.password,
        temp_password : logins.password,
        username: logins.username,
        status: logins.status
    }  
}

module.exports = logins;