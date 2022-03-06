export default function Background() {
  return (
    <>
      <div
        className="absolute bottom-0 inset-x-0 w-full h-111 bg-cover bg-center -z-1"
        style={{ backgroundImage: 'url("/home-1.svg")' }}
      />
      <div
        className="absolute bottom-0 inset-x-0 w-full h-83 bg-cover bg-center -z-1"
        style={{ backgroundImage: 'url("/home.svg")' }}
      />
    </>
  )
}