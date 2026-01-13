import React, { useState } from 'react';
import api from '../api/client';

const ContentForm = ({ currentUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('Draft');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = {
        title,
        description,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        project: projectId || null,
        region: currentUser.region,
        author: currentUser._id,
        status
      };
      const res = await api.post('/content', body);
      setMessage(`Content created with ID: ${res.data._id}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating content');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Content</h2>
      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} required />

      <label>Tags (comma-separated)</label>
      <input value={tags} onChange={e => setTags(e.target.value)} required />

      <label>Status</label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="Draft">Draft</option>
        <option value="PendingApproval">Submit for Approval</option>
      </select>

      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ContentForm;
