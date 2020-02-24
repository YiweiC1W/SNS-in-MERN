const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile.model');
const User = require('../../models/User.model');

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
            .findOne({user: req.user.id})
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: ' There is no profile for this user'});
        }

        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route  POST api/profile/me
// @desc   Create or update user profile
// @access Private
router.post(
    '/',
    [
        auth,
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('skills', 'Skills is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company,
            location,
            website,
            bio,
            skills,
            status,
            githubusername,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook
        } = req.body;

        //Build profile object
        const profileFields = {};
        if (company) profileFields.company = company;

        if (location) profileFields.location = location;
    });

module.exports = router;