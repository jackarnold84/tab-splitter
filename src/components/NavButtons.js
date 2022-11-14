
const NavButtons = ({
  nextlabel, prevLabel, handlePrev
}) => {
  return (
    <div className='w3-margin-top w3-margin-bottom w3-center'>
      {prevLabel &&
        <input
          className='w3-button w3-grey w3-margin-right'
          type='button'
          value={prevLabel}
          onClick={handlePrev}
        />
      }
      {nextlabel &&
        <input
          className='w3-button w3-green'
          type='submit'
          value={nextlabel}
        />
      }
    </div>
  );
}

export default NavButtons;
