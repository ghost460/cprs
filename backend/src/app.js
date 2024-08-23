// import express from "express"
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import router from "./routes/router.js";
// const app = express()
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(express.json({limit:"32kb"}))
// app.use(express.urlencoded({extended:true, limit:"32kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())


// import {PrismaClient} from '@prisma/client';


// const prisma = new PrismaClient();

// app.use(express.json());

// // Use the hospital routes
// app.use('/api/hospitals', router);

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });