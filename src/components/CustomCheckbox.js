import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import "../style/checkboxes.css";

const CustomCheckbox = ({
    text,
    checked,
    onClickCheck,
    width = "100%",
    additionalParam,
}) => {
    const theme = useContext(ThemeContext);

    const classNames = `custom-checkbox custom-checkbox-${
        checked ? "checked" : "unchecked"
    }-${theme}`;

    return (
        <div
            onClick={() => onClickCheck(additionalParam)}
            className={classNames}
            style={{ width: width || "fit-content" }}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onClickCheck(additionalParam)}
            />
            <p>{text}</p>
        </div>
    );
};

export default CustomCheckbox;
