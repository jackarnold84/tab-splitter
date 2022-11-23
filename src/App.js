import { useState } from "react";

import PersonForm from "./components/PersonForm";
import ItemForm from "./components/ItemForm";
import ResultsPage from "./components/ResultPage";

const App = () => {

  const [pageState, setPageState] = useState('AddPeople');
  const [personList, setPersonList] = useState(['']);
  const [itemList, setItemList] = useState(
    [{ 'name': '', 'cost': '', 'owner': [] }]
  );
  const [addedCharges, setAddedCharges] = useState(
    { 'tax': '', 'tip': '' }
  );

  return (
    <div>
      <h1 className='w3-green w3-center'>Tab Splitter</h1>
      <div className='w3-container'>
        <div className='x3-fit-width'>
          {pageState === 'AddPeople' &&
            <PersonForm
              personList={personList}
              setPersonList={setPersonList}
              setPageState={setPageState}
            />
          }
          {pageState === 'AddItems' &&
            <ItemForm
              itemList={itemList}
              setItemList={setItemList}
              personList={personList}
              addedCharges={addedCharges}
              setAddedCharges={setAddedCharges}
              setPageState={setPageState}
            />
          }
          {pageState === 'ViewResults' &&
            <ResultsPage
              itemList={itemList}
              personList={personList}
              addedCharges={addedCharges}
              setPageState={setPageState}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
