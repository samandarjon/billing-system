import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
                            name,
                            placeholder,
                            value,
                            type,
                            label,
                            error,
                            info,
                            onChange,
                            disabled,
                            required
                        }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}/>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
    type: "text"
};
export default TextFieldGroup;
