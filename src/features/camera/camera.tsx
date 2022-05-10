import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Wrapper from "../../components/Wrapper";
import WithClose from "../../hocs/Close";

import styles from "./camera.module.css";

const Camera = () => {
  const videoStream = useRef<HTMLVideoElement>(null);
  const [inRecord, setInRecord] = useState(false);
  const [href, setHref] = useState("");
  const [download, setDownload] = useState("");
  const [mediaRecorder, setMedia] = useState<MediaRecorder | null>(null);

  const onStart = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoStream.current) {
          videoStream.current.srcObject = stream;
        }
        return stream;
      })
      .then((stream) => {
        const options = { mimeType: "video/webm" };
        const media = new MediaRecorder(stream, options);
        setMedia(media);
        return media;
      })
      .then((media) => {
        const recordedChunks: Blob[] = [];

        setInRecord(true);

        media.addEventListener("dataavailable", function (e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        });

        media.addEventListener("stop", function () {
          setInRecord(false);
          setHref(URL.createObjectURL(new Blob(recordedChunks)));
          setDownload("media.webm");
        });

        media.start();
      })
      .catch(console.log);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }, []);

  return (
    <Wrapper>
      <video autoPlay className={styles.video} ref={videoStream} />
      <Button
        type="button"
        id="stop"
        onClick={() => mediaRecorder?.stop()}
        value="Stop"
        disabled={!inRecord}
      />
      <Button type="button" id="start" onClick={onStart} value="Start" />

      <div>You can make a video and save it to your computer.</div>
      {inRecord && <p>ON AIR!</p>}

      {href && (
        <div>
          <h3>Preview</h3>
          <div>
            <a href={href} download={download}>
              Download
            </a>
          </div>
          <video autoPlay className="attendee" src={href} controls />
        </div>
      )}
    </Wrapper>
  );
};

export default WithClose(Camera);
