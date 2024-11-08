// app/routes/api.reviews.submit.js
import { json } from "@remix-run/node";

export async function action({ request }) {
  const formData = await request.formData();
  const newReview = {
    id: Date.now(), // 使用当前时间戳作为唯一 ID
    content: formData.get("content"),
    isApproved: false, // 新评论默认未审核
  };

  // 假设我们将新评论添加到一个数组或数据库
  // reviews.push(newReview);

  return json({ message: "评论已提交，等待审核", review: newReview }, { status: 201 });
}
