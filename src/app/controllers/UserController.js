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

            req.session.userId = user._id;

            console.log('-----------------------------------------------------')
            console.log('Session ID for ' + username + ': ' + req.session.id);
            console.log('-----------------------------------------------------')

            return res.redirect('/')
        } catch (err) {
            console.log('err: ',err);
            return res.status(500).send();
        }
    }

    // [GET] Logout
    logout(req, res, next) {
        req.session.destroy(err => {
            if (err) {
              return res.send('Có lỗi xảy ra');
            }
            res.redirect('/');
          });
    }

    forHeader(req,res,next){
        const { username } = req.body;
        User.findOne({ username: username })
            .then(user => {
                res.render('/partials/header', { user: mongooseToObject(user)})
            })
            .catch(next);
        
    }
}

module.exports = new UserController();