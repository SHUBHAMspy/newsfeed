require('dotenv').config();
const http = require('http');
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./server/config");
const connectDb = require("./server/db/connectDb");
const postRoutes = require("./server/routes/postRoutes");
const sseRoute = require("./server/routes/sseRoute");

const { port, origin } = config;

const app = express();

// configure express app and install required middlewares
app.use(cors({origin,credentials:true}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// connect db
connectDb();
app.use(sseRoute);
app.use('/api',postRoutes);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Sever running on port: ${port}`);
})
