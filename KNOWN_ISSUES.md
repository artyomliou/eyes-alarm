# all
- 套用新設定時，如果數值與舊設定一樣，則 counter 不會重新啟動(而且仍然會顯示成功)
- - 暫時性的解決方案是加上一個 timestamp ，因為一天有八萬多秒，實在不太可能重複。只要沒重複就會觸發 Storage Changed 事件。這樣就能做一個假性更新的動作
- 沒有能關閉 *idle後重置*、*locked後重置* 的設定
- 因為直接拿 512x512 的 icon 縮小給 bar 上的 button 用，所以效果不是很好，應該針對 bar 另外畫一個間距稍高的 icon
- 自訂音效只能塞網址，而且每次撥放都會重下載一次 WTF
- 自訂音效不能用 local file
- - 因為 fetch api 不能抓 blob url，而且他是暫時性的
- - 因為 input file 抓出來的 value 是 C://fakepath/~ 的形式
- - 即使 FileReader 也沒有給相關的 API 能提供永久可存取路徑

# firefox
- getViews({ type: "popup" }) 會抓到 options page 的樣子
- 不支援 idle state

# chrome