const app = require("./app");

const PORT = process.env.PORT || 8080;
const SERVER_URL = process.env.SERVER_URL || "http://localhost";

app.listen(PORT, () => {
    console.log(`SERVER IS LIVE ON ${SERVER_URL}:${PORT}`);
})