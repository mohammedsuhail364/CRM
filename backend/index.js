require("dotenv").config();
const express = require("express");
const cors = require("cors");


const customerRoutes = require("./routes/customerRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { connectDB } = require("./lib/db");
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const { inngest, functions } = require("./lib/inngest.js");
const {clerkMiddleware} = require('@clerk/express');
const {serve}=require('inngest/express');


app.use(express.json());
// credentials:true meaning -> server allows a browser
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});
app.use(clerkMiddleware()) // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/customer", customerRoutes);
app.use("/employee", ticketRoutes);
app.use("/admin", adminRoutes);

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(clientPath));

  // SPA fallback (THIS is the key)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running in ${PORT} port`);
    });
  } catch (error) {
    console.error("Error starting in server", error);
  }
};
startServer();