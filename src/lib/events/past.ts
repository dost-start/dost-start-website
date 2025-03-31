import Event from "@/types/eventType";

const pastEvents: Event[] = [
  {
    title: "Tech Innovation Summit 2025",
    slug: "tech-innovation-summit-2025",
    tags: ["Technology", "Innovation", "Conference"],
    description:
      "A summit bringing together the brightest minds in tech to discuss the future of innovation.",
    location: "Manila, Philippines",
    date: new Date("2025-06-15"),
    startingTime: "09:00 AM",
    endingTime: "05:00 PM",
    registrationLink: "https://example.com/register",
    socialLinks: {
      facebook: "https://facebook.com/techsummit2025",
      instagram: "https://instagram.com/techsummit2025",
      website: "https://techsummit2025.com",
    },
    hashtags: ["#TechSummit2025", "#Innovation"],
    coverImage: "/event-cover-placeholder.png",
    images: [
      "https://source.unsplash.com/800x600/?tech,event",
      "https://source.unsplash.com/800x600/?conference,people",
    ],
  },
  {
    title: "AI & Machine Learning Workshop",
    slug: "ai-machine-learning-workshop",
    tags: ["AI", "Machine Learning", "Workshop"],
    description:
      "A hands-on workshop focused on the fundamentals and applications of AI and machine learning.",
    location: "Cebu, Philippines",
    date: new Date("2025-07-20"),
    startingTime: "10:00 AM",
    endingTime: "04:00 PM",
    registrationLink: "https://example.com/register-ai",
    socialLinks: {
      facebook: "https://facebook.com/aiworkshop2025",
      instagram: "https://instagram.com/aiworkshop2025",
    },
    hashtags: ["#AIWorkshop", "#MachineLearning"],
    coverImage: "/event-cover-placeholder.png",
    images: [
      "https://source.unsplash.com/800x600/?ai,workshop",
      "https://source.unsplash.com/800x600/?machinelearning,training",
    ],
  },
  {
    title: "Startup Founders Meetup",
    slug: "startup-founders-meetup",
    tags: ["Startup", "Networking", "Entrepreneurship"],
    description:
      "A meetup for startup founders and aspiring entrepreneurs to connect and collaborate.",
    location: "Davao City, Philippines",
    date: new Date("2025-08-05"),
    startingTime: "06:00 PM",
    endingTime: "09:00 PM",
    registrationLink: "https://example.com/register-startup",
    socialLinks: {
      facebook: "https://facebook.com/startupmeetup2025",
      website: "https://startupmeetup2025.com",
    },
    hashtags: ["#StartupMeetup", "#Entrepreneurs"],
    coverImage: "/event-cover-placeholder.png",
    images: [
      "https://source.unsplash.com/800x600/?business,meeting",
      "https://source.unsplash.com/800x600/?startup,discussion",
    ],
  },
  {
    title: "Women in Tech Forum",
    slug: "women-in-tech-forum",
    tags: ["Women in Tech", "Diversity", "Inclusion"],
    description:
      "An empowering forum discussing opportunities and challenges for women in the tech industry.",
    location: "Quezon City, Philippines",
    date: new Date("2025-09-10"),
    startingTime: "01:00 PM",
    endingTime: "06:00 PM",
    registrationLink: "https://example.com/register-wit",
    socialLinks: {
      facebook: "https://facebook.com/womenintech2025",
      instagram: "https://instagram.com/womenintech2025",
    },
    hashtags: ["#WomenInTech", "#DiversityInTech"],
    coverImage: "/event-cover-placeholder.png",
    images: [
      "https://source.unsplash.com/800x600/?conference,women",
      "https://source.unsplash.com/800x600/?diversity,tech",
    ],
  },
];

export default pastEvents;
