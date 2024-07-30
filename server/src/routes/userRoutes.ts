import { Router, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import authMiddleware, { AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

// Change password
router.post('/change-password', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Change email
router.post('/change-email', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { newEmail } = req.body;

  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the new email is already taken
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: 'Email changed successfully' });
  } catch (error) {
    console.error('Change email error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
