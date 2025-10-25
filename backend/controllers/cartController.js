import Product from '../models/Product.js';

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $in: req.user.cartItems.map((item) => item.id) },
    });

    //   add quantity to each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product._id.toString()
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error getCartProducts controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      user.cartItems.push(productId);
    }
    await user.save();

    return res.status(200).json({
      message: 'Product added to cart successfully',
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error('Error addToCart controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
    return res.status(200).json({
      message: 'Products removed from cart successfully',
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error('Error removeAllFromCart controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.status(200).json({
          message: 'Product removed from cart successfully',
          cartItems: user.cartItems,
        });
      }
      existingItem.quantity = quantity;
      await user.save();
      return res.status(200).json({
        message: 'Product quantity updated successfully',
        cartItems: user.cartItems,
      });
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error updateQuantity controller:', error);
    return res.status(500).json({ message: error.message });
  }
};
