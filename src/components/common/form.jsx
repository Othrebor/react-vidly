import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import "../../css/login.css";
import "../../css/utils.css";

class Form extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <div className="container-login100-form-btn">
        <button disabled={this.validate()} className="login100-form-btn">
          {label}
        </button>
      </div>
    );
  }

  renderInput(name, icon, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        icon={icon}
        value={data[name]}
        onChange={this.handleChange}
        type={type}
        placeholder={label}
        error={errors[name]}
      />
    );
  }
}

export default Form;