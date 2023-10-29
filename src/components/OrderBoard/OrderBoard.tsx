import { useCallback, useEffect, useMemo, useState } from 'react';
import useVerifyNumber from 'hooks/useVerifyNumber';
import SuccessPage from 'pages/main/SuccessPage/SuccessPage';
import PhoneInput from 'react-phone-input-2';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import 'react-phone-input-2/lib/style.css';
import './order-board.scss';

const OrderBoard = () => {
  const [activeButton, setActiveButton] = useState<string>('5');
  const [chboxChecked, setChboxChecked] = useState<boolean>(false);
  const [chboxFocused, setChboxFocused] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('+7');
  const [isSuccessPage, setIsSuccessPage] = useState<boolean>(false);
  const { validNumber, loading } = useVerifyNumber({ phoneNumber: phoneNumber });

  const submitAccess = validNumber && chboxChecked;

  const boardItems = useMemo(
    () => [
      { id: '1', value: '1' },
      { id: '2', value: '2' },
      { id: '3', value: '3' },
      { id: '4', value: '4' },
      { id: '5', value: '5' },
      { id: '6', value: '6' },
      { id: '7', value: '7' },
      { id: '8', value: '8' },
      { id: '9', value: '9' },
      { id: 'del', value: 'Стереть' },
      { id: '0', value: '0' },
      { id: 'x', value: '' },
      { id: 'ok', value: 'Подтвердить номер' },
    ],
    [],
  );

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChboxChecked(e.target.checked);
  };

  const handleItemClick = (id: string) => {
    if (id === 'x') {
      handleClose();
    } else if (id === 'del') {
      handleClear();
    } else {
      setActiveButton(id);
      handleTry(id);
    }
  };

  const handleClear = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleTry = (id: string) => {
    setPhoneNumber((prev) => prev + id);
  };

  const handleSubmit = useCallback(() => {
    if (submitAccess) {
      setIsSuccessPage(true);
    }
  }, [submitAccess]);

  const handleClose = () => {
    location.replace('/');
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const activeIndex = boardItems.findIndex((item) => item.id === activeButton);

      switch (event.key) {
        case 'ArrowUp':
          if (activeIndex >= 3) {
            setActiveButton(boardItems[activeIndex - 3].id);
          }
          break;
        case 'ArrowDown':
          if (activeIndex < boardItems.length - 3) {
            setActiveButton(boardItems[activeIndex + 3].id);
          }
          if (chboxChecked) {
            setActiveButton('ok');
          }
          break;
        case 'ArrowLeft':
          if (activeIndex > 0) {
            setActiveButton(boardItems[activeIndex - 1].id);
          }
          break;
        case 'ArrowRight':
          if (activeIndex < boardItems.length - 1) {
            setActiveButton(boardItems[activeIndex + 1].id);
          }
          break;
        case 'Enter':
          if (activeButton === 'x') {
            handleClose();
          } else if (activeButton === 'del') {
            handleClear();
          } else if (activeButton === 'ok') {
            handleSubmit();
          } else if (chboxFocused) {
            setChboxChecked((prev) => !prev);
          } else {
            if (!validNumber) {
              handleTry(activeButton);
            }
          }
          break;
        case 'Backspace':
          if (!(event.target instanceof HTMLInputElement)) {
            handleClear();
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
  }, [activeButton, boardItems, validNumber, chboxChecked, chboxFocused, handleSubmit]);

  useEffect(() => {
    if (validNumber) {
      setChboxFocused(true);
      setActiveButton('');
    } else {
      setChboxFocused(false);
      setActiveButton('5');
    }
  }, [validNumber]);

  return (
    <>
      {!isSuccessPage ? (
        <div className="order__board">
          <h4 className="board__title">Введите ваш номер мобильного телефона</h4>
          <PhoneInput
            inputProps={{
              required: true,
              autoFocus: true,
            }}
            onlyCountries={['ru']}
            country={'ru'}
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            placeholder="+7(___)___-__-__"
            inputStyle={{
              color: phoneNumber.length > 10 && !validNumber ? '#ff0000' : '#000',
            }}
          />
          <p className="board__info">и с Вами свяжется наш менеждер для дальнейшей консультации</p>
          <div className="board__items">
            {boardItems.map(({ id, value }) => (
              <div
                key={id}
                className={`board__item ${activeButton === id ? 'active' : ''} ${
                  id === 'ok' && submitAccess ? 'not__disabled' : ''
                }`}
                onClick={id !== 'ok' ? () => handleItemClick(id) : handleSubmit}
                style={id === 'del' ? { gridColumn: 'span 2' } : {}}
              >
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div className="input__chbox">
            <input type="checkbox" id="chbox" checked={chboxChecked} onChange={handleCheck} />
            <label htmlFor="chbox" className={chboxFocused ? 'fucused' : ''} />
            <p>Согласие на обработку персональных данных</p>
          </div>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>{phoneNumber.length > 2 && !validNumber && <p className="invalid__number">Неверно введён номер</p>}</>
          )}
        </div>
      ) : (
        <SuccessPage />
      )}
    </>
  );
};

export default OrderBoard;
