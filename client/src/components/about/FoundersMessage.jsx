const FoundersMessage = () => {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              A Message from Our Founder
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              “What started as a humble idea has now become a movement of impact,
              innovation, and education. We believe in shaping a future where
              learning is a way of life, where curiosity leads, and passion
              empowers progress. Together, we’re building something meaningful—
              for today, and for generations to come.”
            </p>
            <p className="text-md font-semibold text-gray-800">
              – Jane Doe, Founder & CEO
            </p>
          </div>
  
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1050&q=80"
              alt="Founder"
              className="w-full max-h-[600px] object-cover rounded-[2rem]"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default FoundersMessage;
  