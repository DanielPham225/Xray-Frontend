import React, { useState } from "react";
import styles from "./app.module.scss";
import Layout from "@compo/Layout/layout.jsx";
import { FaXRay, FaFolder } from "react-icons/fa";
import { uploadXray } from "./api"; // API helper

function App() {
  const { wrap, header, pathFolder, folderBtn, xrayContainer, btn } = styles;

  const [file, setFile] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      setPreviews([
        { name: f.name, type: f.type, url: URL.createObjectURL(f) }
      ]);
    } else {
      setPreviews([]);
    }
  };

  const handleCheck = async () => {
    if (!file) {
      setError("Please choose an image.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await uploadXray(file); // { Cluster, MinDistance, IsAnomaly }
      setResult(data);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
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
            <p>Import Image</p>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </label>

          {/* file list */}
          <div style={{ width: "100%" }}>
            {previews.length > 0 ? (
              <ul>
                {previews.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            ) : (
              <p>No files selected</p>
            )}
          </div>
        </div>

        {/* Xray preview */}
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
            </div>
          ))
        ) : (
          <div className={xrayContainer}>Xray</div>
        )}

        {/* Check button */}
        <button
          className={btn}
          disabled={loading || !file}
          onClick={handleCheck}
        >
          {loading ? "Analyzing…" : "Check"}
        </button>

        {/* Error */}
        {error && (
          <div style={{ color: "crimson", fontSize: 16, marginTop: 12 }}>
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ fontSize: 18, marginTop: 12 }}>
            <div>Cluster: <b>{result.Cluster}</b></div>
            <div>MinDistance: <b>{Number(result.MinDistance).toFixed(4)}</b></div>
            <div>IsAnomaly: <b>{String(result.IsAnomaly)}</b></div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
