import { useEffect, useMemo, useState } from "react";
import { Crypto } from "../types/Crypto";
import { CryptoInfo } from './CruptoInfo'
import { CryptoChart } from "./CryptoChart";

const APIkey = '7F9E3C97-FA1E-4604-A269-CE5720FCD7D2';
const BASE_URL = 'https://rest.coinapi.io/v1/';

export const CryptoCurrency: React.FC = () => {
  const [cryptos, setCrupto] = useState<Crypto[]>([]);
  const [selectedCruptoName, setSelectedCruptoName] = useState<string | null>(null);
  const [isOpenExtraInfo, setIsOpenExtraInfo] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}assets?apikey=${APIkey}`)
      .then(responce => responce.json())
      .then(data => {
        setCrupto(data);
      })
  }, []);

  const selectedCrypto = useMemo(() => 
  cryptos.find(el => el.name === selectedCruptoName
    ), [selectedCruptoName, cryptos])


  return (
    <div className="container">
      {cryptos.length
        ?
        <>
          <select className="btn btn-light dropdown-toggle" onChange={e => {
              setSelectedCruptoName(e.target.value)
            }
          }>
            <option selected disabled>Chose your cripto</option>
            {cryptos.map((el: Crypto) => (
              <option key={el.asset_id}>{el.name}</option>
            )) 
          }
        </select>
        <button className="btn btn-secondary" onClick={() => setIsOpenExtraInfo(true)}>Load info about crypto</button>
        </>
        :
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {isOpenExtraInfo && selectedCrypto && (
        <>
          <p>Market data:</p>
          <CryptoInfo selectedCrupto={selectedCrypto} />
          <p>Charting data:</p>
          <CryptoChart BASE_URL={BASE_URL} APIkey={APIkey} selectedCruptoName={selectedCruptoName} />
        </>
      )}
      
    </div>
  );
}