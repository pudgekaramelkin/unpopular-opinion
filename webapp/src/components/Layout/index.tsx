import { Link, Outlet } from 'react-router-dom'
import { getAllOpinionsRoute } from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b>unpopularopinion.</b>
      </p>
      <ul>
        <li>
          <Link to={getAllOpinionsRoute()}>all opinions.</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
