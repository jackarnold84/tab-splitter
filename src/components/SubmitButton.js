
const SubmitButton = ({
  label
}) => {
  return (
    <div className='w3-margin-top w3-margin-bottom w3-center'>
      <input
        className='w3-button w3-green'
        type='submit'
        value={label}
      />
    </div>
  );
}

export default SubmitButton;
