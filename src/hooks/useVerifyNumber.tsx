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

  const fetchNumberInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://apilayer.net/api/validate?access_key=891e44814b06d65385141fcf18bc048d&number=${phoneNumber}`,
      );
      setNumberData(response.data);
    } catch (error) {
      console.error('Ошибка при получении информации о номере:', error);
    }
  }, [phoneNumber]);

  useEffect(() => {
    fetchNumberInfo();
  }, [phoneNumber, fetchNumberInfo]);

  return {
    validNumber: numberData?.valid,
  };
};

export default useVerifyNumber;
