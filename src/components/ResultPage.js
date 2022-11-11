import { tabSplitResults } from "../compute";
import { costDisplay, percentDispay } from "../utils";

const ResultsPage = ({
  personList, itemList, addedCharges
}) => {
  
  const tab = tabSplitResults(personList, itemList, addedCharges);

  const chargesByPersonDisplay = Object.entries(tab.charges).map(([p, x]) => (
    <div className="w3-container" key={'charges-' + p}>
      <h4>{p}</h4>
      <div>Subtotal: {costDisplay(x.subtotal)}</div>
      <div>Tax: {costDisplay(x.tax)}</div>
      <div>Tip: {costDisplay(x.tip)}</div>
      <div>Total: {costDisplay(x.total)}</div>
    </div>
  ));

  const overallChargesDisplay = (
    <div className="w3-container">
      <h4>Overall</h4>
      <div>Subtotal: {costDisplay(tab.subtotal)}</div>
      <div>Tax: {costDisplay(tab.tax)} ({percentDispay(tab.taxProportion)})</div>
      <div>Tip: {costDisplay(tab.tip)} ({percentDispay(tab.tipProportion)})</div>
      <div>Total: {costDisplay(tab.total)}</div>
    </div>
  );

  return (
    <div>
      <h3>Tab</h3>
      <p className='w3-small'>The tab split results are shown below</p>

      <div className='w3-margin-top w3-margin-bottom'>
        {chargesByPersonDisplay}
        <br />
        {overallChargesDisplay}
      </div>
    </div>
  );
}

export default ResultsPage;
