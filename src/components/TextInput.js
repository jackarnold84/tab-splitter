
const TextInput = ({
 name, handleChange, fields, label 
}) => {
  return (
    <div className='w3-margin-bottom'>
      <label className='w3-label w3-green'>
        {label}
        <input
          className='w3-input w3-border'
          name={name}
          type='text'
          value={fields[name] || ""}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default TextInput;
