import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addComment,
  deleteComment,
  getComments,
} from '../../service/component/comment/CommentService';
import { UserComment } from '../user-comment/UserComment';
import styles from './css/comment.module.css';
import { decodeToken } from 'react-jwt';

// Component Comment nhận array comment và movie's id làm props
export const Comment = ({ movieId }) => {
  let controller = new AbortController();
  const [listUserComment, setListUserComment] = useState();
  const [comment, setComment] = useState();
  const token = localStorage.getItem('access_token');
  const currentUser = decodeToken(token);

  console.log(currentUser);
  useEffect(() => {
    handleGetComments(movieId, controller.signal).then((res) =>
      setListUserComment(res.data.comments)
    );
    return () => controller.abort();
  }, [comment]);

  const handleGetComments = async (movieId, signal) => {
    const res = await getComments(movieId, signal);
    console.log(res.data);
    return res;
  };

  const handleAddComment = async (value, signal) => {
    if (value !== '') {
      const result = {
        content: value,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      await addComment(result, movieId, signal);
      setListUserComment((prev) => [
        { user: currentUser.sub, ...result },
        ...prev,
      ]);
    }
    return;
  };
  const handelDeleteComment = async (posComment, commentId, signal) => {
    await deleteComment(commentId, signal);
    setListUserComment((prev) => {
      const newCommentList = [...prev];
      newCommentList.splice(posComment, 1);
      return newCommentList;
    });
  };

  return (
    <div className={clsx(styles.comment)}>
      <div className={clsx(styles.comment__heading)}>
        <div className={clsx(styles.comment__heading__totalComment)}>
          {listUserComment?.length} comments.
        </div>
      </div>
      <div className={clsx(styles.comment__input)}>
        {currentUser ? (
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComment(e.target.value, controller.signal);
                e.currentTarget.value = '';
              }
            }}
          />
        ) : (
          <p className={clsx(styles.comment__input__notify)}>
            Please <Link to={'/sign-in'}>sign in</Link> to use comment
          </p>
        )}
      </div>
      <div className={clsx(styles.comment_list)}>
        {listUserComment?.map(({ user, content, time, id }, index) => (
          <UserComment
            key={index}
            info={{
              user,
              content,
              time,
              id,
              deleteComment: handelDeleteComment,
            }}
            pos={index}
            currentUser={currentUser?.sub}
          />
        ))}
      </div>
    </div>
  );
};
