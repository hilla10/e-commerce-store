import cloudinary from '../lib/cloudinary.js';
import redis from '../lib/redis.js';
import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error getAllProducts controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get('featured_products');
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, fetch from  mongodb database
    // .lean() returns plain JavaScript objects instead of Mongoose documents
    // which is more performant for read-only operations
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: 'No featured products found' });
    }

    // store in redis for future requests
    await redis.set('featured_products', JSON.stringify(featuredProducts)); // expires in 1 hour

    res.json(featuredProducts);
  } catch (error) {
    console.error('Error getFeaturedProducts controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: 'products',
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : '',
      category,
    });

    return res.status(201).json({ product });
  } catch (error) {
    console.error('Error createProduct controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0]; // Extract public ID from URL path

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log('Deleted image from cloudinary');
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleteProduct controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          category: 1,
          description: 1,
        },
      },
    ]);

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error getRecommendedProducts controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error getProductsByCategory controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();

    await updateFeaturedProductsCache();

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error toggleFeaturedProduct controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    // the lean() method returns plain JavaScript objects instead of Mongoose documents
    // which is more performant for read-only operations
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    await redis.set('featured_products', JSON.stringify(featuredProducts));
  } catch (error) {
    console.error('Error updating featured products cache:', error);
  }
}
