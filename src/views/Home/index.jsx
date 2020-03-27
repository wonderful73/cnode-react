import React from 'react';
import AppWrapper from '../../layout/AppWrapper'
import { get } from '../../fetch';
import styles from './index.module.css';

const Home = () => {
  const isFetching = React.useRef(false);
  const isFetched = React.useRef(false);
  const isCancel = React.useRef();
  const page = React.useRef(1);
  const [topics, setTopics] = React.useState([]);

  const fetchTopics = React.useCallback(
    async () => {
      isFetching.current = true;
      const params = {
        url: '/topics',
        params: {
          tab: 'all',
          page: page.current,
          limit: 20,
          mdrender: true,
        }
      };

      const { success, data } = await get(params);

      if (isCancel.current) return;

      if (success) {
        setTopics(prevState => (isFetched.current ? [...prevState, data] : data));
        page.current += 1;
        isFetched.current = true;
      } else {
        console.log('fetch topics fail.');
      }

      isFetching.current = false;
    },
    []
  )

  React.useEffect(() => {
    isFetching.current = false;
    isFetched.current = false;
    page.current = 1;
    setTopics([]);
  }, []);

  React.useEffect(() => {
    isCancel.current = false;

    fetchTopics();

    return () => {
      isFetching.current = false;
      isCancel.current = true;
    }
  }, [fetchTopics]);

  return (
    <AppWrapper title="cnode">
      <div className="Home">
        <div className={styles.topicsList}>
          {topics.map((item) => (
            <div className={styles.topic} key={item.id}>
              <div className={styles.avatar}>
                <img src={item.author.avatar_url} />
              </div>
              <div className="infoSet">
                <div className={styles.title}>{item.title}</div>
                <div className={styles.count}>
                  <span className={styles.loginname}>
                    {item.author.loginname}
                  </span> 
                  <span>
                    {item.create_at.split('T')[0]}
                  </span> 
                  <span>评论: {item.reply_count}</span> 
                  <span>浏览: {item.visit_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppWrapper>
  )
}

export default Home;