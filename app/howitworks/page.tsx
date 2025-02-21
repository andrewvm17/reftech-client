"use client"

import { Navbar } from "@/components/Navbar"

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-16 p-6">
        <h1 className="text-3xl font-bold mb-4">How It Works</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Revolutionizing Offside Calls for Football Fans</h2>
          <p className="text-lg">
            Football is a game of fine margins. A single offside decision can change the outcome of a match. But how do 
            we know for sure if a player was offside? <strong>VAR systems</strong> used in professional leagues rely on complex 
            technology and costly camera setups—until now.
          </p>
          <p className="mt-4 text-lg">
            Our SaaS platform gives <strong>football fans, content creators, and amateur leagues</strong> access to professional-grade 
            offside analysis using just a video screenshot. <strong>Instant, accurate, and backed by real computer vision science.</strong>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">The Science Behind It</h2>
          <p className="text-lg">
            We use advanced image processing techniques, inspired by the latest academic research in computer vision, 
            to <strong>automatically detect pitch lines, calculate perspective, and generate virtual offside lines</strong>—just like professional VAR!
          </p>
          <p className="mt-4 text-lg">
            Our method is based on <strong>vanishing point geometry</strong>, ensuring that the lines are accurate from any camera angle, 
            just like the systems used in top leagues worldwide.
          </p>
          <div className="mt-6">
            <img src="/images/vanishing_point.png" alt="Vanishing Point Example" className="rounded-lg shadow-lg" />
            <p className=" text-sm text-gray-500 mt-2">Example of how we determine the correct offside perspective.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Step-by-Step: How We Analyze Offside</h2>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Step 1: Upload a Screenshot</h3>
            <p className="text-lg">
              Simply upload a screenshot from a football broadcast or amateur match. Our system will process the image in 
              real-time to identify the pitch, players, and relevant lines.
            </p>
            <img src="/images/upload_example.png" alt="Upload Example" className="rounded-lg shadow-lg mt-4" />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Step 2: Automatic Line Detection</h3>
            <p className="text-lg">
              Using edge detection and advanced machine learning models, our system detects <strong>the key pitch markings</strong>, 
              including the penalty box and centerline, to calculate the perspective of the camera.
            </p>
            <img src="/images/line_detection.png" alt="Line Detection Example" className="rounded-lg shadow-lg mt-4" />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Step 3: Calculate the Vanishing Point</h3>
            <p className="text-lg">
              Just like professional VAR systems, we determine the <strong>vanishing point</strong>—the key to drawing perfectly 
              aligned virtual offside lines, even from off-center broadcast angles.
            </p>
            <img src="/images/vanishing_point.png" alt="Vanishing Point Calculation" className="rounded-lg shadow-lg mt-4" />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Step 4: Offside Decision in Seconds</h3>
            <p className="text-lg">
              The system <strong>automatically generates a virtual offside line</strong>, marking players in offside (red) or 
              onside (green). You can even manually adjust the decision, just like real VAR referees.
            </p>
            <img src="/images/offside_result.png" alt="Offside Decision" className="rounded-lg shadow-lg mt-4" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc ml-6 text-lg">
            <li><strong>No expensive cameras required</strong> – Works with any standard football broadcast.</li>
            <li><strong>Instant offside analysis</strong> – No need to wait for referees to make a call.</li>
            <li><strong>Perfect for debates & content creation</strong> – Football influencers can use our tool to break down plays.</li>
            <li><strong>Professional accuracy</strong> – Uses the same mathematical models as real VAR systems.</li>
            <li><strong>Affordable & easy to use</strong> – No need for technical knowledge.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
          <p className="text-lg">
            Whether you're a passionate football fan, a content creator, or part of an amateur league, our system gives you the power of VAR 
            <strong> at a fraction of the cost</strong>. Sign up now and start analyzing offside calls like a pro.
          </p>
          <div className="mt-6">
            <a href="/signup">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                Try It Now
              </button>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
