import './main-page.scss';
import qrCode from 'assets/images/qr-code.png';

const MainPage = () => {
  return (
    <div className="main__container">
      <div className="main__video"></div>
      <div className="main__banner">
        <h4>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО <br /> МАЛЫША! <br /> ПОДАРИТЕ ЕМУ СОБАКУ!</h4>
        <img src={qrCode} width={126} height={126} alt="qr-img" />
        <p>Сканируйте QR-код или нажмите ОК</p>
        <button className='app__btn main__btn'>ОК</button>
      </div>
    </div>
  );
};

export default MainPage;
