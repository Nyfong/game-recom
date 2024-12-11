import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Only PUT method is allowed" });
  }

  const filePath = path.join(process.cwd(), "data", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const { id, ...updatedFields } = req.body; // Example: { id: 123, name: 'Updated Name' }
  const itemIndex = data.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  data[itemIndex] = { ...data[itemIndex], ...updatedFields };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res
    .status(200)
    .json({ message: "Item updated successfully", data: data[itemIndex] });
}
