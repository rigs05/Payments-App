const UserLogo = ({ name }) => {
  return (
    <div className='flex justify-center items-center bg-gray-500 text-white p-1 h-10 w-10 rounded-full text-md font-bold'>
      {name[0].toUpperCase()}
    </div>
  );
};

export default UserLogo;
