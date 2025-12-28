import { useContext, useEffect } from 'react';
import './App.css';
import CategoryHeader from './category/CategoryHeader';
import CircularProgressSpinner from './components/ProgressSpinner';
import Header from './header/Header';
import Divider from '@mui/material/Divider';
import { ApplicationContext } from './ApplicationContext';
import AlertComponent from './components/AlertComponent';

function App() {
  const {displayLoadingSpinner, setLanguage} = useContext(ApplicationContext);
  useEffect(() => {
    const selectedLanguage = {
      languageId: 1,
      languageCode: 'en'
    }
    setLanguage(selectedLanguage);
  }, []);
  return (
    <>
      <Header />
      <Divider component="li" sx={{ height: 3, backgroundColor: "#F77793" }} />
      <CategoryHeader />
      <Divider component="li" sx={{ height: 2, backgroundColor: "#F77793" }} />
      <CircularProgressSpinner displayLoadingSpinner={displayLoadingSpinner} />
      <AlertComponent />
    </>
  );
}

export default App;