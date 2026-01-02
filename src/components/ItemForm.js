import { useState } from "react";
import { runningSubtotal } from "../compute";
import { anyArrayIsEmpty, dropItem, fixCost, parseCost, percentDispay } from '../utils';

import AddRemoveButtons from "./AddRemoveButtons";
import CostInput from "./CostInput";
import NavButtons from "./NavButtons";

const ItemForm = ({
  itemList, setItemList, personList, addedCharges, setAddedCharges, setPageState
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');
  const [surchargesPercentage, setSurchargesPercentage] = useState('');

  const handleChange = (e, index, fix = false) => {
    let newItemList = [...itemList];
    let name = e.target.name;
    name = name === 'description' ? 'name' : name;
    if (fix) {
      newItemList[index][name] = fixCost(e.target.value);
    } else {
      newItemList[index][name] = e.target.value;
    }
    setItemList(newItemList);
  };

  const handleShowQuantity = (index) => {
    let newItemList = [...itemList];
    newItemList[index].showQuantity = true;
    if (!newItemList[index].quantity) {
      newItemList[index].quantity = '1';
    }
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

  const handleChargesChange = (e, fix = false) => {
    let newAddedCharges = { ...addedCharges };
    let name = e.target.name;
    if (fix) {
      newAddedCharges[name] = fixCost(e.target.value);
    } else {
      newAddedCharges[name] = e.target.value;
    }
    setAddedCharges(newAddedCharges);

    const subtotal = runningSubtotal(itemList);

    if (e.target.name === 'tax') {
      const tax = parseCost(e.target.value);
      if (subtotal > 0 && tax > 0) {
        const taxPercentDisplay = `→ ${percentDispay(tax / subtotal)}`;
        setTaxPercentage(taxPercentDisplay);
      } else {
        setTaxPercentage('');
      }
    } else if (e.target.name === 'tip') {
      const tip = parseCost(e.target.value);
      if (subtotal > 0 && tip > 0) {
        const tipPercentDisplay = `→ ${percentDispay(tip / subtotal)}`;
        setTipPercentage(tipPercentDisplay);
      } else {
        setTipPercentage('');
      }
    } else if (e.target.name === 'surcharges') {
      const surcharges = parseCost(e.target.value);
      if (subtotal > 0 && surcharges > 0) {
        const surchargesPercentDisplay = `→ ${percentDispay(surcharges / subtotal)}`;
        setSurchargesPercentage(surchargesPercentDisplay);
      } else {
        setSurchargesPercentage('');
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
    } else if (runningSubtotal(itemList) <= 0) {
      setErrorMessage('Total charges must be greater than zero');
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
    let newItemList = [...itemList, { 'name': '', 'cost': '', 'quantity': '1', 'showQuantity': false, 'owner': [] }];
    setItemList(newItemList);
  };

  const handleRemoveButton = (e) => {
    e.preventDefault();
    let newItemList = [...itemList].slice(0, -1);
    setItemList(newItemList);
  };

  const itemListInputs = itemList.map((value, index) => (
    <div className="w3-margin-top x3-margin-bottom-32" key={'item' + index}>

      <label className="x3-label">
        Description:
        <input
          className='w3-input w3-border w3-medium x3-margin-bottom-8'
          type='text'
          name='description'
          value={value.name}
          onChange={(e) => handleChange(e, index)}
          placeholder={'Item ' + (index + 1)}
          maxLength='40'
        />
      </label>

      <label className="x3-label">
        Cost ($):
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <CostInput
              name='cost'
              value={value.cost}
              onChange={(e) => handleChange(e, index)}
              onBlur={(e) => handleChange(e, index, true)}
            />
          </div>
          {!value.showQuantity && (
            <button
              type="button"
              onClick={() => handleShowQuantity(index)}
              className="w3-button w3-circle w3-blue"
              style={{ width: '36px', height: '36px', padding: '0', fontSize: '18px', lineHeight: '1', flexShrink: 0, marginBottom: '8px' }}
              title="Add quantity"
            >
              +
            </button>
          )}
        </div>
      </label>

      {value.showQuantity && (
        <label className="x3-label">
          Quantity:
          <input
            className='w3-input w3-border w3-medium x3-margin-bottom-8'
            type='number'
            inputMode='numeric'
            name='quantity'
            value={value.quantity}
            onChange={(e) => handleChange(e, index)}
            min='1'
            step='1'
          />
        </label>
      )}

      <label className="x3-label">Assign:</label>
      <div className="w3-margin-bottom x3-inner-4">
        {personList.map((person) => (
          <span className="w3-show-inline-block" key={'item' + index + person}>
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
    <div>
      <label className="x3-label">
        Tax ($):
        <CostInput
          name='tax'
          value={addedCharges.tax}
          onChange={(e) => handleChargesChange(e)}
          onBlur={(e) => handleChargesChange(e, true)}
        />
        <div className="x3-tip-pct">{taxPercentage}</div>
      </label>
      <label className="x3-label">
        Surcharge ($):
        <CostInput
          name='surcharges'
          value={addedCharges.surcharges}
          onChange={(e) => handleChargesChange(e)}
          onBlur={(e) => handleChargesChange(e, true)}
        />
        <div className="x3-tip-pct">{surchargesPercentage}</div>
      </label>
      <label className="x3-label">
        Tip ($):
        <CostInput
          name='tip'
          value={addedCharges.tip}
          onChange={(e) => handleChargesChange(e)}
          onBlur={(e) => handleChargesChange(e, true)}
        />
        <div className="x3-tip-pct">{tipPercentage}</div>
      </label>
    </div>
  )

  return (
    <div>

      <h3 className="w3-center x3-semi">Add Items</h3>
      <div className="w3-center">
        Add and assign people to items in the tab
      </div>

      <div className='w3-margin-top w3-margin-bottom'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          {itemListInputs}
          <AddRemoveButtons
            addLabel='Add Item (+)' removeLabel='Remove Item (-)'
            handleAdd={handleAddButton} handleRemove={handleRemoveButton}
          />

          <h3 className="w3-center x3-semi x3-margin-top-32">Additional Charges</h3>
          <div>
            {addedChargeInputs}
          </div>

          <p className="w3-center w3-text-red">{errorMessage}</p>
          <NavButtons nextlabel='Next >' prevLabel='< Prev' handlePrev={handlePrev} />
        </form>
      </div>

    </div>
  );
}

export default ItemForm;
