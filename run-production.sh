echo '获取git上最新版本'
sudo git pull


echo '安装所需要依赖以及打包前端代码'
sudo npm run build

echo '设置环境为生产环境'
export NODE_ENV=production

echo '现在环境为'$NODE_ENV

echo '启动服务器'
sudo pm2 stop all
sudo pm2 start server.js --name thhsblog