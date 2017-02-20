const Nav = () => <div>
  <ul>
    <li>
      <a href='/'>home</a>
    </li>

    <li>
      <a href='/clients'>clients</a>
    </li>

    <li>
      <a href='/users'>users</a>
    </li>
  </ul>
</div>

Layout = ({ Index }) => <div>
  <Nav />
  <Index />
</div>
