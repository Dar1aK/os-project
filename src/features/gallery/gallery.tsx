import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Button from "../../components/Button";
import Wrapper from "../../components/Wrapper";
import WithClose from "../../hocs/Close";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getPhotosAsync, selectGallery, changePage } from "./gallerySlice";

import styles from "./gallery.module.css";

export const HEIGHT = 600;
export const WIDTH = 600;

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { pages, activePage } = useAppSelector(selectGallery);
  const activeCards = useMemo(() => pages?.[activePage], [activePage, pages]);

  useEffect(() => {
    dispatch(getPhotosAsync());
  }, []);

  const handleChangePage = (index: number) => {
    dispatch(changePage(index));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      {activeCards?.map(({ albumId, id, title, url, thumbnailUrl }) => (
        <Link to={`/gallery/${id}`} key={`${id}${albumId}`}>
          <div className={styles.card}>
            <LazyLoadImage
              height={HEIGHT}
              placeholderSrc={thumbnailUrl}
              src={url}
              width={WIDTH}
            />
            <div className={styles.card__text}>
              <h2>{title}</h2>
            </div>
          </div>
        </Link>
      ))}

      <div className={styles.pages}>
        {pages.map((_, i) => {
          if (i <= activePage + 5 && i > activePage - 5)
            return (
              <Button
                key={i}
                className={activePage === i ? styles.activePage : ""}
                type="button"
                onClick={() => handleChangePage(i)}
                value={i + 1}
              />
            );
        })}
      </div>
    </Wrapper>
  );
};

export default WithClose(Gallery);
