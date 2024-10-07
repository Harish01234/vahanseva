import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - VahanSeva</title>
      </Head>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Modern Gradient Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 mb-8">
            About VahanSeva
          </h1>
          {/* Content */}
          <p className="text-lg sm:text-xl mb-6 text-gray-300 leading-relaxed">
            VahanSeva is a convenient and efficient ride-sharing platform, designed to make urban transportation seamless and accessible for everyone. Whether you need a quick ride to work or a convenient way to get across the city, we&apos;ve got you covered!
          </p>
          <p className="text-lg sm:text-xl mb-6 text-gray-300 leading-relaxed">
            With our easy-to-use platform, you can book rides, track your ride&apos;s location, and experience a safe, affordable journey. Our goal is to revolutionize the way you move around the city.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Join us and become a part of the transportation solution. Together, let&apos;s make city commuting hassle-free and fun!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
