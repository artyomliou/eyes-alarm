# all
- 套用新設定時，如果數值與舊設定一樣，則 counter 不會重新啟動(而且仍然會顯示成功)
> 暫時性的解決方案是加上一個 timestamp ，因為一天有八萬多秒，實在不太可能重複。只要沒重複就會觸發 Storage Changed 事件。這樣就能做一個假性更新的動作
- 看起來我對 flex 機制的掌握度有待提高廠廠
- 沒有能關閉 *idle後重置*、*locked後重置* 的設定

# firefox
- getViews({ type: "popup" }) 會抓到 options page 的樣子
- 不支援 idle state

# chrome