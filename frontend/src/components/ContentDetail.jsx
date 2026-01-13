import React, { useEffect, useState } from 'react';
import api from '../api/client';
import CommentSection from './CommentSection';

const ContentDetail = ({ contentId, currentUser }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await api.get(`/content/${contentId}`);
      setContent(res.data);
    };
    if (contentId) fetchContent();
  }, [contentId]);

  if (!content) return <div>Select an item...</div>;

  return (
    <div>
      <h3>{content.title}</h3>
      <p>{content.description}</p>
      <p><strong>Author:</strong> {content.author?.name}</p>
      <p><strong>Tags:</strong> {content.tags.join(', ')}</p>
      <p><strong>Status:</strong> {content.status}</p>
      <CommentSection contentId={content._id} currentUser={currentUser} />
    </div>
  );
};

export default ContentDetail;
