import { useState } from "react";
import { dropItem, anyArrayIsEmpty, parseCost, percentDispay } from '../utils';
import { runningSubtotal } from "../compute";

import AddRemoveButtons from "./AddRemoveButtons";
import SubmitPrevButton from "./SubmitPrevButton";

const ItemForm = ({
  itemList, setItemList, personList, addedCharges, setAddedCharges, setPageState
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');

  const handleChange = (e, index) => {
    let newItemList = [...itemList];
    let name = e.target.name;
    newItemList[index][name] = e.target.value;
    setItemList(newItemList);
  };

  const handleCheckboxChange = (e, index) => {
    let newItemList = [...itemList];
    let name = e.target.name;
    if (newItemList[index].owner.includes(name)) {
      newItemList[index].owner = dropItem(newItemList[index].owner, name);
    } else {
      newItemList[index].owner.push(name);
    }
    setItemList(newItemList);
  };

  const handleChargesChange = (e) => {
    let newAddedCharges = { ...addedCharges };
    let name = e.target.name;
    newAddedCharges[name] = e.target.value;
    setAddedCharges(newAddedCharges);

    if (e.target.name === 'tip') {
      const subtotal = runningSubtotal(itemList);
      const tip = parseCost(e.target.value);
      if (subtotal > 0 && tip > 0) {
        const tipPercentDisplay = `→ ${percentDispay(tip / subtotal)}`;
        setTipPercentage(tipPercentDisplay);
      } else {
        setTipPercentage('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemList.length === 0) {
      setErrorMessage('Must add at least one item');
    }
    else if (anyArrayIsEmpty(itemList.map((x) => x.owner))) {
      setErrorMessage('Each item must be assigned to at least one person');
    } else {
      setPageState('ViewResults');
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    let newItemList = [...itemList];
    newItemList.forEach((x) => x.owner = []);
    setItemList(newItemList);
    setPageState('AddPeople');
  }

  const handleAddButton = (e) => {
    e.preventDefault();
    let newItemList = [...itemList, { 'name': '', 'cost': '', 'owner': [] }];
    setItemList(newItemList);
  };

  const handleRemoveButton = (e) => {
    e.preventDefault();
    let newItemList = [...itemList].slice(0, -1);
    setItemList(newItemList);
  };

  const itemListInputs = itemList.map((value, index) => (
    <div className="w3-margin-top x3-margin-bottom-24" key={'item' + index}>

      <label className="w3-small">
        Description:
        <input
          className='w3-input w3-border x3-margin-bottom-4'
          type='text'
          name='name'
          value={value.name}
          onChange={(e) => handleChange(e, index)}
          placeholder={'Item ' + (index + 1)}
          maxLength='40'
        />
      </label>

      <label className="w3-small">
        Cost ($):
        <input
          className='w3-input w3-border x3-margin-bottom-4'
          type='number'
          name='cost'
          value={value.cost}
          onChange={(e) => handleChange(e, index)}
          placeholder='0.00'
          step=".01"
          min='0'
        />
      </label>

      <label className="w3-small">Assign:</label>
      <div className="w3-margin-bottom x3-inner-4">
        {personList.map((person) => (
          <span className=".w3-show-inline-block" key={'item' + index + person}>
            <input
              id={'item' + index + person}
              className="w3-check"
              type='checkbox'
              name={person}
              checked={itemList[index].owner.includes(person)}
              onChange={(e) => handleCheckboxChange(e, index)}
            />
            <label className="x3-check-label" htmlFor={'item' + index + person}>{person}</label>
          </span>
        ))}
      </div>

    </div>
  ));

  const addedChargeInputs = (
    <label className="w3-small">
      Tax ($):
      <input
        className='w3-input w3-border x3-margin-bottom-4'
        type='text'
        name='tax'
        value={addedCharges.tax}
        onChange={handleChargesChange}
        step=".01"
        placeholder='0.00'
      />
      Tip ($):
      <input
        className='w3-input w3-border x3-margin-bottom-4'
        type='number'
        name='tip'
        value={addedCharges.tip}
        onChange={handleChargesChange}
        step=".01"
        placeholder='0.00'
      />
      <div className="x3-tip-pct">{tipPercentage}</div>
    </label>
  )

  return (
    <div>

      <h3>Add Items</h3>
      <p className='w3-small'>Add and assign people to items in the tab</p>

      <div className='w3-margin-top w3-margin-bottom'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          {itemListInputs}
          <AddRemoveButtons
            addLabel='Add Item (+)' removeLabel='Remove Item (-)'
            handleAdd={handleAddButton} handleRemove={handleRemoveButton}
          />

          <h3 className="x3-margin-top-32">Additional Charges</h3>
          <div>
            {addedChargeInputs}
          </div>

          <p className="w3-center w3-small w3-text-red">{errorMessage}</p>
          <SubmitPrevButton label='Next >' prevLabel='< Prev' handlePrev={handlePrev} />
        </form>
      </div>

    </div>
  );
}

export default ItemForm;
