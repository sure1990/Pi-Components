export const getQuery = (
  tableName: string,
  columns: string[],
  values: any[][]
) => {
  const statement = `INSERT INTO ${tableName} (${columns.join(",")})`;
  const placeholders = values.map((x) => `(${x.map((val) => "?").join(",")})`);

  return `
  ${statement}
  VALUES
  ${placeholders.join(",")}
  `;
};
