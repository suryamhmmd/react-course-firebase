import React, { useEffect, useState } from 'react';
import { TablePagination } from '@material-ui/core';
import moment from 'moment';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import 'firebase/database';
import app from '../../services/firebase';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChangePage = (event, newPage) => {
      scrollUp();
      setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const RenderData = () => {
    const data = news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tgl) => {
      const databerita = tgl.activity.map((act) => {
        return (
          <li className="berita">
            <a href={act.url} target="blank"><strong>{act.title}</strong></a>
            <p>{act.desc}</p>
          </li>
        );
      });
      return (
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <p>{moment(tgl.date).format('dddd, Do MMM YYYY')}</p>
              <ul>
                {databerita}
              </ul>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      );
    });
    return (
      <div>
        {data}
      </div>
    );
  };
  return (
    <div className="container">
      <h5>Berita Corona</h5>
      <hr />
      {
        isLoading ?
          <p>loading</p> : (
            <div>
              <RenderData />
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={news.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowPerPage}
              />
            </div>
        )
      }
    </div>
  );
};

export default CoronaNews;
