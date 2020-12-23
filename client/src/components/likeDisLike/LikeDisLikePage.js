import React, { useState, useEffect } from 'react';
import LikeDisLike from './LikeDisLike';
import {
  getDisLikesApi,
  getLikesApi,
  setDisLikeApi,
  setLikeApi,
  unDisLikeApi,
  unLikeApi,
} from '../../api/likeDisLikeApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LikeDisLikePage({ comment }) {
  const { postId, commentId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [disLikeAction, setDisLikeAction] = useState(false);

  const onLikeAction = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!likeAction) {
      setLikeApi(comment ? { commentId } : { postId })
        .then((res) => {
          setLike(like + 1);
          setLikeAction(!likeAction);
          if (disLikeAction) {
            setDisLike(disLike - 1);
            setDisLikeAction(!disLikeAction);
          }
        })
        .catch((err) => alert(err));
    } else {
      unLikeApi(comment ? { commentId } : { postId })
        .then((res) => {
          setLike(like - 1);
          setLikeAction(!likeAction);
        })
        .catch((err) => alert(err));
    }
  };

  const onDisLikeAction = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!disLikeAction) {
      setDisLikeApi(comment ? { commentId } : { postId })
        .then((res) => {
          setDisLike(disLike + 1);
          setDisLikeAction(!disLikeAction);
          if (likeAction) {
            setLike(like - 1);
            setLikeAction(!likeAction);
          }
        })
        .catch((err) => alert(err));
    } else {
      unDisLikeApi(comment ? { commentId } : { postId })
        .then((res) => {
          setDisLike(disLike - 1);
          setDisLikeAction(!disLikeAction);
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    getLikesApi(comment ? { commentId } : { postId })
      .then((res) => {
        setLike((prev) => res.data.likes.length);
        if (user) {
          setLikeAction((prev) => res.data.likes.some((v) => v.author._id === user._id));
        }
      })
      .catch((err) => alert(err));

    getDisLikesApi(comment ? { commentId } : { postId })
      .then((res) => {
        setDisLike((prev) => res.data.disLikes.length);
        if (user) {
          setDisLikeAction((prev) => res.data.disLikes.some((v) => v.author._id === user._id));
        }
      })
      .catch((err) => alert(err));
  }, [comment, postId, commentId, user]);

  return (
    <LikeDisLike
      like={like}
      disLike={disLike}
      likeAction={likeAction}
      disLikeAction={disLikeAction}
      onLikeAction={onLikeAction}
      onDisLikeAction={onDisLikeAction}
    />
  );
}

export default LikeDisLikePage;
