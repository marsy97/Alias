import './game.css';
import { Link } from 'react-router-dom';

function Pobjeda() {
    return (
        <div className="pobjedaBg" >
            <h1>POBJEDA!</h1>

            <h2 className="pobjednici">val.tim su pobjednici!</h2>

            <div className="zavrsiParent" >
                <Link to="/" className="zavrsibutton">  ZAVRSI  </Link>
                <Link to="/" className="zavrsibutton2">  NOVA IGRA</Link>
            </div>
        </div>
    );
}

export default Pobjeda;