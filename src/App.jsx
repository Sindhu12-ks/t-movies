import './App.css'
import {WatchListProvider} from "./context/WatchListContext"
import RoutePaths from './Routes'
const App=()=> (
  <>
  <WatchListProvider> 
    <RoutePaths />
  </WatchListProvider>
  </>
)

export default App