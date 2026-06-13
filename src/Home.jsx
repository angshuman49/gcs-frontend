import React, {useState, useEffect} from 'react';
import './Home.css'
import {apiGet, apiPost} from './services/api.js'
function Home() {
  const [articles, setArticles] = useState([]);
   useEffect(() => {
    try {      
   
        const fetchArticle = async () => {
            const token = localStorage.getItem('access_token');
            const response = await apiGet("/dashboard/content/?type=articles")
            const data = response;
            console.log(response)
            setArticles(data.data || []);
            //setLoading(false);
        };
        fetchArticle();

         } catch (error) {
          console.log(err)
    }
    }, []);

  useEffect(() => {
    setArticles([...articles,


  ])
  
    return () => {
      return
    }
  }, [])
  
      return (
        <div>
  <div className='upperband'>
    <h1>Welcome to Event Portal</h1>
    <p>Check schedule and notices.</p>
  </div>
  <div className="articles">
    {articles.map(element => (
      <div className="article" id={element.aritcle_id} key={element.article_id}>
        <h4 className="header">{element.header}</h4>
        <p className="body">{element.body}</p>
      </div>
    ))}
  </div>
</div>
    );
}

export default Home;
