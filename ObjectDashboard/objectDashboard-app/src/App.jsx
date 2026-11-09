import {Routes,Route} from 'react-router';
import './App.css'
import ObjectDashboard from './components/ObjectDashboard'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<ObjectDashboard/>}/>
    </Routes>
  )
}

export default App
