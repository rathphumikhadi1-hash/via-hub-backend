const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 📦 ข้อมูลสคริปต์เริ่มต้น (สามารถเพิ่มตัวอย่างสคริปต์ไว้ในนี้ได้เลย)
let scripts = [
    {
        id: "1",
        title: "Blox Fruits Auto Farm Hub",
        category: "Roblox",
        description: "สคริปต์ฟาร์มเวล ฟาร์มของ Auto Race V4 โหดๆ ไม่มีติดคีย์",
        code: "loadstring(game:HttpGet('https://raw.githubusercontent.com/script-example/main.lua'))()",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"
    }
];

// 1. [GET] ดึงสคริปต์ทั้งหมด
app.get('/api/scripts', (req, res) => {
    res.json(scripts);
});

// 2. [POST] เพิ่มสคริปต์ใหม่
app.post('/api/scripts', (req, res) => {
    const { title, category, description, code, image } = req.body;
    if (!title || !code) {
        return res.status(400).json({ error: 'กรอกข้อมูลไม่ครบ' });
    }
    
    const newScript = {
        id: Date.now().toString(),
        title,
        category: category || "Roblox",
        description: description || "",
        code,
        image: image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"
    };

    scripts.unshift(newScript); // เพิ่มไว้ด้านบนสุด
    res.status(201).json({ message: 'เพิ่มสคริปต์สำเร็จ!', script: newScript });
});

// 3. [DELETE] ลบสคริปต์
app.delete('/api/scripts/:id', (req, res) => {
    const { id } = req.params;
    scripts = scripts.filter(s => s.id !== id);
    res.json({ message: 'ลบสคริปต์เรียบร้อย' });
});

app.get('/', (req, res) => {
    res.send('🚀 Via HUB API Online (No DB Edition)!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
