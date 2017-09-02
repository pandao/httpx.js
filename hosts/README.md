# Virtual Hosts

> Based on Apache HTTP Server.

### Edit hosts

```hosts
127.0.0.1 api.httpx.js
127.0.0.1 www.httpx.js
127.0.0.1 test.httpx.js
```

### api.httpx.js

```apacheconfig
<VirtualHost *:80>
    ServerAdmin webmaster@httpx.com
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/httpx.js/hosts/api"
    ServerName api.httpx.js
    ServerAlias api.httpx.js
    Header set Access-Control-Allow-Origin "*"
    ErrorLog "logs/api.httpx.js-error.log"
    CustomLog "logs/api.httpx.js-access.log" common
</VirtualHost>
```

### www.httpx.js

```apacheconfig
<VirtualHost *:80>
    ServerAdmin webmaster@httpx.com
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/httpx.js/hosts/www"
    ServerName www.httpx.js
    ServerAlias www.httpx.js
    Header set Access-Control-Allow-Origin "*"
    ErrorLog "logs/www.httpx.js-error.log"
    CustomLog "logs/www.httpx.js-access.log" common
</VirtualHost>
```

### test.httpx.js

```apacheconfig
<VirtualHost *:80>
    ServerAdmin webmaster@httpx.com
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/httpx.js/hosts/test"
    ServerName test.httpx.js
    ServerAlias test.httpx.js
    Header set Access-Control-Allow-Origin "*"
    ErrorLog "logs/test.httpx.js-error.log"
    CustomLog "logs/test.httpx.js-access.log" common
</VirtualHost>
```

