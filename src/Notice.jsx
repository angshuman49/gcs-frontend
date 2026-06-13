import React, { useEffect, useState } from 'react';
import {apiGet, apiPost} from './services/api.js'

function Notice() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
    try {      
   
        const fetchArticle = async () => {
            //const token = localStorage.getItem('access_token');
            const response = await apiGet("/dashboard/content/?type=notices")
            const data = response;
            console.log(response)
            setNotices(data.data || []);
            //setLoading(false);
        };
        fetchArticle();

         } catch (error) {
          console.log(err)
    }
    }, []);


    return (
        <div>
            <h1>Notices</h1><br/>
            {notices.map(notice => (
          <div className="notice" key={notice.id || notice.notice_id}>
            <h4 className="notice-header">{notice.title}</h4>
            <p className="notice-body">{notice.body}</p>
            <small className="notice-date">{new Date(notice.notified_at).toLocaleString()}</small>

          </div>
        ))}        </div>
    );
}

export default Notice;
