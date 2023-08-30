import React from "react";
import axios from "axios";
import { useState } from "react";
const ImageFetch = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  const [fullUrl, setFullUrl] = useState("");

  function thumbnailHandler() {
    axios
      .get(
        `https://api.unsplash.com/photos?client_id=fOoMT54u7twWaJhOBu8IDNUD0iOb5A9j2IQ9PLsBvS8`
      )
      .then((res) => {
        let data = res.data;
        let DATA = data.map((item) => item.urls.thumb);
        // console.log(DATA);
        setThumbnailUrl(DATA);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fullImageHandler(index) {
    axios
      .get(
        `https://api.unsplash.com/photos?client_id=fOoMT54u7twWaJhOBu8IDNUD0iOb5A9j2IQ9PLsBvS8`
      )
      .then((res) => {
        let data = res.data[index].urls.full;
        // console.log(data);
        setFullUrl(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>MY GALLARY</div>
      <button onClick={thumbnailHandler}>click</button>
      <div>
        {thumbnailUrl.map((url, index) => (
          <div>
            <img
              key={index}
              src={url}
              style={{ width: "300px", height: "300px", margin: "10px" }}
              alt={`Image ${index}`}
            />
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                fullImageHandler(index);
              }}
            >
              FULL IMAGE
            </button>
          </div>
        ))}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-fullscreen">
          <div className="modal-content">
            <div className="modal-body">
              <img src={fullUrl} alt="full image" className="full" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFetch;
