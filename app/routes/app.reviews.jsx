import { useEffect, useState } from 'react';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  // 获取所有待审核评论
  useEffect(() => {
    fetch('/api/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);

  // 审核评论
  const approveReview = (id) => {
    fetch(`/api/reviews/approve/${id}`, { method: 'POST' })
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      });
  };

  // 删除评论
  const deleteReview = (id) => {
    fetch(`/api/reviews/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      });
  };

  return (
    <div>
      <h1>评论管理 12123</h1>
      {reviews.length === 0 ? (
        <p>没有待审核的评论</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
              <button onClick={() => approveReview(review.id)}>批准</button>
              <button onClick={() => deleteReview(review.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}

export default Reviews;
