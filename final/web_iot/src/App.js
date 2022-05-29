import React, { useEffect, useState } from 'react'
import database from './firebaseConfig';
import { Card, Row, Col } from 'react-bootstrap';
import { getTime, getJSONData } from './Util.js'
import { LineChart } from './LineChart';
import ModalSuhu from './ModalSuhu';
import ModalKelembaban from './ModalKelembaban';


const DEFAULT_TREN_SUHU = {
  height: '350px',
  color: ['#65adda'],
  axisX: [],
  title: 'Tren Suhu Di 10 data terakhir',
  title_axisX: '',
  title_axisY: '',
  series: [
    {
      name: "Suhu",
      data: []
    }
  ],
  max_axisy: 50
}

const DEFAULT_TREN_KELEMBABAN = {
  height: '350px',
  color: ['#f31620'],
  axisX: [],
  title: 'Tren Kelembaban Di 10 data terakhir',
  title_axisX: '',
  title_axisY: '',
  series: [
    {
      name: "Kelembaban",
      data: []
    }
  ],
  max_axisy: 100
}

export default function App() {
  const [showModalSuhu, setShowModalSuhu]= useState(false);
  const [showModalKelembaban, setShowModalKelembaban]= useState(false);
  const [bottom_limit_suhu,setBottomLimitSuhu] = useState(0)
  const [top_limit_suhu,setTopLimitSuhu] = useState(0)
  const [bottom_limit_kelembaban,setBottomLimitKelembaban] = useState(0)
  const [top_limit_kelembaban,setTopLimitKelembaban] = useState(0)
  const [dataRuangan, setDataRuangan] = useState([]);
  const [dataTrenSuhu, setDataTrenSuhu] = useState(DEFAULT_TREN_SUHU);
  const [dataTrenKelembaban, setDataTrenKelembaban] = useState(DEFAULT_TREN_KELEMBABAN);

  useEffect(() => {
    database.ref().child('/bottom_limit_suhu').on('value', snap => {
      setBottomLimitSuhu(snap.val())
    })
    database.ref().child('/top_limit_suhu').on('value', snap => {
      setTopLimitSuhu(snap.val())
    })
    database.ref().child('/bottom_limit_humid').on('value', snap => {
      setBottomLimitKelembaban(snap.val())
    })
    database.ref().child('/top_limit_humid').on('value', snap => {
      setTopLimitKelembaban(snap.val())
    })
    
    database.ref().child('/data_final').orderByChild('create_date').limitToLast(10).on('value', snap => {
      var _data_ruangan = snap.val();
      var data_ruangan = [];
      var _dataTrenSuhu = getJSONData(DEFAULT_TREN_SUHU);
      var _dataTrenKelembaban = getJSONData(DEFAULT_TREN_KELEMBABAN);
      for (var i in _data_ruangan) {
        data_ruangan.push(_data_ruangan[i])
      }
      data_ruangan.forEach(element => {
        _dataTrenSuhu.axisX.push(getTime(Number(element['create_date'])))
        _dataTrenSuhu.series[0].data.push(element.suhu)
        _dataTrenKelembaban.axisX.push(getTime(Number(element['create_date'])))
        _dataTrenKelembaban.series[0].data.push(element.kelembaban)
      });
      setDataRuangan(data_ruangan)
      setDataTrenSuhu(_dataTrenSuhu)
      setDataTrenKelembaban(_dataTrenKelembaban);
    })
  }, [])

  const onSubmitSuhu=(bot_limit, top_limit)=>{
    database.ref('/').update({bottom_limit_suhu:parseInt(bot_limit)})
    database.ref('/').update({top_limit_suhu:parseInt(top_limit)})
    setShowModalSuhu(false)
  }

  const onSubmitKelembaban=(bot_limit, top_limit)=>{
    database.ref('/').update({bottom_limit_humid:parseInt(bot_limit)})
    database.ref('/').update({top_limit_humid:parseInt(top_limit)})
    setShowModalKelembaban(false)
  }

  return (
    <Card className='m-1 p-1'>
      <p className='w-100 text-center m-0' style={{ fontWeight: 'bold', fontSize: "20px" }}>IoT-Temperature {"&"} Humidity Measurement {"&"} Adjustable Range </p>
      <hr />
      <Row>
        <Col md={6} sm={6} xs={6}>
          <div className='text-center w-100' style={{ border: "1px solid #ddd", cursor:"pointer" }} 
          onClick={()=>setShowModalSuhu(true)}
          >
            <p>Suhu {"("+bottom_limit_suhu+" °C -"+top_limit_suhu+" °C)"}: </p>
            <p style={{ fontSize: "30px" }}>{dataRuangan.length == 0 ? -1 : dataRuangan[dataRuangan.length - 1].suhu} °C</p>
          </div>
        </Col>
        <Col md={6} sm={6} xs={6}>
          <div className='text-center mr-1 w-100' style={{ border: "1px solid #ddd", cursor:"pointer" }} 
          onClick={()=>setShowModalKelembaban(true)}>
            <p>Humidity {"("+bottom_limit_kelembaban+" % -"+top_limit_kelembaban+" %)"}: </p>
            <p style={{ fontSize: "30px" }}>{dataRuangan.length == 0 ? -1 : dataRuangan[dataRuangan.length - 1].kelembaban} %</p>
          </div>
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col md={6}>
          <div className='text-center w-100' style={{ border: "1px solid #ddd" }}>
            <LineChart param={dataTrenSuhu}></LineChart>
          </div>
        </Col>
        <Col md={6}>
          <div className='text-center w-100' style={{ border: "1px solid #ddd" }}>
            <LineChart param={dataTrenKelembaban}></LineChart>
          </div>
        </Col>
      </Row>
      <ModalSuhu isShowModal={showModalSuhu} bottom_limit={bottom_limit_suhu} top_limit={top_limit_suhu} onSubmit={onSubmitSuhu} setShowModal={setShowModalSuhu}/>
      <ModalKelembaban isShowModal={showModalKelembaban} bottom_limit={bottom_limit_kelembaban} top_limit={top_limit_kelembaban} onSubmit={onSubmitKelembaban} setShowModal={setShowModalKelembaban}/>
    </Card>
  );
}
