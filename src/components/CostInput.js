
const CostInput = ({
  ...props
}) => {

  return (
    <input
      className='w3-input w3-border w3-medium x3-margin-bottom-8'
      type='number'
      inputMode='decimal'
      placeholder='0.00'
      step=".01"
      min='0'
      {...props}
    />
  );
}

export default CostInput;
