import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "1234567890";
    if(charAllowed) str += "!@#$%^&*()_+-={}[]/\|><";

    for(let i=0; i<length; i++){
      const index = Math.floor(Math.random() *str.length) + 1;
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);


  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  return (
    <div className='bg-gray-800 w-full h-screen '>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800
      text-orange-500 '>
        <h1 className='text-green-500 text-center my-5 text-2xl'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3 bg-white text-green-900'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-7'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)}/>
            <label className='text-green-500'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input className='' type='checkbox' defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}}/>
            <label className='text-green-500 '>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input className='' type='checkbox' defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}}/>
            <label className='text-green-500 py-4'>Characters</label>
          </div>

        </div>

      </div>
    </div>
  )
}

export default App
