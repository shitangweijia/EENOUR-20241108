import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// 启用 CORS，仅允许 Shopify 页面来源的请求
app.use(cors({
  origin: '*' // 临时允许所有来源，调试后改为'您的Shopify域名'
}));

const PORT = process.env.PORT || 3000;

// 批准评论的 API 路由
app.post('/api/reviews/approve/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { status: 'approved' },
    });
    res.json({ message: '评论已批准', review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: '批准评论时出错' });
  }
});

// 删除评论的 API 路由
app.delete('/api/reviews/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: '评论已删除' });
  } catch (error) {
    res.status(500).json({ error: '删除评论时出错' });
  }
});

// 提交评论的 API 路由 (如果页面需要)
app.post('/api/reviews/submit', async (req, res) => {
  const { content } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: { content, status: 'pending' }
    });
    res.json({ message: '评论已提交', review: newReview });
  } catch (error) {
    res.status(500).json({ error: '提交评论时出错' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
