import React,{useState} from 'react'
const obj_map_name = new Map();
const obj_map_phone = new Map();

export default function Main() {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);
    const[index,setIndex]=useState();
    const [person, setPerson]=useState({name:"", phone_number:"", bill_amount:"", paym:""});
    let {name,phone_number,bill_amount, paym}=person;
    const [SearchKey, setSearchKey]=useState('');
    const [method, setMthod] = useState('');
    const [msg, setMsg] = useState({namem:'', phonm:'', bill:'', pay:'', searchm:''});
    
    
    let filteredData = data.filter(item => {if (SearchKey === "") return data 
    if(method === 'Includes'){return (item.name.toLowerCase().includes(SearchKey.toLowerCase())) || (item.bill_amount === SearchKey) || (item.phone_number.toLowerCase().includes(SearchKey.toLowerCase()))}
    else if(method === 'Start'){return (item.name.toLowerCase().startsWith(SearchKey.toLowerCase())) || (item.bill_amount === SearchKey) || (item.phone_number.toLowerCase().startsWith(SearchKey.toLowerCase()))}
    else if(method === 'End'){return (item.name.toLowerCase().endsWith(SearchKey.toLowerCase())) || (item.bill_amount === SearchKey) || (item.phone_number.toLowerCase().endsWith(SearchKey.toLowerCase()))}
    });
  
    function SearchMethod(e){
      setMsg({namem:'', phonm:'', bill:'', pay:'', searchm:''});
      setMthod(e.target.value);}

    const Search_pick = (e) =>{
      setMsg({namem:'', phonm:'', bill:'', pay:'', searchm:''});
      if(method !== ''){
      let temp = e.target.value;//document.getElementById("search").value;
      setSearchKey(temp);}
      else{
        setMsg({...msg,searchm:'Select Search Mtehod!'});
        //alert("Select Search Mtehod");
        return
      }
    }

    function reset(){
      document.getElementById("o").checked = false;
      document.getElementById("n").checked = false;
      document.getElementById("e").checked = false;
      setPerson({name:"", phone_number:"", bill_amount:"", paym:""});
    }
    const funInput=(e)=>{
      setPerson({...person, [e.target.name]:e.target.value});
      setMsg({namem:'', phonm:'', bill:'', pay:'', searchm:''});
      
    };
    const funSubmit=()=>{
      setData([...data, {name,phone_number,bill_amount, paym}]);
      console.log(JSON.stringify(person));
      console.log(JSON.parse(JSON.stringify(person)));
      obj_map_name.set(person.name, person);
      obj_map_phone.set(person.phone_number, person);
      console.log(obj_map_name.entries());
      console.log(obj_map_phone.entries());
      reset();
    }

    function Edit(i){
      let {name,phone_number,bill_amount, paym} = data[i];
      setPerson({name,phone_number,bill_amount, paym});
      setCheck(true);
      setIndex(i);
    }

    function editData()
    {
      let hold =  [...data];
      hold.splice(index,1,{name,phone_number,bill_amount,paym});
      setData(hold);
      setCheck(false);
      reset();

    }

    function Delete(i)
    {
        let temp =[...data];
        obj_map_name.delete(temp[i].name);
        obj_map_phone.delete(temp[i].phone_number);
        console.log(obj_map_name.entries());
        console.log(obj_map_phone.entries());
        temp.splice(i,1);
      
        setData(temp);

    }
    
    const checkValid=()=>{
      let Isvalid = true;
      if(isNaN(person.name) === false || person.name.length === 0){
        setMsg({...msg, namem:'Name is not Valid!'});
        //alert("Name is not Valid");
        Isvalid = false;
      }
      else if(isNaN(person.phone_number) || person.phone_number.length < 10 || person.phone_number.length > 10 || obj_map_phone.has(person.phone_number)){
        setMsg({...msg, phonm:'Number is not valid!'});
        //alert("Phone number is not valid");
        Isvalid = false;
      } 
      else if(isNaN(person.bill_amount) || person.bill_amount===""){
        setMsg({...msg, bill:'Bill is not valid!'});
        //alert("Bill amount is not valid");
        Isvalid = false;
      }
      else if(person.paym === ""){
        setMsg({...msg, pay:'Select payment method!'});
        //alert("Select payment method");
        Isvalid = false;
      }

      if(Isvalid){
        funSubmit()
      }
      else{
        return false;
      }
    } 
  return (
    <div className="style">
    <label><b>React Demo App</b></label><br/><br/>
    <label><b>Name:</b></label><br/>
    <input id="name" className="input" name="name" value={person.name} onChange={funInput}/><label id="msg">{msg.namem}</label><br/><br/>
    <label><b>Phone Number:</b></label><br/>
    <input id="phone" className="input" name="phone_number" value={person.phone_number} onChange={funInput}/><label id="msg">{msg.phonm}</label><br/><br/>
    <label><b>Bill Amount:</b></label><br/> 
    <input id="bill" className="input" name="bill_amount" value={person.bill_amount} onChange={funInput}/><label id="msg">{msg.bill}</label><br/><br/>
  <div id="pm">
   <label><b>Payment Method:</b></label><label id="msg">{msg.pay}</label><br/>
     <input type="radio" id="o"  value="Cash/UPI" name='paym' onClick={funInput}/><label>Cash / UPI </label><br/>
     <input type="radio" id="n" value="Net-B" name="paym"  onClick={funInput}/><label>Net Banking</label><br/>
     <input type="radio" id="e" value="Card" name='paym'  onClick={funInput}/><label>Cd/Db Card</label><br/><br/>
     <button id="bt1" onClick={!check?checkValid:editData}>{!check?`Submit`:`Save`}</button><br/><br/>
  </div>
  <div>
    <label><b>Search Box:</b></label><br/>
    <input id="search" name="search" onChange={Search_pick}/><br/>
    <select id='op' value={method} onChange={SearchMethod}>
            <option value="">Select Search Method</option>
            <option id='op1'  value='Includes'>Includes</option>
            <option id='op2'  value='Start'>Start With</option>
            <option id='op3' value='End'>End With</option>
    </select><label id="msg">{msg.searchm}</label><br/><br/>
  </div>

     <div>
      <table className='table'>
        <thead>
        <tr><td><b>Name</b></td>
          <td><b>Bill</b></td>
          <td><b>Phone</b></td>
          <td><b>Pay</b></td>
          <td><b>Update</b></td></tr>
        </thead>
        <tbody>
          {
            filteredData.map((current, i) => {return(<tr key={i}>
              <td>{current.name}</td>
              <td>{current.bill_amount}</td>
              <td>{current.phone_number}</td>
              <td>{current.paym}</td>
              <td><button id="bt2" onClick={()=>Edit(i)}>Edit</button><button id="bt3" onClick={()=>Delete(i)}>Delete</button></td>
            </tr>)})
          }
        </tbody>
      </table>
     </div>
    </div>
  );
}

