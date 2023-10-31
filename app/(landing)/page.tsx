import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMail, HiSparkles } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CallToAction />
      </main>
    </div>
  );
}

export default LandingPage;

const Hero = () => {
  return (
    <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-center sm:mb-12 md:mb-32 md:mt-20">
      <h1 className="max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
        Convert Content Into Customers With{" "}
        <span className="bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent">
          {" "}
          AI Lead Magnets{" "}
        </span>
      </h1>

      <p className="sm:text-md mt-5 max-w-2xl text-sm text-gray-600  md:text-xl">
        LeadConvert helps creators turn regular content into interactive AI
        experiences, effortlessly capturing leads, and nurturing them towards
        your digital products or courses.
      </p>
      <div className="mt-3 flex max-w-4xl flex-col flex-wrap items-center justify-around sm:w-full sm:flex-row">
        <Link href="/lead-magnets">
          <Button variant="default" className="md:text-xl">
            Create Your First AI Lead Magnet
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center space-y-10 px-8 pb-12 pt-8 sm:py-12 md:flex-row md:space-x-10 md:space-y-0 md:py-20 lg:py-28 2xl:py-32">
      <div className="absolute inset-0 z-0 -skew-y-6 transform bg-gradient-to-r from-purple-100 to-purple-50" />
      <div className="relative z-10 flex flex-col justify-center space-y-10 md:flex-row md:space-x-10 md:space-y-0">
        <FeatureCard
          title="Unique AI Lead Magnets"
          description="Beyond ebooks and videos, offer dynamic AI solutions that speak directly to your audience's needs."
          icon={<HiSparkles className="h-16 w-16" />}
        />
        <FeatureCard
          title="Effortless Email Capture"
          description="Let AI chatbots do all the hard work and capture leads for you, turning interactions into opportunities effortlessly."
          icon={<HiMail className="h-16 w-16" />}
        />
        <FeatureCard
          title="Easy Integration with Social Media"
          description="Make your posts work for you; effortlessly share interactive content and boost your lead generation."
          icon={<IoShareSocialSharp className="h-16 w-16" />}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-purple-200 bg-white p-8 text-center">
      <div className="mb-4 rounded-full bg-purple-500 p-4 text-white">
        {icon}
      </div>
      <h2 className="mt-4 text-xl font-light text-purple-500">{title}</h2>
      <p className="mt-2 italic text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="py-24">
      <h2 className="mb-5 text-center text-5xl font-bold">How It Works</h2>
      <div className="mx-auto flex flex-col md:max-w-7xl md:space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              className="drop-shadow-2xl"
              src="/images/landing-page-step-1.png"
              width={2732}
              height={1384}
              alt="Step 1: Create Your AI Lead Magnet"
            />
          </div>
          <HowItWorksStep
            title="Step 1: Create Your AI Lead Magnet"
            description="Define the value proposition and train the AI to ask specific questions."
            checks={[
              "Go live in under 5 minutes",
              "Train with your own data",
              "Guide users to the desired outcome",
            ]}
          />
        </div>
      </div>
      {/* Step 2 */}
      <div className="flex flex-col justify-between  sm:flex-row-reverse sm:space-y-0">
        <div className="mx-auto w-full md:w-1/2">
          <Image
            className="drop-shadow-2xl"
            src="/images/landing-page-step-2.png"
            width={2282}
            height={1354}
            alt="Step 3: Capture and Convert"
          />
        </div>
        <HowItWorksStep
          title="Step 2: Share on Social Media"
          description="Promote your AI Lead Magnet with a simple link at the end of your posts."
          checks={[
            "Share across multiple platforms",
            "Integrated with LinkedIn and Twitter",
            "Customize your LeadConvert link",
          ]}
        />
      </div>
      {/* Step 3 */}
      <div className="flex flex-col justify-between  sm:flex-row sm:space-y-0">
        <div className="mx-auto w-full p-6 md:w-1/2">
          <Image
            className="drop-shadow-2xl"
            src="/images/landing-page-step-3.png"
            width={2282}
            height={1354}
            alt="Step 3: Capture and Convert"
          />
        </div>
        <HowItWorksStep
          title="Step 3: Capture and Convert"
          description="LeadConvert asks for the user's email address, providing you with engaged leads ready for follow-up."
          checks={[
            "Automated email capture",
            "Engage leads with dynamic content",
            "Seamless integration with CRM",
          ]}
        />
      </div>
    </div>
  );
};

const HowItWorksStep = ({
  title,
  description,
  checks,
}: {
  title: string;
  description: string;
  checks: string[];
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
      <h3 className="text-xl font-semibold text-purple-500">{title}</h3>
      <p className="mt-2 font-semibold text-gray-600">{description}</p>
      <ul className="mt-2">
        {checks.map((check, index) => (
          <li
            key={index}
            className="text-grey-400 flex items-center font-light"
          >
            <FaCheck className="mr-2 text-purple-500" />
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-red-500  py-16">
      <h2 className="text-5xl text-white font-bold text-center mb-8">
        Pricing
      </h2>
      <div className="flex flex-col justify-center mx-6 space-y-6 sm:space-x-8 sm:flex-row sm:space-y-0">
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Free Plan</CardDescription>
            <CardTitle className="text-4xl">$0/Month</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="mb-2 text-center text-gray-600">
              Create up to 2 AI Lead Magnets
            </p>
            <Link href="/lead-magnets">
              <Button variant="outline">Get Started</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Paid Plan</CardDescription>
            <CardTitle className="text-4xl">$10/Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center text-gray-600">
              Create Unlimited AI Lead Magnets
            </p>
            <Link href="/lead-magnets">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-16 text-center">
      <h2 className="text-3xl font-bold text-purple-500 sm:text-4xl md:text-5xl">
        Ready to Transform Your Content?
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-grey-700 sm:text-xl md:text-2xl">
        Join the revolution in lead generation. Turn your content into
        interactive AI experiences and engage your audience like never before.
      </p>
      <Link href="/lead-magnets">
        <Button className="text-sm px-4 py-5 sm:text-lg mt-4">
          Create Your First AI Lead Magnet
        </Button>
      </Link>
    </div>
  );
};
