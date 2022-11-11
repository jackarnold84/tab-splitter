
const SubmitPrevButton = ({
  label, prevLabel, handlePrev
}) => {
  return (
    <div className='w3-margin-top w3-margin-bottom w3-center'>
      <input
        className='w3-button w3-grey w3-margin-right'
        type='button'
        value={prevLabel}
        onClick={handlePrev}
      />
      <input
        className='w3-button w3-green'
        type='submit'
        value={label}
      />
    </div>
  );
}

export default SubmitPrevButton;
