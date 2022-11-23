import { useState } from "react";
import { hasDuplicates, trimEntries } from '../utils';

import AddRemoveButtons from "./AddRemoveButtons";
import NavButtons from "./NavButtons";

const PersonForm = ({
  personList, setPersonList, setPageState
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e, index) => {
    let newPersonList = [...personList];
    newPersonList[index] = e.target.value;
    setPersonList(newPersonList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedList = trimEntries(personList);
    if (personList.length === 0) {
      setErrorMessage('Must add at least one person');
    } else if (hasDuplicates(cleanedList)) {
      setErrorMessage('All names must be unique');
    } else if (trimEntries(cleanedList).includes('')) {
      setErrorMessage('You entered a blank name');
    } else {
      setErrorMessage('');
      setPageState('AddItems');
    }

    setPersonList(cleanedList);
  };

  const handleAddButton = (e) => {
    e.preventDefault();
    let newPersonList = [...personList, ''];
    setPersonList(newPersonList);
  };

  const handleRemoveButton = (e) => {
    e.preventDefault();
    let newPersonList = [...personList].slice(0, -1);
    setPersonList(newPersonList);
  };

  const personListInputs = personList.map((value, index) => (
    <input
      className='w3-input w3-border w3-margin-bottom'
      type='text'
      key={'person' + index}
      name={'person' + index}
      value={value}
      onChange={(e) => handleChange(e, index)}
      maxLength='12'
      required
    />
  ));

  return (
    <div>
      <h3 className="w3-center x3-semi">Add People</h3>
      <div className="w3-center">
        Enter a name for each person who will be paying
      </div>

      <div className='w3-margin-top w3-margin-bottom'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          {personListInputs}
          <AddRemoveButtons
            addLabel='Add Person (+)' removeLabel='Delete Person (-)'
            handleAdd={handleAddButton} handleRemove={handleRemoveButton}
          />
          <p className="w3-center w3-text-red">{errorMessage}</p>
          <NavButtons nextlabel='Next >' />
        </form>
      </div>

    </div>
  );
}

export default PersonForm;
