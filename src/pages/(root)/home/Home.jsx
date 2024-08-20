import React from "react";

const Home = () => {
  return (
    <div className='flex  flex-col items-center gap-4 justify-center min-h-[87vh]'>
      <h1 className='text-5xl text-center'>
        Welcome to{" "}
        <a href='https://github.com/CodingSamrat/initpro' target='_blank'>
          <span className='text-purple-500 underline underline-offset-4'>
            InitPro
          </span>
        </a>
      </h1>
      <p className='text-xl'>A light weight vite base react library.</p>
    </div>
  );
};

export default Home;
