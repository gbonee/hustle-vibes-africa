
import React from 'react';

const courses = [
  {
    id: 1,
    title: 'Start a Pastry Biz From Your Kitchen',
    description: '₦50K/Month Hustle',
    emoji: '🧁',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 2,
    title: 'Learn Wig Revamp + Chinese Hair Vendor Secrets',
    description: 'Premium wigs, premium profits',
    emoji: '💇🏾‍♀️',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 3,
    title: 'Import Small Goods from China & Sell on WhatsApp/Instagram',
    description: 'Social commerce blueprint',
    emoji: '📲',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 4,
    title: 'Get a Tech Job in 90 Days',
    description: 'No Degree + Interview cheats',
    emoji: '💻',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 5,
    title: 'Speak English Like a Big Boy',
    description: 'Yoruba Edition',
    emoji: '🗣️',
    color: 'from-yellow-400 to-amber-500'
  },
  {
    id: 6,
    title: 'Side Hustle Cheat Code',
    description: 'Copywriting, dropshipping hacks',
    emoji: '💰',
    color: 'from-red-400 to-rose-500'
  }
];

const TopCourses = () => {
  const handleViewCourse = (courseId: number) => {
    console.log(`View course ${courseId} clicked`);
    // Here you would typically navigate to the course page
    // For now, we'll just log to the console
    alert(`Course ${courseId} details coming soon!`);
  };

  const handleViewAllCourses = () => {
    console.log("View all courses clicked");
    // Here you would typically navigate to all courses page
    alert("All courses coming soon!");
  };

  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="text-white">NAIJA-PROVEN</span> <span className="text-electric">HUSTLES</span>
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          No theory. Just money moves. Tested in the streets, now on your screen.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="course-card group">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${course.color}`}></div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">{course.emoji}</span>
                <span className="bg-electric/20 text-electric text-xs uppercase font-bold py-1 px-2 rounded">
                  Popular
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 pr-6">{course.title}</h3>
              <p className="text-gray-400 mb-6">{course.description}</p>
              <button 
                className="w-full py-2 text-center bg-electric/10 text-electric rounded font-medium transition-colors hover:bg-electric hover:text-black"
                onClick={() => handleViewCourse(course.id)}
              >
                View Course
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            className="rebel-secondary-button"
            onClick={handleViewAllCourses}
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopCourses;
