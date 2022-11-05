import React from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Select from "react-select";
import { decryptData } from "../../utils";
import TimePicker from "react-time-picker";
import { addCategory, addStore, updateUser } from "../../firebase";
import { storeModel } from "../../model";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { roles, categoryType } from "../../formSource";
import Inputs from "./Inputs";

const customStyles = {
  control: (base) => ({
    ...base,
    border: 0,
    width: "100%",
    borderBottom: "1px solid gray",
  }),
};
class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      disabled: false,
      inputs: {},
      button: {
        text: "Send",
        color: "teal",
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.inputs.image);
    if (this.props.data) updateUser(this.state.inputs, this.props.itemId);
    else if (this.state.inputs.image) {
      this.setState({ disabled: true });
      addCategory(this.state.inputs).then(() =>
        this.props.navigate("/" + this.props.type)
      );
    }
  };
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: target.value,
      },
      button: {
        text: "Send",
        color: "teal",
      },
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="formInput">
          <label htmlFor="file">
            {this.props.type === "drivers" ? "Car Image" : "Image"}:{" "}
            <DriveFolderUploadOutlinedIcon className="icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={async (e) => {
              const file = e.target.files[0];
              const storage = getStorage();
              const storageRef = ref(storage, file.name);
              await uploadBytes(storageRef, file);
              const url = await getDownloadURL(storageRef);
              this.setState({
                inputs: {
                  ...this.state.inputs,
                  image: url,
                },
              });
              this.props.setFile(url);
            }}
            style={{ display: "none" }}
            required
          />
        </div>
        {this.props.inputs.map((input) => {
          return (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                name={input.alias}
                required="required"
                onChange={this.handleInputChange}
                defaultValue={
                  this.props.data
                    ? this.props.data[input.alias]
                    : input.placeholder
                }
              />
            </div>
          );
        })}

        {this.props.type === "categories" && (
          <div className="formInput">
            <label>Category</label>
            <Select
              styles={customStyles}
              options={categoryType}
              placeholder={"Select Type"}
              onChange={(e) =>
                this.setState({
                  inputs: {
                    ...this.state.inputs,
                    type: e.value,
                  },
                })
              }
            />
          </div>
        )}

        {this.props.type === "user" && (
          <div className="formInput">
            <label>Role</label>
            <Select
              styles={customStyles}
              options={roles}
              onChange={(e) =>
                this.setState({
                  inputs: {
                    ...this.state.inputs,
                    role: e.value,
                  },
                })
              }
            />
          </div>
        )}
        {this.props.type === "store" && (
          <>
            <div className="formInput">
              <label>Reward</label>
              <input type="text" />
            </div>
            <div className="formInput">
              <label>Collect Time</label>
              <input type="text" />
            </div>
            <div className="tmpContainer">
              <label>Opening Time</label>
              <TimePicker className="tmp" />
            </div>
            <div className="tmpContainer">
              <label>Closing Time</label>
              <TimePicker className="tmp" />
            </div>
          </>
        )}
        <button
          disabled={this.state.disabled}
          className="button"
          style={{ backgroundColor: this.state.button.color }}
        >
          {this.state.button.text}
        </button>
      </form>
    );
  }
}
export default FormInput;
