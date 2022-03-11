



【官方教程】https://nginx.org/en/linux_packages.html#Ubuntu

安装先决条件：

> ```
> sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
> ```



导入官方 nginx 签名密钥，以便 apt 可以验证包的真实性。获取密钥：

> ```shell
> curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
>     | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
> ```

验证下载的文件是否包含正确的密钥：

> ```
> gpg --dry-run --quiet --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
> ```

输出应包含完整的指纹 `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62` ，如下所示：

> ```
> pub   rsa2048 2011-08-19 [SC] [expires: 2024-06-14]
>       573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
> uid                      nginx signing key <signing-key@nginx.com>
> ```

如果指纹不同，请删除该文件。

要为稳定的 nginx 包设置 apt 存储库，请运行以下命令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```

如果您想使用主线 nginx 包，请运行以下命令：

> ```
> echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
> http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" \
>     | sudo tee /etc/apt/sources.list.d/nginx.list
> ```



设置存储库固定以更喜欢我们的包而不是分发提供的包：

> ```
> echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
>     | sudo tee /etc/apt/preferences.d/99nginx
> ```



要安装 nginx，请运行以下命令：

> ```
> sudo apt update
> sudo apt install nginx
> ```



安装完成后：

查看版本

```shell
nginx -v
```

启动

```shell
service nginx start
```

http访问ip地址，出现【Welcome to nginx!】即成功



【补充】

- /usr/sbin/nginx：主程序
- /etc/nginx：存放配置文件
- /usr/share/nginx：存放静态文件
- /var/log/nginx：存放日志