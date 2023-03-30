import React from 'react';

function Modal({ modalContent }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/4 my-6 mx-auto max-w-3xl max-h-screen">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#EDF1FF] outline-none focus:outline-none">
            {modalContent}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}

export default Modal;
