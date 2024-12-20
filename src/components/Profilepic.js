import React, { useRef, useState, useEffect } from "react";

export default function Profilepic({ changeprofile }) {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "cantacoder");

    fetch("https://api.cloudinary.com/v1_1/cantacoder/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Cloudinary response:", data);
        setUrl(data.url);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image.");
      });
  };

  const postPic = () => {
    if (!url) {
      alert("No image URL found. Please upload a valid image.");
      return;
    }

    fetch("/uploadprofilepic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ pic: url }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Backend response:", data);
        changeprofile();
        window.location.reload();
        alert("Profile picture updated successfully!");
      })
      .catch((error) => {
        console.error("Error saving profile picture:", error);
      });
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const removeProfilePic = () => {
    fetch("/removeprofilepic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Profile picture removed:", data);
        changeprofile();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing profile picture:", error);
      });
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  return (
    <div className="profilepic darkbg">
      <div className="changepic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "1EA1F7" }} onClick={handleClick}>
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#ED4956" }} onClick={removeProfilePic}>
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={changeprofile}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
