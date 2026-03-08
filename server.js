const app = require("./src/app");


app.listioner(3000, () => {
    console.log('server is rumming on port 3000');
})