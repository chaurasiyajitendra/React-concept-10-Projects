import Register from '../components/blogApp/Register'
import { Outlet } from 'react-router'

function BlogRouting() {
  return (
    <>
      <Outlet >
        <Register />
      </Outlet>
    </>
  )
}

export default BlogRouting
