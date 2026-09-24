const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ เชื่อมต่อ MongoDB สำเร็จ!'))
    .catch(err => console.error('❌ DB Error:', err));

const ScriptSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const Script = mongoose.model('Script', ScriptSchema);

app.get('/api/scripts', async (req, res) => {
    try {
        const scripts = await Script.find().sort({ createdAt: -1 });
        res.json(scripts);
    } catch (err) {
        res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
    }
});

app.post('/api/scripts', async (req, res) => {
    try {
        const { title, category, description, code, image } = req.body;
        const newScript = new Script({ title, category, description, code, image });
        await newScript.save();
        res.status(201).json({ message: 'เพิ่มสคริปต์สำเร็จ!', script: newScript });
    } catch (err) {
        res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
    }
});

app.delete('/api/scripts/:id', async (req, res) => {
    try {
        await Script.findByIdAndDelete(req.params.id);
        res.json({ message: 'ลบเรียบร้อย' });
    } catch (err) {
        res.status(400).json({ error: 'ลบไม่สำเร็จ' });
    }
});

app.get('/', (req, res) => {
    res.send('🚀 Via HUB API Online!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

