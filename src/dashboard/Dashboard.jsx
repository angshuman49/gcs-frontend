import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import {apiGet, apiPost} from '../services/api.js'
import { useNavigate } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [createDiag, setCreateDiag] = useState(false);
  const [editDiag, setEditDiag] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [newHeader, setNewHeader] = useState('');
  const [newBody, setNewBody] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const checkPriv = async ()=>{
      const res = await apiGet("/dashboard/check/");
      if (rest.status !== 200){ navigate("/account/Login")}
    }
    checkPriv();
  },[])
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (createDiag) setCreateDiag(false);
        if (editDiag) setEditDiag(false);
      }
    };
    if (createDiag || editDiag) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createDiag, editDiag]);


  useEffect(() => {
    const fetchArticles = async () => {
      const res = await apiGet("/dashboard/content/?type=articles");
      setArticles(res.data || []);
    }
    fetchArticles()
  }, [])

  const deleteArticle = async (id) => {
    await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Articles",
      mode: "delete",
      id: id
    })
    setArticles(articles.filter(a => a.id !== id))
  }

  const handleCreate = async () => {
    const res = await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Articles",
      mode: "create",
      header: newHeader,
      body: newBody
    })
    setArticles([...articles, res])
    setCreateDiag(false)
    setNewHeader('')
    setNewBody('')
  }

  const handleEdit = (article) => {
    setEditTarget(article)
    setNewHeader(article.header)
    setNewBody(article.body)
    setEditDiag(true)
  }

  const handleUpdate = async () => {
    await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Articles",
      mode: "update",
      id: editTarget.id,
      header: newHeader,
      body: newBody
    })
    setArticles(articles.map(a => a.id === editTarget.id ? {...a, header: newHeader, body: newBody} : a))
    setEditDiag(false)
    setEditTarget(null)
    setNewHeader('')
    setNewBody('')
  }

  return (
    <div className="dashboard-article">
      <button onClick={() => setCreateDiag(true)}>Create Article</button>
      <table border="1">
        <thead>
          <tr>
            <th>Header</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.header}</td>
              <td>{article.body}</td>
              <td>
                <button onClick={() => handleEdit(article)}>Edit</button>
                <button onClick={() => deleteArticle(article.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createDiag && (
        <div className="backdrop" onClick={(e)=>setCreateDiag(false)}>
          <div className="diag create_article_diag"  onClick={(e)=>e.stopPropagation()}>
       
            Header: <input type="text" value={newHeader} onChange={(e) => setNewHeader(e.target.value)} />
            <br/><br/>
            Body:<br/> <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} />
            <button onClick={handleCreate}>Create</button>
            <button onClick={() => setCreateDiag(false)}>Cancel</button>
  
          </div>
        </div>
      )}

      {editDiag && (
        <div className="backdrop" onClick={(e)=>setEditDiag(false)}>
          <div className="diag edit_article_diag"  onClick={(e)=>e.stopPropagation()}>
    
            Header: <input type="text" value={newHeader} onChange={(e) => setNewHeader(e.target.value)} /><br/><br/>

            Body: <br/><textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} />
            <button type="submit" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={() => setEditDiag(false)}>Cancel</button>

          </div>
        </div>
      )}
    </div>
  )
}

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [createDiag, setCreateDiag] = useState(false);
  const [editDiag, setEditDiag] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [newDay, setNewDay] = useState('');
  const [newTimerange, setNewTimerange] = useState('');
  const [newEvent, setNewEvent] = useState('');
  const [newNote, setNewNote] = useState('');
  const [dummy, setDummy] = useState(false)
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await apiGet("/dashboard/content/?type=schedule");
      setSchedule(res.data || []);
    }
    fetchSchedule()
  }, [dummy])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (createDiag) setCreateDiag(false);
        if (editDiag) setEditDiag(false);
      }
    };
    if (createDiag || editDiag) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createDiag, editDiag])

  const deleteSchedule = async (id) => {
    await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Schedule",
      mode: "delete",
      id: id
    })
    setSchedule(schedule.filter(s => s.id !== id));
  }

  const handleCreate = async () => {
    const res = await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Schedule",
      mode: "create",
      day: newDay,
      timerange: newTimerange,
      title: newEvent,
      note: newNote
    })
    setSchedule([...schedule, res])
    setCreateDiag(false)
    setNewDay('')
    setNewTimerange('')
    setNewEvent('')
    setNewNote('')
    setDummy((prev)=>!prev)
  }

  const handleEdit = (item) => {
    setEditTarget(item)
    setNewDay(item.day)
    setNewTimerange(item.timerange)
    setNewEvent(item.event)
    setNewNote(item.note || '')
    setEditDiag(true)
  }

  const handleUpdate = async () => {
    await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Schedule",mode: "update", id: editTarget.id,day: newDay,timerange: newTimerange,title: newEvent,note: newNote })
    setSchedule(schedule.map(s => s.id == editTarget.id ? {...s, day: newDay, timerange: newTimerange,event:newEvent,note: newNote}:s))
    setEditDiag(false)
    setEditTarget(null)
    setNewDay('')
    setNewTimerange('')
    setNewEvent('')
    setNewNote('')
  }

  return (
    <div className="dashboard-schedule">
      <button onClick={() => setCreateDiag(true)}>Create Schedule</button>
      <table border="1">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time Range</th>
            <th>Event</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(item => (
            <tr key={item.id}>
              <td>{item.day}</td>
              <td>{item.timerange}</td>
              <td>{item.event}</td>
              <td>{item.note || '-'}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => deleteSchedule(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createDiag && (
        <div className="backdrop"  onClick={(e)=>setCreateDiag(false)}>
          <div className="diag create_schedule_diag"  onClick={(e)=>e.stopPropagation()}>
    
              Day: <input type="number" value={newDay} onChange={(e) => setNewDay(e.target.value)} /> <br/>  <br/>
            Time Range: <input type="text" value={newTimerange} onChange={(e) => setNewTimerange(e.target.value)} placeholder="09:00 - 10:30" /><br/> <br/>
            Event: <input type="text" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} /><br/> <br/>
            Note: <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} /><br/> <br/>
            <button type="submit" onClick={handleCreate}>Create</button>
            <button type="button" onClick={() => setCreateDiag(false)}>Cancel</button>

                      </div>
        </div>
      )}

      {editDiag && (
        <div className="backdrop"  onClick={(e)=>setEditDiag(false)}>
          <div className="diag edit_schedule_diag"  onClick={(e)=>e.stopPropagation()}>
     
              Day: <input type="number" value={newDay} onChange={(e) => setNewDay(e.target.value)} /><br/> <br/>
            Time Range: <input type="text" value={newTimerange} onChange={(e) => setNewTimerange(e.target.value)} /><br/> <br/>
            Event: <input type="text" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} /><br/> <br/>
            Note: <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} /><br/> <br/>
            <button type="submit" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={() => setEditDiag(false)}>Cancel</button>

    
                      </div>
        </div>
      )}
    </div>
  )
}

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [createDiag, setCreateDiag] = useState(false);
  const [editDiag, setEditDiag] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
   
  const isLoggedIn = localStorage.getItem('access_token');


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (createDiag) setCreateDiag(false);
        if (editDiag) setEditDiag(false);
      }
    };
    if (createDiag || editDiag) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createDiag, editDiag]);


  useEffect(() => {
    if (!isLoggedIn){
      window.location.href="/accounts/Login"
    }
    const fetchNotices = async () => {
      const res = await apiGet("/dashboard/content/?type=notices");
      setNotices(res.data || []);
    }
    fetchNotices()
  }, [createDiag])

  const deleteNotice = async (id) => {
    await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Notice",
      mode: "delete",
      id: id
    })
    setNotices(notices.filter(n => n.id !== id))
  }

  const handleCreate = async () => {
    const res = await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Notice",
      mode: "create",
      title: newTitle,
      body: newBody
    })
    setNotices([...notices, res])
    setCreateDiag(false)
    setNewTitle('')
    setNewBody('')
  }

  const handleEdit = (notice) => {
    setEditTarget(notice)
    setNewTitle(notice.title)
    setNewBody(notice.body)
    setEditDiag(true)
  }

  const handleUpdate = async () => {
    await apiPost("/dashboard/change-dashboard/", {
      name_of_db: "Notice",
      mode: "update",
      id: editTarget.id,
      title: newTitle,
      body: newBody
    })
    setNotices(notices.map(n => n.id === editTarget.id ? {...n, title: newTitle, body: newBody} : n))
    setEditDiag(false)
    setEditTarget(null)
    setNewTitle('')
    setNewBody('')
  }

  return (
    <div className="dashboard-notice">
      <button onClick={() => setCreateDiag(true)}>Create Notice</button>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(notice => (
            <tr key={notice.id}>
              <td>{notice.title}</td>
              <td>{notice.body}</td>
              <td>{notice.notified_at}</td>
              <td>
                <button onClick={() => handleEdit(notice)}>Edit</button>
                <button onClick={() => deleteNotice(notice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createDiag && (
        <div className="backdrop"  onClick={(e)=>setCreateDiag(false)}>
          <div className="diag create_notice_diag"  onClick={(e)=>e.stopPropagation()}>


            Title: <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} /><br/> <br/>
            Body:<br/> <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} /><br/>
            <button type="submit" onClick={handleCreate}>Create</button>
            <button type="button" onClick={() => setCreateDiag(false)}>Cancel</button>


          </div>
        </div>
      )}

      {editDiag && (
        <div className="backdrop"  onClick={(e)=>setEditDiag(false)}>
          <div className="diag edit_notice_diag"  onClick={(e)=>e.stopPropagation()} >
 
              Title: <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} /><br/> <br/>
            Body:<br/> <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} /><br/>
            <button type="submit" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={() => setEditDiag(false)}>Cancel</button>
                      </div>
        </div>
      )}
    </div>
  )
}

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('articles')

  const handleTabSwitch = (val) => {
    setCurrentTab(val)
  }

  return (
    <div className="dashboard">
      <div className="tab-selector">
        <div className={`tab-header ${currentTab === 'articles' ? 'active' : ''}`} onClick={() => handleTabSwitch("articles")}>Articles</div>
        <div className={`tab-header ${currentTab === 'schedule' ? 'active' : ''}`} onClick={() => handleTabSwitch("schedule")}>Schedule</div>
        <div className={`tab-header ${currentTab === 'notice' ? 'active' : ''}`} onClick={() => handleTabSwitch("notice")}>Notices</div>
      </div>
      <div className="tab-widget">
        {currentTab === "articles" && <Articles/>}
        {currentTab === "schedule" && <Schedule/>}
        {currentTab === "notice" && <Notice/>}
      </div>
    </div>
  )
}

export default Dashboard
