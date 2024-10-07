import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - VahanSeva</title>
      </Head>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-6">
            About VahanSeva
          </h1>
          <p className="text-lg mb-4 text-gray-300">
            VahanSeva is a convenient and efficient ride-sharing platform, designed to make urban transportation seamless and accessible for everyone. Whether you need a quick ride to work or a convenient way to get across the city, we’ve got you covered!
          </p>
          <p className="text-lg mb-4 text-gray-300">
            With our easy-to-use platform, you can book rides, track your ride's location, and experience a safe, affordable journey. Our goal is to revolutionize the way you move around the city.
          </p>
          <p className="text-lg text-gray-300">
            Join us and become a part of the transportation solution. Together, let's make city commuting hassle-free and fun!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
