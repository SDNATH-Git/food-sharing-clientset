import React from "react";

const About = () => {
    return (
        <section className="min-h-screen bg-gradient-to-r from-green-50 via-white to-orange-50 py-16 px-6 md:px-20">
            <div className="max-w-5xl mx-auto space-y-12">
                <header className="text-center">
                    <h1 className="text-5xl font-extrabold text-green-700 mb-4">
                        About <span className="text-orange-600">Food Sharing</span>
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Join us in our mission to reduce food waste and build a compassionate community
                        where surplus food reaches those who need it the most.
                    </p>
                </header>

                <section className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-800 mb-6 border-b-2 border-orange-400 inline-block pb-1">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
                        To create a kinder world by minimizing food waste and connecting people
                        who want to share food with those in need.
                    </p>
                </section>

                <section className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-800 mb-6 border-b-2 border-orange-400 inline-block pb-1">
                        Our Vision
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
                        A future where surplus food never goes to waste and every person has access
                        to nutritious meals.
                    </p>
                </section>

                <section className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-800 mb-10 border-b-2 border-orange-400 inline-block pb-1">
                        Meet the Founder
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
                        <img
                            src="https://i.ibb.co.com/s9dv9ZLj/shuvo.png"
                            alt="Founder"
                            className="w-32 h-32 rounded-full border-4 border-orange-400 shadow-lg object-cover"
                        />
                        <div>
                            <h3 className="text-2xl font-bold text-orange-600 mb-1">
                                SD NATH
                            </h3>
                            <p className="text-green-700 font-semibold mb-3">Founder & Developer</p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Passionate about building community-driven apps that make a positive social
                                impact. Dedicated to sustainability and food justice.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default About;
