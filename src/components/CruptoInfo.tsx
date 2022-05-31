import { Crypto } from "../types/Crypto";

type Props = {
  selectedCrupto: Crypto
}

export const CryptoInfo: React.FC<Props> = ({ selectedCrupto }) => {
  return (
    <div className="list-group">
      <p className="list-group-item">Symbol: {selectedCrupto.asset_id}</p>
      <p className="list-group-item">Time: {selectedCrupto.data_end}</p>
      <p className="list-group-item">Price: {selectedCrupto.price_usd} USD</p>
    </div>
  );
}