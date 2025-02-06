export default {
  firstName: 'James',
  lastName: 'Carter',
  jobTitle: 'Full Stack Developer',
  address: '525 N Tryon Street, NC 28117',
  phone: '(123)-456-7890',
  email: 'example@gmail.com',
  themeColor: "#ff6666",
  linkedin: "https://www.linkedin.com/in/james-carter/",
  profilePicture: "https://via.placeholder.com/150", // Added profilePicture field
  summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  experience: [
    {
      id: 1,
      title: 'Full Stack Developer',
      companyName: 'Amazon',
      city: 'New York',
      state: 'NY',
      startDate: 'Jan 2021',
      endDate: '',
      currentlyWorking: true,
      workSummary: '• Designed, developed, and maintained full-stack applications using React and Node.js.\n' +
        '• Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.\n' +
        '• Maintained the React Native in-house organization application.\n' +
        '• Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      companyName: 'Google',
      city: 'Charlotte',
      state: 'NC',
      startDate: 'May 2019',
      endDate: 'Jan 2021',
      currentlyWorking: false,
      workSummary: '• Designed, developed, and maintained full-stack applications using React and Node.js.\n' +
        '• Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.\n' +
        '• Maintained the React Native in-house organization application.\n' +
        '• Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.'
    }
  ],
  education: [
    {
      id: 1,
      universityName: 'Western Illinois University',
      startDate: 'Aug 2018',
      endDate: 'Dec 2019',
      degree: 'Master',
      major: 'Computer Science',
      grade: '3.8 CGPA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    },
    {
      id: 2,
      universityName: 'Harvard University',
      startDate: 'Aug 2014',
      endDate: 'May 2018',
      degree: 'Bachelor',
      major: 'Software Engineering',
      grade: '85%',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    }
  ],
  project:[
    
  ],
  skills: [
    {
      id: 1,
      name: 'Angular',
      rating: 80,
    },
    {
      id: 2,
      name: 'React',
      rating: 100,
    },
    {
      id: 3,
      name: 'MySQL',
      rating: 80,
    },
    {
      id: 4,
      name: 'React Native',
      rating: 100,
    }
  ],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/james-carter/',
    github: 'https://github.com/jamescarter',
    twitter: 'https://twitter.com/jamescarter',
    personalWebsite: 'https://www.jamescarter.dev',
  },
  certifications: [
    {
      id: 1,
      name: 'Certified Full Stack Developer',
      issuedBy: 'FreeCodeCamp',
      date: 'Dec 2020',
      link: 'https://www.freecodecamp.org/certification/jamescarter/full-stack-developer'
    },
    {
      id: 2,
      name: 'AWS Certified Developer',
      issuedBy: 'Amazon Web Services',
      date: 'Jan 2022',
      link: 'https://www.aws.com/certified-developer/jamescarter'
    }
  ]
};