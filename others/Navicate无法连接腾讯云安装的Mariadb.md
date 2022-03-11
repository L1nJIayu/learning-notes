# Navicate无法连接腾讯云安装的Mariadb



#### 现象：

远程登陆数据库的时候出现了下面出错信息 :

ERROR 2003 - Can't connect to MySQL server on (61 "Connection refused")



【方法一】去腾讯云的控制台 - 防火墙，添加一条Mysql 3306的规则



【方法二】检查防火墙是否开启，以及添加3306端口

```shell
ufw status verbose

ufw allow 3306
ufw reload
```



【方法三】修改配置

```shell
cd /etc/mysql/mysql/mariadb.conf.d
vim 50-server.cnf
```

将bind-address = 127.0.0.1注释，重启mariadb

```shell
service mariadb restart
```





【方法四】修改mysql数据库中的user表的host为%

```javascript
mariadb -u root -p

(none)> show databases;
(none)> use mysql;

(mysql)> select user,host from user;
(mysql)> update user set host = ' % ' where user = ' root ';
(mysql)> select user,host from user;
```



【方法五】授予权限

```shell
(mysql)> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '数据库密码' WITH GRANT OPTION;
(mysql)> FLUSH RIVILEGES
```

























