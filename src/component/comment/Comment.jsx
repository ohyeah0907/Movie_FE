import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../layout/UserContext';
import {
  addComment,
  getComments,
} from '../../service/component/comment/Comment';
import { UserComment } from '../user-comment/UserComment';
import styles from './css/comment.module.css';
import { decodeToken } from 'react-jwt';

// Component Comment nhận array comment và movie's id làm props
export const Comment = ({ movieId }) => {
  let controller = new AbortController();
  const [listUserComment, setListUserComment] = useState();
  const [comment, setComment] = useState();
  const token = localStorage.getItem('access_token');
  const user = decodeToken(token);

  console.log(user);
  useEffect(() => {
    handleGetComments(movieId, controller.signal).then((res) =>
      setListUserComment(res.data.comments)
    );
    return () => controller.abort();
  }, [comment]);

  const handleGetComments = async (movieId, signal) => {
    const res = await getComments(movieId, signal);
    return res;
  };

  const handleAddComment = async (value, signal) => {
    if (value !== '') {
      const result = {
        content: value,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      const res = await addComment(result, movieId, signal);
      setComment(result);
    }
    return;
  };

  return (
    <div className={clsx(styles.comment)}>
      <div className={clsx(styles.comment__heading)}>
        <div className={clsx(styles.comment__heading__totalComment)}>
          {listUserComment?.length} bình luận
        </div>
      </div>
      <div className={clsx(styles.comment__input)}>
        {token ? (
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                handleAddComment(e.target.value, controller.signal);
            }}
          />
        ) : (
          <p className={clsx(styles.comment__input__notify)}>
            Please <Link to={'/sign-in'}>sign in</Link> to use comment
          </p>
        )}
      </div>
      <div className={clsx(styles.comment_list)}>
        {listUserComment?.map(({ username, content, time }, index) => (
          <UserComment key={index} user={{ username, content, time }} />
        ))}
      </div>
    </div>
  );
};
