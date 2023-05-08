import React, { useState, useEffect } from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import Question from './Question'
import Answer from './Answer'






function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }
  }, [])



  const [riddle, setriddle] = useState({})
  let imageuri = 'https://th.bing.com/th/id/R.d677631424589127931af86bbe5d6f5d?rik=lJuBk5mMZPTCbQ&pid=ImgRaw&r=0'
  const fetchData = () => {
    let uri = 'https://riddles-api.vercel.app/random'
    axios(uri)
      .then((res) => {
        // console.log(res.data)
        document.getElementById('answer').className -= ' d-block'
        setriddle(res.data)
      })
      .catch((res) => {
        console.log(res);
      })
  }

  const showAnswer = () => {
    document.getElementById('answer').className += ' d-block'
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>

      <div className='w-100 vh-100 bg-info d-flex justify-content-center align-items-center flex-column'>
        <marquee style={{ width: '18rem' }} className='py-5'><h3 className='text-warning'>Riddle App</h3></marquee>
        <div class="card" style={{ width: '18rem' }}>
          <div class="card-header text-center d-flex gap-2 justify-content-center align-items-center">
            <img src={imageuri} className='rounded-circle' style={{ width: '50px', height: '50px' }} /> Riddle App
          </div>
          <ul class="list-group list-group-flush transparent">
            <li class="list-group-item text-center transparent"> <Question body={riddle.riddle} /> <button onClick={showAnswer} className='btn btn-warning p-2 w-100 d-block'>Show Answer</button></li>
            <li class="list-group-item transparent" style={{ display: 'none' }} id='answer'><Answer body={riddle.answer} /></li>
            <li class="list-group-item p-2 transparent"><button onClick={fetchData} className='btn btn-warning p-2 w-100'>Fetch New</button></li>
          </ul>
        </div>


      </div>
    </>
  )
}

export default App
