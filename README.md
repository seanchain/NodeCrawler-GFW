# NodeCrawler-GFW



Use Node.js to synchronously get the images and videos from the certain user of tumblr and instagram.



### Supported:

-   Instagram: images


-   tumblr: images and videos

### Usage:

change to the directory of `ins` or `tumblr`

change the url in the `index.js` to the certain user's media contents which you want to crawl

run the command as follow

``` sh
node index.js
```

注：这个repo使用了proxychains4来进行代理，所以请确保安装好proxychains4环境，然后有可用的shadowsocks服务。
