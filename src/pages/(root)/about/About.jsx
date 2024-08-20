import React from "react";

const About = () => {
  return (
    <div className='flex justify-center items-center flex-col min-h-[87vh]'>
      <div className='flex  flex-col items-center gap-4'>
        <h1 className='text-5xl'>
          <a href='https://github.com/CodingSamrat/initpro' target='_blank'>
            <span className='text-purple-500 underline underline-offset-4'>
              InitPro
            </span>
          </a>
        </h1>
        <p className='text-xl'>A light weight vite base react library.</p>
      </div>
      <div className=' mt-10 md:mx-12 md:flex md:gap-4 md:justify-around'>
        <div className='md:w-1/2 mx-4'>
          <p className='text-justify text-lg text-gray-700'>
            InitPro is a lightweight, Vite-based React library designed to
            streamline and enhance the development experience for modern web
            applications. By leveraging Vite's rapid build times and optimized
            performance, InitPro provides a nimble solution for developers
            seeking a minimalistic yet powerful library for building React
            components. Its core philosophy centers on simplicity and
            efficiency, ensuring that developers can quickly integrate and
            utilize its features without being bogged down by unnecessary
            complexity. InitPro's modular architecture allows for easy
            customization and scalability, making it an excellent choice for
            both small projects and large-scale applications. The library
            includes a range of essential components and utilities, all
            optimized to work seamlessly with Vite’s fast development
            environment. Additionally, InitPro is built with a focus on
            performance, ensuring that applications remain responsive and fast
            even as they grow. With its emphasis on lightweight design and rapid
            development, InitPro aims to empower developers by providing the
            tools they need to create high-quality React applications with
            minimal overhead. This makes it an ideal choice for teams looking to
            accelerate their development workflow while maintaining a clean and
            efficient codebase.
          </p>
        </div>
        <div className='bg-purple-400 p-2 flex flex-col justify-center md:p-6 md:px-24'>
          <h2 className='font-bold text-lg md:text-2xl text-gray-700'>
            Creator
          </h2>
          <p className='font-semibold text-2xl md:text-5xl mb-6'>
            {" "}
            Samrat Biswas.
          </p>
          <div className=' flex flex-col gap-2 bg-purple-300 p-3 rounded-lg'>
            <p className='text-white font-serif text-lg md:text-xl text-center'>
              connect with me
            </p>
            <div className=' grid grid-cols-2 md:grid-cols-4 gap-4 mb-2'>
              <a
                href='https://github.com/CodingSamrat'
                target='_blank'
                className='bg-purple-600 py-4 text-white flex items-center justify-center md:p-3 rounded-md hover:scale-105 hover:bg-purple-700 duration-300'>
                <h1 className='text-lg'>Github</h1>
              </a>
              <a
                href='https://codingsamrat.com'
                target='_blank'
                className='bg-purple-600 py-4 text-white flex items-center justify-center md:p-3 rounded-md hover:scale-105 hover:bg-purple-700 duration-300'>
                <h1 className='text-lg'>Portfolio</h1>
              </a>
              <a
                href='https://x.com/Coding_Samrat'
                target='_blank'
                className='bg-purple-600 py-4 text-white flex items-center justify-center md:p-3 rounded-md hover:scale-105 hover:bg-purple-700 duration-300'>
                <h1 className='text-lg'>Twitter</h1>
              </a>
              <a
                href='https://www.instagram.com/CodingSamrat'
                target='_blank'
                className='bg-purple-600 py-4 text-white flex items-center justify-center md:p-3 rounded-md hover:scale-105 hover:bg-purple-700 duration-300'>
                <h1 className='text-lg'>Instagram</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
