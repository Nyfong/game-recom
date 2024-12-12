import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method is allowed" });
  }

  const filePath = path.join(process.cwd(), "data", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const newItem = req.body; // Example: { id: 123, name: 'New Item' }
  data.push(newItem);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Item created successfully", data: newItem });
}
