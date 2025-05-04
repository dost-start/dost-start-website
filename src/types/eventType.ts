interface Event {
  title: string;
  tags?: string[];
  description: string;
  location?: string;
  date?: Date;
  startingTime?: string;
  endingTime?: string;
  registrationLink?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  hashtags?: string[];
  coverImage?: string;
  images?: string[];
  slug: string;
}

export default Event;
