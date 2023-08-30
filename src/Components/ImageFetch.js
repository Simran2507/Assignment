import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const ImageFetch = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  const [fullUrl, setFullUrl] = useState("");
  const cliID= process.env.REACT_APP_CLIENT_ID;
  useEffect(()=>{
    axios.get(
        `https://api.unsplash.com/photos?client_id=${cliID}`
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
  },[])

  
  function fullImageHandler(index) {
    axios
      .get(
        `https://api.unsplash.com/photos?client_id=${cliID}`
      )
      .then((res) => {
        let data = res.data[index].urls.full;
        // console.log(data);
        setFullUrl(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container" >
      <div className="heading">
        <h1>
            Image Gallery
        </h1>
      </div>
      <div className="row">
        {thumbnailUrl.map((url, index) => (
          <div className="col-md-3 card">
            <img
              key={index}
              src={url}
              style={{ width: "250px", height: "250px", padding: "10px" }}
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
              VIEW IMAGE
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
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body" style={{ maxWidth: "100%", maxHeight: "100vh" }}>
              <img src={fullUrl} alt="full image" className="full"/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
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