import { useState } from "react";
import { tabSplitResults } from "../compute";
import { clipboardDetails, clipboardResults } from "../clipboard";
import { costDisplay, percentDispay } from "../utils";
import NavButtons from "./NavButtons";

const ResultsPage = ({
  personList, itemList, addedCharges, setPageState
}) => {
  const [copyMessage, setCopyMessage] = useState('');

  const tab = tabSplitResults(personList, itemList, addedCharges);

  const handlePrev = (e) => {
    e.preventDefault();
    setPageState('AddItems');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageState('AddPeople');
  };

  const handleCopyResults = () => {
    clipboardResults(tab);
    setCopyMessage('Tab results copied to clipboard');
  };

  const handleCopyDetails = () => {
    clipboardDetails(tab);
    setCopyMessage('Tab details copied to clipboard');
  };

  const chargesByPersonDisplay = Object.entries(tab.charges).map(([p, x]) => (
    <div className="w3-container" key={'charges-' + p}>
      <h4 className="x3-semi">{p}</h4>
      <table className="w3-table x3-charge-table">
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td>{costDisplay(x.subtotal)}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>{costDisplay(x.tax)}</td>
          </tr>
          <tr>
            <td>Tip:</td>
            <td>{costDisplay(x.tip)}</td>
          </tr>
          <tr>
            <td className="x3-semi">Total:</td>
            <td className="x3-semi">{costDisplay(x.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  const overallChargesDisplay = (
    <div className="w3-container w3-border-top w3-border-bottom">
      <h4 className="x3-semi w3-center">Overall</h4>
      <table className="w3-table x3-overall-charge-table">
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td>{costDisplay(tab.subtotal)}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>{costDisplay(tab.tax)}</td>
            <td>({percentDispay(tab.taxProportion)})</td>
          </tr>
          <tr>
            <td>Tip:</td>
            <td>{costDisplay(tab.tip)}</td>
            <td>({percentDispay(tab.tipProportion)})</td>
          </tr>
          <tr>
            <td className="x3-semi">Total:</td>
            <td className="x3-semi">{costDisplay(tab.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="x3-fit-width-narrow">
      <h3 className="w3-center x3-semi">Tab Results</h3>

      <div className='w3-margin-top x3-margin-bottom-24'>
        <div className="w3-margin-bottom">
          {chargesByPersonDisplay}
        </div>
        <div>
          {overallChargesDisplay}
        </div>
      </div>

      <div className="w3-center x3-margin-bottom-24">
        <input
          className='w3-button w3-blue w3-margin-right'
          type='button'
          value='Copy Results'
          onClick={handleCopyResults}
        />
        <input
          className='w3-button w3-blue'
          type='button'
          value='Copy Details'
          onClick={handleCopyDetails}
        />
        <p className="w3-center w3-text-blue">{copyMessage}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <NavButtons nextlabel='Done' prevLabel='< Prev' handlePrev={handlePrev} />
      </form>
    </div>
  );
}

export default ResultsPage;
