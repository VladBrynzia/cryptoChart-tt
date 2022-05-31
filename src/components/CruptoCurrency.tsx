import { useEffect, useMemo, useState } from "react";
import { Crypto } from "../types/Crypto";
import { CryptoInfo } from './CruptoInfo'
import { CryptoChart } from "./CryptoChart";

const APIkey = 'EB8AED85-7060-4ADB-A6EB-B0EE52249539';
const BASE_URL = 'https://rest.coinapi.io/v1/';

const getHistory = async (name: string) => {
  console.log('getH');
  const responce = await fetch(`${BASE_URL}exchangerate/${name}/USD/history?apikey=${APIkey}&period_id=1DAY&time_start=2022-05-01T00:00:00`);
  return await responce.json();
}

export const CryptoCurrency: React.FC = () => {
  const [cryptos, setCruptos] = useState<Crypto[]>([]);
  const [historys, setHistorys] = useState<History[]>([]);
  const [selectedCruptoName, setSelectedCruptoName] = useState<string | null>(null);
  // const [isOpenExtraInfo, setIsOpenExtraInfo] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${BASE_URL}assets?apikey=${APIkey}`)
      .then(responce => responce.json())
      .then(data => {
        setCruptos(data);
        console.log('effect');
        
      })
  }, []);

  const loadCrypto = (name: string) => {
    if(!name) {
      return;
    }
    console.log('load');
    setHistorys([]);
    getHistory(name)
      .then(data => setHistorys(data));
    // setIsOpenExtraInfo(true);
  }

  const selectedCrypto = useMemo(() => {
    console.log('select');
    return cryptos.find(el => el.asset_id === selectedCruptoName)
  }, [selectedCruptoName, cryptos])

  return (
    <div className="container">
      {cryptos.length
        ?
        <>
          <select defaultValue='Select' className="btn btn-light dropdown-toggle" 
            onChange={(e) => {
                setSelectedCruptoName(e.target.value);
                loadCrypto(e.target.value);
              }} >
            <option value='Select' selected disabled>Chose your cripto</option>
            {cryptos.map((el: Crypto) => (
              <option value={el.asset_id} key={el.asset_id}>{el.name}</option>
            ))}
          </select>
        </>
        :
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {selectedCrypto && historys &&(
        <>
          <p>Market data:</p>
          <CryptoInfo selectedCrupto={selectedCrypto} />
          <p>Charting data:</p>
          <CryptoChart history={historys} />
        </>
      )}
    </div>
  );
}