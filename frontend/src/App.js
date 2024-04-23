import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Base/NavigationBar';
// import FooterBar from './components/footerBar/FooterBar';
import Home from './components/Base/Home';
import ReadAll from './components/Crud/ReadAll';
import ReadOne from './components/Crud/DetailItem';
import Create from './components/Crud/Create';
import Update from './components/Crud/Update';
// import Page404 from './Components/404/Page404';
function App() {
return (
<>
<NavigationBar />
<Routes>
{/* Home */}
<Route path="/" element={<Home />} />
{/* CRUD */}
<Route path="/readAll" element={<ReadAll />} />
<Route path="/readOne/:id" element={<ReadOne />} />
<Route path="create/" element={<Create />} />
<Route path="/update/:id" element={<Update />} />
{/* 404 */}
{/* <Route path="*" element={<Page404 />} /> */}
</Routes>
{/* <FooterBar /> */}
</>
);
}
export default App;