import MainLine from '../../public/Icon/MainLine';

interface HeaderProps {
  title: string;
  Icon?: React.ComponentType;
}

const Header = ({ title, Icon }: HeaderProps) => {
  return (
    <>
      <div className="mt-8 flex flex-row items-center gap-2 mb-4">
        {Icon && <Icon />}
        <div className="text-gray-800 font-2xl-bold">{title}</div>
      </div>
      <MainLine />
    </>
  );
};

export default Header;
