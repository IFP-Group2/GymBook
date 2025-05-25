import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useApplyDarkMode = () => {
  const location = useLocation();
    useEffect(() => {
        // Si la ruta es exactamente /login, activa siempre el modo oscuro.
        //En cualquier otra ruta, sigue el valor guardado en sessionStorage
        const darkModeEnabled = location.pathname === '/login' ? 'true' : sessionStorage.getItem('dark_mode') === 'true';

        if (darkModeEnabled) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
        console.log("DarkMode: "+darkModeEnabled);
    }, []);
};

export default useApplyDarkMode;