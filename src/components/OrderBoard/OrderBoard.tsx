import { useCallback, useEffect, useMemo, useState } from 'react';
// import useVerifyNumber from 'hooks/useVerifyNumber';
import './order-board.scss';

const OrderBoard = () => {
  const [activeButton, setActiveButton] = useState<string>('5');
  const [chboxChecked, setChboxChecked] = useState<boolean>(false);

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
          } else {
            console.log(`Значение активной кнопки: ${activeButton}`);
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
  }, [activeButton, boardItems]);

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChboxChecked(e.target.checked);
    },
    [setChboxChecked],
  );

  const handleClose = () => {
    location.replace('/');
  };

  const handleItemClick = (id: string) => {
    if (id === 'x') {
      handleClose();
    } else {
      setActiveButton(id);
    }
  };

  // const { validNumber } = useVerifyNumber({ phoneNumber: '0037477994496' });
  // console.log(validNumber);

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (phoneNumber.length <= 12) {
      setPhoneNumber(event.target.value);
    }
  };
  return (
    <div className="order__board">
      <h4 className="board__title">Введите ваш номер мобильного телефона</h4>
      <input
        type="text"
        className="board__input"
        value={phoneNumber}
        placeholder="+7(___)___-__-__"
        onChange={handleInputChange}
      />
      <p className="board__info">и с Вами свяжется наш менеждер для дальнейшей консультации</p>
      <div className="board__items">
        {boardItems.map(({ id, value }) => (
          <div
            key={id}
            className={`board__item ${activeButton === id ? 'active' : ''}`}
            onClick={() => handleItemClick(id)}
            style={id === 'del' ? { gridColumn: 'span 2' } : {}}
          >
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className="input__chbox">
        <input type="checkbox" id="chbox" checked={chboxChecked} onChange={handleCheck} />
        <label htmlFor="chbox" />
        <p>Согласие на обработку персональных данных</p>
      </div>
    </div>
  );
};

export default OrderBoard;
