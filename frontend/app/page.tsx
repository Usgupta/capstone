// Components
import Dropdown from '@/components/Dropdown'
import Uploadfile from '../components/Uploadfile'

export default function Home() {
  return (
    <main className='flex flex-col justify-center items-center h-[580px] mt-6'>
      <Uploadfile />
      <div className='flex justify-between mt-10'>
        <Dropdown />
        <button className='bg-blue-300 btn ml-5 min-h-min h-[41px] rounded-lg'>Run</button>
      </div>
    </main>
  )
}
