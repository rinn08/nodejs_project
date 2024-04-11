const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');

class UserController {


    // [GET] Create page
    create(req, res, next) {
        res.render('users/create')
    }

    // [POST] store account
    async store(req, res, next) {
        // req.body là dữ liệu lấy từ form
        const formData = req.body;
        try {
            // Mã hóa mật khẩu trước khi lưu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(formData.password, salt);

            // Thay thế mật khẩu nguyên gốc bằng mật khẩu đã mã hóa
            formData.password = hashedPassword;

            const user = new User(formData);
            await user.save();
            res.redirect('/users/login');
        } catch (err) {
            console.log(err);
            // Xử lý lỗi tại đây
        }
    }

    // [GET] Login
    login(req, res, next) {
        if (req.session.userId) {
            return res.redirect('/');
        }
        res.render('users/login')
    }

    // [POST] Check login
    async getin(req, res, next) {
        const { username, password } = req.body;
    
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).send('Tài khoản không tồn tại');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Sai mật khẩu');
            }
    
            // Set userId to session
            req.session.userId = user._id;
            req.session.username = user.name;
            return res.redirect('/')
        } catch (err) {
            console.log('err: ', err);
            return res.status(500).send();
        }
    }

    // [GET] Logout
    logout(req, res, next) {
        req.session.destroy(err => {
            if (err) {
                return res.send('Có lỗi xảy ra');
            }
            res.redirect('/users/login');
        });
    }
    

    forHeader(req, res, next) {
        const { username } = req.body;
        User.findOne({ username: username })
            .then(user => {
                res.render('/partials/header', { user: mongooseToObject(user) })
            })
            .catch(next);

    }
    checkExistence = async function (req, res) {
        try {
            const { username, email } = req.body;

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const user = await User.findOne({ username });
            if (user) {
                return res.json({ usernameExists: true });
            }

            // Kiểm tra xem email đã tồn tại chưa
            const userEmail = await User.findOne({ email });
            if (userEmail) {
                return res.json({ emailExists: true });
            }

            // Nếu cả tài khoản và email đều không tồn tại, trả về false
            return res.json({ usernameExists: false, emailExists: false });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi kiểm tra tài khoản và email');
        }
    };
}

module.exports = new UserController();