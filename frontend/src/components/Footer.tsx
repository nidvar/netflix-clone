import { useAuthStore } from "../store/authUser"

function Footer() {
  const authStore = useAuthStore();
  return (
    <footer className="flex flex-col justify-center items-center gap-4 footer">
      <p>Netflix clone built by <a href="https://www.linkedin.com/in/nidvar/" target="_blank"><span className='link-underline'>Jarro</span></a></p>
      <p>List of <a href="https://nidvar.github.io/" target="_blank"><span className='link-underline'>Projects</span></a></p>
      <button onClick={async function(){await authStore.logout()}}>LOGOUT</button>
    </footer>
  )
}

export default Footer
