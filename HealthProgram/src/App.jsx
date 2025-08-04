import React, { useState } from "react";
import styles from "./app.module.scss";
import Layout from "@compo/layout/layout.jsx";
import { FaXRay, FaFolder } from "react-icons/fa";

function App() {
  const { wrap, header, pathFolder, folderBtn, xrayContainer, btn } = styles;
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFilesSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previews = selectedFiles.map((file) => {
      if (file.type.startsWith("image/")) {
        return {
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
        };
      } else {
        return Promise.resolve({
          name: file.name,
          type: file.type,
        });
      }
    });

    Promise.all(previews).then((results) => setPreviews(results));
  };

  return (
    <Layout>
      <div className={wrap}>
        {/* header */}
        <div className={header}>
          <FaXRay style={{ fontSize: "30px" }} />
          <h1>Xray Scanner</h1>
        </div>

        {/* path */}
        <div className={pathFolder}>
          {/* folder Btn */}
          <label className={folderBtn}>
            <FaFolder style={{ fontSize: "30px", fill: "#fecf05" }} />
            <p>Import Folder</p>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFilesSelect}
            />
          </label>

          {/* path  */}
          <div style={{ width: "100%" }}>
            {" "}
            {previews.length > 0 ? (
              <ul>
                {previews.map((file, index) => {
                  console.log(previews);
                  return <li key={index}>{file.name}</li>;
                })}
              </ul>
            ) : (
              <p>No files selected</p>
            )}
          </div>
        </div>

        {/* Xray */}
        {previews.length > 0 ? (
          previews.map((file, index) => (
            <div key={index} style={{ width: "100%" }}>
              {file.url && (
                <img
                  src={file.url}
                  alt={file.name}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
              {file.content && (
                <pre style={{ maxHeight: "100px", overflow: "auto" }}>
                  {file.content}
                </pre>
              )}
            </div>
          ))
        ) : (
          <div className={xrayContainer}>Xray</div>
        )}

        {/* show result button*/}
        <button className={btn}>Check</button>

        {/* result */}
        <div style={{ fontSize: "30px", marginBottom: "20px" }}>
          result: {"u got cancer"}
        </div>
      </div>
    </Layout>
  );
}

export default App;
