
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Layout/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="w-11/12 mx-auto bg-workout-secondary ">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
