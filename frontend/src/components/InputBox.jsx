const InputBox = ({ label, type, placeholder, onChange }) => {
  return (
    <div className='text-left'>
      <label className='text-sm font-medium text-gray-700'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className='mt-1 mb-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
