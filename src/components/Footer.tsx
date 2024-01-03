import { Github } from 'lucide-react';

function Footer() {
  return (
    <>
      <div className='flex justify-center items-center text-sky-50 fixed bottom-0 gap-3'>
        <p>Designed and Developed by </p>
        <a href='https://github.com/samyak-max' className='text-sky-50 hover:text-sky-100'><Github /></a>
        </div>
    </>
  )
}

export default Footer