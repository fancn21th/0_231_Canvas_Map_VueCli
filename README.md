# 离线地图的下钻

## Steps

1. 一个只包含 GeoJSON 的 Echart 地图
2. 通过 setOption 设置 zoom 放大动画
3. 通过 setOption 设置 boundingCoords 限制地图显示范围
   1. zoom 和 boundingCoords 不是同步变化, boundingCoords 没有动画
4. 动态 获取 boundingCoords 所需的范围
