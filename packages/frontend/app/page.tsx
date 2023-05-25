import Image from 'next/image'

export default function Home() {
  return (
    <div className='text-cyan-500'>
      <h1> hello messenger </h1>
      <Image src='/next.svg' alt='next' width={300} height={300} />
    </div>
  )
}
