import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import couponRoutes from './routes/couponRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import analyticsRoutes from './routes/analyticsRoute.js';
import { connectDB } from './lib/db.js';

const app = express();

await connectDB();

app.use(cors()); // Middleware to enable CORS

const __dirname = path.resolve;

app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// app.get('/', (req, res) => {
//   res.send('Api is running');
// });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/dist')));

  app.use('{*splat}', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
