// exports will make it available where this module is loaded
exports.authenticate = function (id, pwd) {
    if ( id === "admin" && pwd === "password") {
      return "authentication success";
    }
    return "authentication failed!";
}
