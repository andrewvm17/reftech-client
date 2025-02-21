const testimonials = [
    {
      quote: "reftech has completely changed how I engage with football matches. It's addictive!",
      author: "Sarah J., Twitter Influencer",
    },
    {
      quote: "As a content creator, reftech gives me the edge I need for my match analysis videos.",
      author: "Mike R., YouTube Football Analyst",
    },
    {
      quote: "Finally, I can prove my team wasn't offside! reftech is a game-changer for fans.",
      author: "Tom B., Devoted Supporter",
    },
  ]
  
  export function TestimonialSection() {
    return (
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-purple-800 p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <p className="text-sm text-purple-300">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  