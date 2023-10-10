export const calcBoundingCoords = (feature) => {
  const boundingCoords = [
    [Infinity, -Infinity],
    [-Infinity, Infinity],
  ];

  const coordinates = feature.geometry.coordinates;

  coordinates.forEach(function ([coords]) {
    coords.forEach(function (coord) {
      boundingCoords[0][0] = Math.min(boundingCoords[0][0], coord[0]);
      boundingCoords[0][1] = Math.max(boundingCoords[0][1], coord[1]);
      boundingCoords[1][0] = Math.max(boundingCoords[1][0], coord[0]);
      boundingCoords[1][1] = Math.min(boundingCoords[1][1], coord[1]);
    });
  });

  return boundingCoords;
};
