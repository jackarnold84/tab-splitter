import { useState } from 'react';

const Form = ({
    elements
}) => {
  const [fields, setFields] = useState({});
  const handleChange = (e) => {
    let newFields = { ...fields };
    let name = e.target.name;
    newFields[name] = e.target.value;
    setFields(newFields);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fields);
    setFields({});
  }

  return (
    <form onSubmit={handleSubmit}>
      { elements }
      <input className='w3-button w3-blue' type="submit" />
    </form>
  )
}

export default Form;
