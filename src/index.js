const express = require('express');
const { ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on port : ${ServerConfig.PORT}`);
    // Logger.info("Successfully started the server");
});