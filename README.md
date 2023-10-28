# 离线地图的下钻

## Geo JSON

1. [GeoJSON](https://geojson.org/)
2. [atlas](https://datav.aliyun.com/portal/school/atlas/area_selector)

## Requirement

1. 能够显示 省市县地图 以及 若干个区域组成的区域

   1. 当前层级的背景 `可配置`
   2. 高亮 ( Hover ) `可配置`
   3. 若干个区域 选中其中一个 只能单选
   4. shadow `可配置`
   5. 区域 border `可配置`
   6. 上钻和下钻 `完成`

2. 市和县一级能够拖动切换 到 同级其他区域
3. 部分业务模块 需要在每一级地图 有 柱状图 / 散点
4. 当全局的过滤条件 (年份) 发生变化, 地图内的 图表数据也发生变化
   1. 暴露事件
5. 动画
