function randomPieSeries({ center, name }) {
  const data = ["A", "B", "C", "D"].map((t) => {
    return {
      value: Math.round(Math.random() * 100),
      name: "Category " + t,
    };
  });
  return {
    type: "pie",
    coordinateSystem: "geo",
    tooltip: {
      formatter: "{b}: {c} ({d}%)",
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
    data,
    zlevel: 5,
    name,
  };
}

export default ({ coordsMap }) => {
  return Object.keys(coordsMap)
    .map((name) => {
      const area = coordsMap[name];
      if (area.parent !== "湖北省") return null;
      const center = area.properties?.centroid;
      return center ? randomPieSeries({ center, name }) : null;
    })
    .filter((item) => item);
};
