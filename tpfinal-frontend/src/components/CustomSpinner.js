import React from "react";
import {Spinner} from "@nextui-org/react";

const CustomSpinner = ({mensaje}) => {
  return (
    <div>
    <Spinner label={`${mensaje}...`} color="violeta-800" />
    </div>

  );
}

export default CustomSpinner