/**
 * 实现本地服务器上传图片功能
 */

const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const formatTime = require('silly-datetime')

const config = require('../../../myconfig')

module.exports = (req, res) => {
    // 创建上传表单
    let form = new formidable.IncomingForm()
    // 设置编码格式
    form.encoding = 'utf-8'
    /* 设置上传目录 */
    form.uploadDir = path.join(__dirname, '../../../serverImage')
    /* 保留文件后缀名 */
    form.keepExtensions = true;

    /* 格式化数据 */
    form.parse(req, (err, fields, files) => {
        let file = files.file
        // 出错拦截
        if (err) return res.status(500).json({ msg: '服务器内部错误', code: 'S0001' })

        //  储存后缀名
        let extName = '';
        switch (file.type) {
            case 'image/png':
            case 'image/x-png':
                extName = 'png';
                break;
            case 'image/jpg':
            case 'image/jpeg':
                extName = 'jpg';
                break;
        }
        // 如果文件后缀未赋值
        if (extName.length === 0) {
            return res.status(400).json({ msg: '只支持png与jpg格式文件' });
        }
        /* 拼接新的文件名 */
        let time = formatTime.format(new Date(), 'YYYYMMDDHHmmss');
        let num = Math.floor(Math.random() * 8999 + 10000);
        let imageName = `${time}_${num}.${extName}`;
        let newPath = form.uploadDir + '/' + imageName;

        /* 更改名字和路径 */
        fs.rename(file.path, newPath,(err)=>{
            if(err) return res.status(400).json({msg: '图片上传失败'})
            return res.json({msg: '图片上传成功!', url:`${config.dev_url}/serverImage/${imageName}`})
        })

    })


}