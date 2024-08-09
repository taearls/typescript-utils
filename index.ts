const getUniqueCountsInArray = <
  T extends string | { [key: string]: string | string[] },
>(
  array: T[],
  keysToFilter?: string[],
  minCount = 2,
) => {
  const map = new Map<string, number>();

  for (const item of array) {
    if (typeof item === "string") {
      const count = map.get(item) || 0;
      map.set(item, count);
    } else {
      for (const [key, val] of Object.entries(item)) {
        if (keysToFilter && !keysToFilter.includes(key)) {
          continue;
        }

        let count = 0;

        const mapKey = `${key} - ${val}`;

        if (typeof val === "string") {
          count = map.get(mapKey) || 0;
        }

        map.set(mapKey, count + 1);
      }
    }
  }
  for (const [key, val] of map.entries()) {
    if (val < minCount) {
      map.delete(key);
    }
  }
  return map;
};
