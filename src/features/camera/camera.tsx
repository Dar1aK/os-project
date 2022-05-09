import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../../components/Wrapper";
import WithClose from "../../hocs/Close";

import styles from "./camera.module.css";

const Camera = () => {
  const videoStream = useRef<HTMLVideoElement>(null);
  const [inRecord, setInRecord] = useState(false);
  const [href, setHref] = useState("");
  const [download, setDownload] = useState("");
  let mediaRecorder: any;

  const onStart = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(videoStream.current);
        if (videoStream.current) {
          videoStream.current.srcObject = stream;
        }
        return stream;
      })
      .then((stream) => {
        const options = { mimeType: "video/webm" };
        const recordedChunks: any[] = [];
        mediaRecorder = new MediaRecorder(stream, options);
        setInRecord(true);

        mediaRecorder.addEventListener("dataavailable", function (e: any) {
          console.log("dataavailable", e.data.size);
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        });

        mediaRecorder.addEventListener("stop", function () {
          setInRecord(false);
          console.log("stop mr");
          setHref(URL.createObjectURL(new Blob(recordedChunks)));
          setDownload("media.webm");
        });

        mediaRecorder.start();
        console.log("mediaRecorder", mediaRecorder);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }); //, audio: true
  }, []);

  return (
    <Wrapper>
      <video autoPlay className={styles.video} ref={videoStream} />
      <button
        id="stop"
        onClick={() => {
          mediaRecorder?.stop();
        }}
      >
        Stop
      </button>
      <button id="start" onClick={onStart}>
        Start
      </button>

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
