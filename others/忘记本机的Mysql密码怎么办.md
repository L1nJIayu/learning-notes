# 忘记本机的Mysql密码怎么办



1.  停止 mysql server.  通常是在 '系统偏好设置' > MySQL > 'Stop MySQL Server'
或者: sudo /usr/local/mysql/support-files/mysql.server stop
2.  打开终端，输入：
     sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables （此处和强行修改一的区别就是 & 符号）
3.  打开另一个新终端，输入:
     ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
4.  FLUSH PRIVILEGES;

5. 重启 sudo /usr/local/mysql/support-files/mysql.server restart

6. 用新密码登录

进入安装目录  cd /usr/local/mysql/bin/

mysql -u root -p

输入新密码 123456

登录成功。
