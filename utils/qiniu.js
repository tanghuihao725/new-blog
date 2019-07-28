/**
 * 七牛云 获取上传凭证 并传给前端
 */
// 
const qiniu = require('qiniu')

module.exports = (accessKey, secretKey, bucket) => {
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
        scope: bucket,
        expires: 72000,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
}