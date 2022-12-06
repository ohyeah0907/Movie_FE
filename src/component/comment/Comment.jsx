import clsx from 'clsx';
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

// Component Comment nhận array comment và movie's id làm props
export const Comment = ({ movieId, commentList }) => {
  let controller = new AbortController();
  const context = useContext(userContext);
  const [listUserComment, setListUserComment] = useState();
  const [userInput, setuserInput] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    getComments(movieId, controller.signal)
      .then((data) => {
        setListUserComment(data);
      })
      .catch((error) => navigate('/'));

    return () => controller.abort();
  }, [userInput]);

  const handleAddComment = async (value) => {
    if (value !== '') {
      const result = {
        user_id: token,
        movie_id: movieId,
        content: value,
        date: Date.now(),
      };
      console.log(result);
      await addComment(result, controller.signal);
      setuserInput(result);
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
              if (e.key === 'Enter') handleAddComment(e.target.value);
            }}
          />
        ) : (
          <p className={clsx(styles.comment__input__notify)}>
            Please <Link to={'/sign-in'}>sign in</Link> to use comment
          </p>
        )}
      </div>
      <div className={clsx(styles.comment_list)}>
        {listUserComment &&
          listUserComment.map(({ user_id, content, date }, index) => (
            <UserComment key={index} user={{ user_id, content, date }} />
          ))}
      </div>
    </div>
  );
};
