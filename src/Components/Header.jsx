import React from 'react';
import { useSelector } from 'react-redux';

// import logo from '../Assets/img/logoNba.png';

const navs = [
  {
    id: 1,
    name: 'SCORE',
  },
  {
    id: 2,
    name: 'SCHEDULE',
  },
  {
    id: 3,
    name: 'NEWS',
  },
  {
    id: 4,
    name: 'PLAYS',
  },
  {
    id: 5,
    name: 'TEAMS',
  },
];
const Header = () => {
  const {
    header: { logo, name },
  } = useSelector((state) => state.core);

  const { themeDefault } = useSelector((state) => state.theme);

  return (
    <div
      className={`flex items-center justify-around py-4  ${themeDefault.bgHeader}`}
    >
      <div className="flex items-center">
        <img className="w-15 h-[33px] mr-2" src={logo} alt={logo} />
        <h3 className="font-[500]">{name}</h3>
      </div>
      <div className="">
        <ul className="flex items-center">
          {navs.map((nav) => (
            <li className="mr-2 text-xl font-[500] " key={nav.id}>
              <a href={`#${nav.name}`}>{nav.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
