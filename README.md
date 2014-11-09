APPLE TV CCTV代理
=================

用於「[享看TV](http://www.ttdianshi.com/)」的「個人鏈接」。

## 實現

利用 cntv.cn 的 API 獲取直播地址。
`http://vdn.live.cntv.cn/api2/liveHtml5.do?channel=pa://cctv_p2p_hdcctv1&client=html5`

## 用法

```
$ node main.js
```

默認端口為：8002，如有需要可以修改腳本中的 `PORT` 常量來改變端口。

訪問地址為：`http://your_lan_ip:8002/cctv1.mp4`，更多地址見`channels.txt`文件。

注意：直播地址中包含了用戶 IP 地址和驗證 hash，服務器會進行驗證，所以**代理必須部署在與 apple tv 相同的局域網中**，即出口 IP 應相同。
