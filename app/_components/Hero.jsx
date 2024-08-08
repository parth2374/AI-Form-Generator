import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="relative bg-[url(https://img.freepik.com/premium-photo/light-white-color-brick-wall-background-pattern-texture-background-copy-space-decoration-room-home_1149271-59690.jpg?ga=GA1.1.1378363207.1722072985&semt=ais_hybrid)] bg-cover bg-center bg-no-repeat">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
                <div className="mx-auto max-w-xl text-center">
                <h1
                    className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                >
                    Create Your Form. <br />
                </h1>

                <h1 className="mt-2 bg-gradient-to-r from-orange-600 via-red-500 to-purple-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"> In Seconds Not In Hours </h1>

                    <p className="mt-4 sm:text-xl/relaxed text-gray-500">
                    Create, customize, and deploy intelligent forms effortlessly. With our AI-powered builder, streamline data collection and automate workflows with just a few clicks. No coding required—just pure, intuitive design. Start building smarter forms today!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/dashboard"
                        >
                            + Create AI Form
                        </Link>

                        <Link
                            className="block w-full bg-gray-50 rounded px-12 py-3 text-sm font-medium text-purple-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                            href="/learnMore"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
