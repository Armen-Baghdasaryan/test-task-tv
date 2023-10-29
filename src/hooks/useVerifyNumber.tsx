import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface PageProps {
  phoneNumber: string;
}

interface NumberData {
  country_name: string;
  location: string;
  isValid: boolean;
}

const useVerifyNumber = ({ phoneNumber }: PageProps) => {
  const [numberData, setNumberData] = useState<NumberData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNumberInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api-bdc.net/data/phone-number-validate?number=${phoneNumber}&countryCode=ru&localityLanguage=en&key=bdc_c9ca5d4c64474c3f978ff13d5d38e562`,
      );
      setNumberData(response.data);
    } catch (error) {
      console.error('Ошибка при получении информации о номере:', error);
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      if (phoneNumber.length > 10) {
        fetchNumberInfo();
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [phoneNumber, fetchNumberInfo]);

  return {
    validNumber: numberData?.isValid,
    loading,
  };
};

export default useVerifyNumber;
