import { Logo } from '../Logo';
import { LogOut } from '../LogOut/LogOut';
import './Header.scss';

export const Header: React.FC = () => (
  <header className="header">
    <Logo />

    <LogOut />
  </header>
);
