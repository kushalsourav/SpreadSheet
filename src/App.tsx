
import './App.css'

import SpreadSheet from "../src/components/SpreadSheet/SpreadSheet"
import Toolbar from './components/Toolbar/Toolbar'
import FormulaBar from './components/FormulaBar/FormulaBar'

import ColumnValidationModal from './components/Modals/ColumnValidationModal'
import { useSpreadsheet } from './hooks/useSpreadSheet'

function App() {
 
  const {showValidation, setShowValidation} = useSpreadsheet();
  
  
  return (
    <>
  
      <Toolbar />
      <FormulaBar />
    <SpreadSheet setShowValidation={setShowValidation}/>
    {showValidation && <ColumnValidationModal onClose={() => setShowValidation(false)} />}
 
    </>)
     
}

export default App
