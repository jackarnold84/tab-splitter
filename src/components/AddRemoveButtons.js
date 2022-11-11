
const AddRemoveButtons = ({
  addLabel, removeLabel, handleAdd, handleRemove
}) => {
  return (
    <div className='w3-margin-bottom w3-center'>
      <button
        className='w3-button w3-small w3-blue w3-margin-bottom w3-margin-right'
        onClick={handleAdd}
      >{addLabel}</button>
      <button
        className='w3-button w3-small w3-red w3-margin-bottom'
        onClick={handleRemove}
      >{removeLabel}</button>
    </div>
  );
}

export default AddRemoveButtons;
