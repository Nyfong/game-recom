import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Only DELETE method is allowed" });
  }

  const filePath = path.join(process.cwd(), "data", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const { id } = req.body; // Example: { id: 123 }
  const updatedData = data.filter((item) => item.id !== id);

  if (data.length === updatedData.length) {
    return res.status(404).json({ message: "Item not found" });
  }

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  res.status(200).json({ message: "Item deleted successfully" });
}
