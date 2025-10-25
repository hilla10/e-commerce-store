import Coupon from '../models/Coupon.js';

export const getCoupon = async (req, res) => {
  try {
    const { user } = req;
    const coupon = await Coupon.findOne({ userId: user._id, isActive: true });

    if (!coupon) {
      return res
        .status(404)
        .json({ message: 'No active coupon found for this user' });
    }

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
    console.error('Error in getCoupon controller:', error);
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ message: 'Invalid or inactive coupon code' });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    res.status(200).json({
      message: 'Coupon is valid',
      discountPercentage: coupon.discountPercentage,
      code: coupon.code,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
    console.error('Error in validateCoupon controller:', error);
  }
};
