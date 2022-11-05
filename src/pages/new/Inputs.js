import { categoryType } from "../../formSource";
import { roles } from "../../formSource";
import Select from "react-select";

const Inputs = ({ type, setState, state }) => {
  switch (type) {
    case "products":
      return <></>;
      break;
    case "transactions":
      break;
    case "orders":
      break;
    case "drivers":
      break;
    case "stores":
      break;
    case "categories":
      return (
        <div className="formInput">
          <label>Category</label>
          <Select
            styles={customStyles}
            options={categoryType}
            placeholder={"Select Type"}
          />
        </div>
      );
      break;
    case "earnings":
      break;
    default:
      return (
        <div className="formInput">
          <label>Role</label>
          <Select
            styles={customStyles}
            options={roles}
            onChange={(e) =>
              setState({
                inputs: {
                  ...state.inputs,
                  role: e.value,
                },
              })
            }
          />
        </div>
      );
  }
};

const customStyles = {
  control: (base) => ({
    ...base,
    border: 0,
    width: "100%",
    borderBottom: "1px solid gray",
  }),
};

export default Inputs;
