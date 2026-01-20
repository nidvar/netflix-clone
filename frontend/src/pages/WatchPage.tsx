import { useParams } from "react-router-dom"

function WatchPage() {
  const params = useParams();
  console.log(params)
  return (
    <div>
        <div className='main'>
            <h1>Watch Page</h1>
        </div>
    </div>
  )
}

export default WatchPage