import { useState } from 'react';

function Book() {
  const [flipped, setFlipped] = useState(false);

  const flipPage = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 h-[60vh]">
      {/* Page 1 */}
      <div
        className={`absolute transform origin-left transition-transform duration-1000 ease-in-out w-full h-full ${flipped ? 'scale-x-0' : 'scale-x-100'} bg-red-500`}
      >
        <p className="pt-48 text-center text-white">Page 1</p>
      </div>
      {/* Page 2 */}
      <div
        className={`absolute transform origin-left transition-transform duration-1000 ease-in-out w-full h-full ${!flipped ? 'scale-x-0' : 'scale-x-100'} bg-blue-500`}
      >
        <p className="pt-48 text-center text-white">Page 2</p>
      </div>
      {/* Controls */}
      <button
        onClick={flipPage}
        className="absolute top-0 right-0 z-10 px-4 py-2 m-4 text-white bg-green-500 "
        aria-label="Flip to the next page"
      >
        Flip Page
      </button>
    </div>
  );
}

export default Book;
