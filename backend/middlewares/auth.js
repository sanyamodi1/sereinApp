const { verifyToken } = require('@clerk/backend');

module.exports = async (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    console.log('Verifying token:', token); // Log the token for debugging
    // Verify the JWT token using Clerk
    const { payload } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY, // Ensure this is set in your .env
    });

    // Attach the user payload to the request
    req.user = payload; 
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};
