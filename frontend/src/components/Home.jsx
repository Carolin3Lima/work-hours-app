import React, {useState, useEffect} from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import moment from 'moment';

function Home() {

  const [input, setInput] = useState({
    today: '',
    start: '',
    end: '',
    lunchStart: '',
    lunchEnd:'',
    hours: '',
  })

  const [refresh, setRefresh] = useState([{
    shouldRefresh:false
  }])  


  const [workloads, setWorkloads] = useState([{
    today: '',
    start: '',
    end: '',
    lunchStart: '',
    lunchEnd:'',
    hours: '',
  }])

  useEffect(() => {
    const url = 'http://localhost:3001/search' 
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }}
    fetch(url,options).then(async res => {
      if(res.ok) {
        const jsonRes = await res.json()
        setWorkloads(jsonRes)
        return jsonRes
      }
    });
  }, [refresh.shouldRefresh])

  function handleChange(event) {
    const {name, value} = event.target;
    setRefresh({shouldRefresh:false})
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  function setWorkload(time1, time2, time3, time4){
      const hour1 = moment.duration(time1);
      const hour2 = moment.duration(time2);
      const joinHours1 =  hour2.subtract(hour1)
      const hour3 = moment.duration(time3);
      const hour4 = moment.duration(time4);
      const joinHours2 =  hour4.subtract(hour3)
      const totalHours = joinHours1.add(joinHours2)
      const total =  totalHours.hours() + ':' + totalHours.minutes()
      const toMoment = moment(total, 'HH:mm')
      return moment(toMoment).format("HH:mm")
  }

  function handleClick(event) {
    event.preventDefault();
    setWorkload(input.start, input.lunchStart, input.lunchEnd, input.end)
    const newWorkload = {
      today: new Date().toLocaleDateString('pt-br'),
      start: input.start,
      end: input.end,
      lunchStart: input.lunchStart,
      lunchEnd: input.lunchEnd,
      hours: setWorkload(input.start, input.lunchStart, input.lunchEnd, input.end)
    }
    const url ='http://localhost:3001/insert'
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(newWorkload)
    };
    fetch(url,options).then(async res => {
      setRefresh({shouldRefresh:true})
    })
  }

  return <div className="p-5">
      <div className="d-flex justify-content-center pb-4">
        <h1>Working Hours Control</h1>
      </div>
      <div className="d-flex justify-content-center pb-5">
        <h2>Register your workload of today</h2>
      </div>
      <form className="row">
        <div className='form-group col-3'>
          <h4>Arrival Time</h4>
          <InputMask mask="99:99" maskChar=" " onChange={handleChange} value={input.start} name="start" className='form-control' placeholder="ex: 08:00" />
        </div>
        <div className='form-group col-3'>
          <h4>Lunch Time (start)</h4>
          <InputMask mask="99:99" maskChar=" " onChange={handleChange} value={input.lunchStart} name="lunchStart" className='form-control' placeholder="ex: 12:00" />
        </div>
        <div className='form-group col-3'>
          <h4>Lunch Time (end)</h4>
          <InputMask mask="99:99" maskChar=" " onChange={handleChange} value={input.lunchEnd} name="lunchEnd" className='form-control' placeholder="ex: 13:00" />
        </div>
        <div className='form-group col-3'>
          <h4>Exit Time</h4>
          <InputMask mask="99:99" maskChar=" " onChange={handleChange} value={input.end} name="end" className='form-control' placeholder="ex: 18:00" />
        </div>
        <div className="col-12 d-flex justify-content-center pt-4 pb-4">
          <div className="col-4">
            <button onClick={handleClick} className="btn btn-block btn-info">Send Hours</button>
          </div>
        </div>
      </form>
      <div className="pt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Arrival</th>
              <th scope="col">Lunch(start)</th>
              <th scope="col">Lunch(end)</th>
              <th scope="col">Exit</th>
              <th scope="col">Workload</th>
            </tr>
          </thead>
          <tbody>
          {workloads.map((workload, index) =>
            <tr key={index}>
              <td>{workload.today}</td>
              <td>{workload.start}</td>
              <td>{workload.end}</td>
              <td>{workload.lunchStart}</td>
              <td>{workload.lunchEnd}</td>
              <td>{workload.hours}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
}

export default Home;