import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import 'firebase/database';
import app from '../../services/firebase';

const NewsItem = ({ news }) => {
  const { date, activity } = news[0];
  return (
    <div>
      <h3>{moment(date).format('dddd, Do MMM YYYY')}</h3>
      {activity.map((data) => {
        return (
          <div key={data.url}>
            <a href={data.url} target="blank">
              <h5>{data.title}</h5>
            </a>
            <p>{data.desc}</p>
          </div>
        );
      })}
    </div>
  );
};

const DetailDate = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { dateId } = params;

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      const filteredByDate = firebaseNews.data.filter((newsResp) => {
        return newsResp.date === dateId;
      });
      setNews(filteredByDate);
      setIsLoading(false);
    });
  }, [dateId]);

  return (
    <div className="container">
      <h5>Berita Corona</h5>
      <hr />
      {!isLoading && news.length > 0 ? (
        <NewsItem news={news} />
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
export default DetailDate;
