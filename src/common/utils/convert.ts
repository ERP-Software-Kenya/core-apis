export const parseBool = (value?: string): boolean => {
  value = value?.trim().toLowerCase() ?? "false";
  return value === "true" || value === "yes";
};

export const parseCSV = (content): object[] => {
  if (content) {
    const lines = content.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());

    const rows = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.replace(/"/g, "").replace(/\r/g, "").trim());
      const row = {};

      headers.forEach((header, index) => {
        const val = values[index];
        row[header] = val === "null" ? null : val;
      });

      return row;
    });

    return rows;
  }
};
