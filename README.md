# 离线地图的下钻

## Steps

1. 只包含 GeoJSON 的 Echart 地图
2. 通过 setOption 设置 zoom 放大动画
3. 通过 setOption 设置 boundingCoords 限制地图显示范围
   1. zoom 和 boundingCoords 不是同步变化
   2. boundingCoords 没有动画
4. 动态 获取 boundingCoords 所需的范围
   1. 获取点击 区域的 位置
   2. 计算 位置 的 boundingCoords
   3. 通过 setOption 设置 boundingCoords
5. 省和市的地图叠加
   1. 通过多个 geo 绘制多个地图
