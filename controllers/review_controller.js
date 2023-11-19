const User = require('../models/user');
const Review = require('../models/review');

// Create a new review
module.exports.newReview = async (req, res) => {
    debugger;
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
            req.flash('error', 'Please log in!');
            return res.redirect('/users/sign-in');
        }

        // Find the recipient user by ID
        const recipient = await User.findById(req.params.id);

        if (!recipient) {
            req.flash('error', 'User not found!');
            return res.redirect('/');
        }

        // Remove the recipient's ID from the user's list of users to review
        const indexToRemove = req.user.userToReview.indexOf(recipient.id);
        if (indexToRemove !== -1) {
            req.user.userToReview.splice(indexToRemove, 1);
            await req.user.save();
        }

        // Create a new review
        const newReview = await Review.create({
            content: req.body.newReview,
            reviewBy: req.user.id,
            reviewBy_name: req.user.name,
            reviewTo: recipient.id,
        });

        // Add the new review to the recipient's list of received reviews
        recipient.reviewReceivedFrom.push(newReview);
        await recipient.save();

        req.flash('success', 'Review submitted successfully!');
        return res.redirect('/');
    } catch (err) {
        
        console.error('Error in newReview:', err);
        req.flash('error', 'An error occurred while submitting the review.');
        return res.redirect('/');
    }
};
