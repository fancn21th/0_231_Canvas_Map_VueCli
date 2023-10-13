# 离线地图的下钻

## Geo JSON

1.  [GeoJSON](https://geojson.org/)
2.  [atlas](https://datav.aliyun.com/portal/school/atlas/area_selector)

## Requirement

1.  能够显示 省市县地图 以及 若干个区域组成的区域

    1. 当前层级的背景
    2. 高亮 ( Hover )
    3. 若干个区域 选中其中一个 只能单选
    4. shadow
    5. 区域 border
    6. 上钻和下钻

2.  市和县一级能够拖动切换 到 同级其他区域
3.  部分业务模块 需要在每一级地图 有 柱状图 / 圆点
4.  当全局的过滤条件 (年份) 发生变化, 地图内的 图表数据也发生变化
5.  动画

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
