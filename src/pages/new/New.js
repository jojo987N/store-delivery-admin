import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";

import TimePicker from "react-time-picker";

import { Button, Modal, Space } from "antd";

import Select from "react-select";
import { useParams } from "react-router-dom";
import { decryptData, getData } from "../../utils";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title, type }) => {
  const navigate = useNavigate();

  const paramName = Object.keys(useParams())[0];
  const itemId = useParams()[paramName];

  const [data, setData] = useState();

  const [file, setFile] = useState();

  const [value1, onChange1] = useState("");
  const [value2, onChange2] = useState("");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      file: URL.createObjectURL(file),
    });
  };

  const warning = () => {
    Modal.warning({
      title: "This is a demo version",
      content: "Modification is not allowed",
    });
  };

  useEffect(() => {
    if (itemId)
      getData(type).then((values) => {
        setData(values.find((value) => value.id === itemId));
      });
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? file : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} />
          </div>
          <div className="right">
            <FormInput
              inputs={inputs}
              type={type}
              data={data}
              itemId={itemId}
              navigate={navigate}
              setFile={setFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
