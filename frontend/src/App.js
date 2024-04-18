import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './Components/Auth/UserContext';
import NavigationBar from './Components/Navigate/NavigateBar';
import FooterBar from './Components/Navigate/FooterBar';
import Home from './Components/Home/Home'

import Register from './Components/Auth/Register';
import LogIn from './Components/Auth/LogIn';
import ReadAll from './components/Crud/ReadAll';
function App() {
return (
<>

<UserContextProvider>
<NavigationBar />
<Routes>

<Route path="/" element={<Home />} />

……………

<Route path="/register" element={<Create />} />
<Route path="/login" element={<ReadAll />} />

<Route path="*" element={<DetailItem />} />
</Routes>
<FooterBar />
</UserContextProvider>
</>
);
}
export default App;
