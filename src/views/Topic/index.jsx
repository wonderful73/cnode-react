import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import AppWrapper from '../../layout/AppWrapper'
import { get } from '../../fetch';
import styles from './index.module.css';

const Topic = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const isCancle = React.useRef();

  React.useEffect(() => {
    isCancle.current = false;
    (async () => {
      const params = {
        url: `/topic/${id}`,
        params: { mdrender: false }
      }
  
      const { success, data, err_msg } = await get(params);

      if (isCancle.current) {
        return;
      }

      if (success) {
        const { ...rest } = data;
        setTopic({...rest});
      }
    })()

    return () => isCancle.current = true;
    
  }, [id]);

  return (
    <AppWrapper title={topic.title}>
      <div className={styles.topic}>
        <h1 className={styles.title}>
          {topic.title}
        </h1>
        <div className={styles.container}>
          <ReactMarkdown source={topic.content}></ReactMarkdown>
        </div>
      </div>
      
    </AppWrapper>
  )
}

export default Topic;