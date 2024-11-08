// app/routes/api.reviews.published.js
import { json } from "@remix-run/node";

export async function loader() {
  // 假设您有一个数组 `reviews` 存储评论数据，过滤出已发布的评论
  const reviews = [
    { id: 1, content: "评论内容1", isApproved: true },
    { id: 2, content: "评论内容2", isApproved: false },
  ];
  
  const publishedReviews = reviews.filter(review => review.isApproved);
  return json(publishedReviews); // 返回 JSON 格式的已发布评论数据
}
