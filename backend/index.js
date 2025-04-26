require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./conn/conn");
const facultyRoutes = require("./routes/facultyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes=require("./routes/studentRoutes");
const userAuth=require("./routes/authRoutes");
const watRoutes = require('./routes/watRoutes'); // Adjust path if needed
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/students', studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/admin", adminRoutes);
app.use("/auth",userAuth);
app.use('/api/wats', watRoutes);

app.use('/api/subjects', subjectRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
