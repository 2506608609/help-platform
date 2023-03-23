const multer = require('koa-multer');
const fs = require('fs');
const path = require('path');

const router = require('koa-router')();

router.prefix('/upload');

const storage = multer.diskStorage({
    // 设置文件存储位置
    destination: function (req, file, cb) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dir = `./public/uploads/${year}${month}${day}`;

        // 判断目录是否存在，不存在则递归创建
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    // 设置上传文件名称
    filename: function (req, file, cb) {
        let fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

// 上传图片接口信息
router.post('/img', upload.single('myfile'), async ctx => {
    const filePath = ctx.req.file.path.replace('public', '');
    const url = ctx.origin + filePath;
    ctx.body = {
        data: url
    };
});

module.exports = router;