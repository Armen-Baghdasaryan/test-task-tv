import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { togglePause } from 'store/player';
import { TRootState } from 'store';
import qrCode from 'assets/images/qr-code.png';
import './main-page.scss';

const MainPage = () => {
  const { isVisiable } = useSelector((store: TRootState) => store.player);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const okButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isButtonFocused, setButtonFocused] = useState(false);

  const onMouseEnter = () => {
    dispatch(togglePause(true));
  };

  const onMouseLeave = () => {
    dispatch(togglePause(false));
  };

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
          if (isButtonFocused) {
            navigate('order');
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
  }, [isButtonFocused, navigate]);

  const setFocus = () => {
    setButtonFocused((prev) => !prev);
  };

  return (
    <div className="main__container">
      <div className="main__video">
        <VideoPlayer />
      </div>
      {isVisiable && (
        <div className="main__banner" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <h4>
            ИСПОЛНИТЕ МЕЧТУ ВАШЕГО <br /> МАЛЫША! <br /> ПОДАРИТЕ ЕМУ СОБАКУ!
          </h4>
          <img src={qrCode} width={126} height={126} alt="qr-img" />
          <p>Сканируйте QR-код или нажмите ОК</p>
          <button
            ref={okButtonRef}
            className={`app__btn main__btn ${isButtonFocused ? 'focused' : ''}`}
            onClick={() => navigate('order')}
          >
            ОК
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
