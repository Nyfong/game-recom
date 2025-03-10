import React from "react";
import Image from "next/image";
import Link from "next/link";

const TeamMember = ({ name, role, description, imageSrc, altText, links }) => (
  <div className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
    <div className="w-full sm:w-48 h-48 relative">
      <Image
        className="object-cover w-full h-full"
        src={imageSrc}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-5 flex-1">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h3>
      <span className="text-gray-500 dark:text-gray-400 block mb-2">
        {role}
      </span>
      <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <ul className="flex space-x-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label={`${name}'s ${link.platform} profile`}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Teampage() {
  const teamMembers = [
    {
      name: "Ny Fong",
      role: "CEO & Web Developer",
      description: "Drives the technical strategy of the platform and brand.",
      imageSrc:
        "https://wtc-s1.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffong.b0dffe6a.png&w=1080&q=75",
      altText: "Ny Fong",
      links: [
        {
          href: "#",
          platform: "Facebook",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Phou Kukseng",
      role: "CTO",
      description:
        "Drives the tech solutions behind the platform, focusing on development and scalability.",
      imageSrc:
        "https://wtc-s1.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkaiseng.3f065b55.png&w=640&q=75",
      altText: "Phou Kukseng",
      links: [
        {
          href: "#",
          platform: "GitHub",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Penh Sokpheavy",
      role: "CTO",
      description:
        "Drives the tech solutions behind the platform, focusing on development and scalability.",
      imageSrc:
        "https://wtc-s1.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fyu.4dcc1cf0.png&w=1080&q=75",
      altText: "Penh Sokpheavy",
      links: [
        {
          href: "#",
          platform: "GitHub",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Morn Karakot",
      role: "CTO",
      description:
        "Drives the tech solutions behind the platform, focusing on development and scalability.",
      imageSrc:
        "https://wtc-s1.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkot.8c894899.png&w=828&q=75",
      altText: "Morn Karakot",
      links: [
        {
          href: "#",
          platform: "GitHub",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Team
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Team members of Website Free Game resource
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
