export const nameMap = {
  // 武汉市
  武汉市: "wuhan",
  黄陂区: "huangpi",
  // 十堰市
  十堰市: "shiyan",
  // 宜昌市
  宜昌市: "yichang",
  秭归县: "zigui",
  长阳土家族自治县: "changyang",
  // 恩施
  恩施土家族苗族自治州: "enshi",
  巴东县: "badong",
  // 神农架
  神农架林区: "shennongjia",
};

export { default as china } from "./country/中国.json";
export { default as hubei } from "./province/湖北省.json";

// 武汉市
export { default as wuhan } from "./city/武汉市.json";
export { default as huangpi } from "./county/武汉市/黄陂区.json";

// 十堰市
export { default as shiyan } from "./city/十堰市.json";

// 宜昌市
export { default as yichang } from "./city/宜昌市.json";
export { default as zigui } from "./county/宜昌市/秭归县.json";
export { default as changyang } from "./county/宜昌市/长阳土家族自治县.json";

// 恩施
export { default as enshi } from "./city/恩施土家族苗族自治州.json";
export { default as badong } from "./county/恩施土家族苗族自治州/巴东县.json";

// 神农架
export { default as shennongjia } from "./city/神农架林区.json";
