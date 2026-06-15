import React, { useEffect, useState } from 'react';
import { apiGet } from './services/api';
import './Notice.css';

function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await apiGet("/dashboard/content/?type=notices");
      setNotices(res.data || []);
    };
    fetchNotices();
  }, []);

  return (
    <div className="notice-page">
      <div className="notice-header">
        <h1>- Official Notices -</h1>
        <p>Announcements from the executive board</p><br/>
      </div>
      <div className="notices-grid">
        {notices.map(notice => (
          <div className="notice-card" key={notice.id}>
            <div className="notice-date">
              {new Date(notice.notified_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-message">{notice.body}</p>
          </div>
        ))}
        {notices.length === 0 && (
          <div className="empty-notice">No notices yet. Check back later.</div>
        )}
      </div>
    </div>
  );
}

export default Notice;
