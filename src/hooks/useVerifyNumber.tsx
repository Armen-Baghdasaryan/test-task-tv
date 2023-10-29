import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface PageProps {
  phoneNumber: string;
}

interface NumberData {
  country_name: string;
  location: string;
  valid: boolean;
}

const useVerifyNumber = ({ phoneNumber }: PageProps) => {
  const [numberData, setNumberData] = useState<NumberData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNumberInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://apilayer.net/api/validate?access_key=891e44814b06d65385141fcf18bc048d&number=${phoneNumber}`,
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
      fetchNumberInfo();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [phoneNumber, fetchNumberInfo]);

  return {
    validNumber: numberData?.valid,
    loading,
  };
};

export default useVerifyNumber;
