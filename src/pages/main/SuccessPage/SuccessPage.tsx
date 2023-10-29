import { useEffect, useState } from 'react';
import './success-page.scss';

const SuccessPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [btnFocus, setBtnFocus] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setFocus();
          break;
        case 'ArrowDown':
          setFocus();
          break;
        case 'ArrowLeft':
          setFocus();
          break;
        case 'ArrowRight':
          setFocus();
          break;
        case 'Enter':
          if (btnFocus) {
            location.replace('/');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [btnFocus]);

  const setFocus = () => {
    setBtnFocus((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="success__page">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="success__content">
          <h3>
            ЗАЯВКА <br /> ПРИНЯТА
          </h3>
          <p>
            Держите телефон под рукой. <br /> Скоро с Вами свяжется наш менеджер.{' '}
          </p>
          <button className={`close__btn ${btnFocus ? 'focused' : ''}`} />
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
