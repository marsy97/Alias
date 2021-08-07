import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dodajTimove } from '../Redux/counterSlice';
import './game.css';






 function Game() {
    const [state, setState] = useState(0)
     const [igraci, setIgraci] = useState([{ tim: "tim1", igrac1: "igrac1", igrac2: "igrac2" }, { tim: "tim2", igrac1: "igrac1", igrac2: "igrac2"}])
     const [igraci2, setIgraci2] = useState([])
     const timovi = useSelector((state) => state.counter.timovi);
     let input1 = useRef();
     let input2 = useRef();
     let input3 = useRef();
     const dispatch = useDispatch();
     useEffect(() => {
         if (igraci.length === 0) return;
       
         clear_inputs()
         dispatch(dodajTimove(igraci))
         setState(!state)
     }, [igraci])

     useEffect(() => {
         console.log(timovi)

     }, [timovi])
     
     return (
         <div style={{ overflowX: "hidden" }}>
            
            <div className="nova">NOVA IGRA
                </div>

            <div className="nova">Timovi
                </div>
           
            {
                igraci.map((val, index) =>
                    <div key={ index} className="igraci" > {`${val.tim}`}</div>
                )
            }


            <div className="timbuttonparent" onClick={() => { setState(1) }}>
                 <div className="button">  NOVI TIM   </div>

                 <div className="pokrenibuttonparent" >
                     <Link to="/startGame" className="pokrenibutton">  POKRENI IGRU  </Link>
                 </div>

             </div>

            

             <motion.div className="tint" animate={state ? {} : { x: "-200%" }}>
            <motion.div className="gameInputParent"
                 animate={state ? {} : { x: "-200%" }} >
                 <input onEnded={()=> alert("kraj") } ref={input1} id="input1" placeholder="Ime tima" type="text" className="gameInput" />
                <input ref={input2} id="input2" placeholder="Igrac 1" type="text" className="gameInput"/>
                <input ref={input3} id="input3" placeholder="Igrac 2" type="text" className="gameInput" />

                <div style={{ display: "flex", width: "100%"}}>
                    <div className="buttonInputcreate"  onClick={() => addingPlayers()}>KREIRAJ</div>
                    <div className="buttonInputcancel"  onClick={() => { setState(0) }}>ODUSTANI</div>

                </div>
                 </motion.div>
            

            

            

             </motion.div>

        </div>
    );


     function addingPlayers() {

         let temporaryArray = [];
         if (igraci.length != 0)
         igraci.forEach((val) => {

             temporaryArray.push(val);
         })



         const tim = input1.current.value;
         const igrac1 = input2.current.value;
         const igrac2 = input3.current.value;
         const value = { tim: tim, igrac1: igrac1, igrac2: igrac2 }
         temporaryArray.push(value);
      


         setIgraci(temporaryArray);

         
            
         
         

         


     }


     function clear_inputs() {
        input1.current.value="";
        input2.current.value="";
        input3.current.value="";
       
     }
}



export default Game; 