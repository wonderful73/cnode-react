import React from 'react';
import AppWrapper from '../layout/AppWrapper'
import { get } from '../fetch';

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
        console.log(topics)
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
        <div className="topicsList">
          {topics.map((item, index) => (
            <div className="topic" key={index}>
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </AppWrapper>
  )
}

export default Home;