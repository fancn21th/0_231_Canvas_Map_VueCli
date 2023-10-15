function getPieOption({ center, name, data }) {
  return {
    type: "pie",
    coordinateSystem: "geo",
    tooltip: {
      formatter: "{a}:{b}:{c}",
    },
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
    animationDuration: 0,
    radius: 20,
    center,
    zlevel: 5,
    name,
    data,
  };
}

export default ({ coordsMap, dataset }) => {
  return Object.keys(coordsMap)
    .map((name) => {
      const area = coordsMap[name];
      if (area.parent !== "湖北省") return null;
      const center = area.properties?.centroid;

      const index = dataset[0].indexOf(name);

      const data = dataset.slice(1).map((item) => {
        return {
          name: item[0],
          value: item[index],
        };
      });

      return center ? getPieOption({ center, name, data }) : null;
    })
    .filter((item) => item);
};
