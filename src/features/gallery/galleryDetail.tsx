import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Wrapper from "../../components/Wrapper";
import WithClose from "../../hocs/Close";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getCommentsAsync, changeDetail, selectGallery } from "./gallerySlice";
import { HEIGHT, WIDTH } from "./gallery";

import styles from "./gallery.module.css";

const GalleryDetail = () => {
  const dispatch = useAppDispatch();
  const {
    current: { title, url, thumbnailUrl },
    comments,
  } = useAppSelector(selectGallery);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(changeDetail(id));
      dispatch(getCommentsAsync(id));
    }
  }, []);

  return (
    <Wrapper>
      <Link to="/gallery">Back</Link>
      <div>
        <h2>{title}</h2>
        <LazyLoadImage
          height={HEIGHT}
          placeholderSrc={thumbnailUrl}
          src={url}
          width={WIDTH}
          wrapperClassName={styles.img}
        />
      </div>
      <div>
        {comments.map(({ body, email, name, id, postId }) => (
          <div key={`${id}${postId}`} className={styles.comment}>
            <h3>{name}</h3>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default WithClose(GalleryDetail);
