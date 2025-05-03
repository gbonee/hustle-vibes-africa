
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
const courses = [{
  id: 1,
  title: 'Start a Pastry Biz From Your Kitchen',
  description: 'Learn how to start your pastry business from your kitchen with minimal investment. Includes recipes, pricing strategies, and customer acquisition tactics.',
  emoji: '🧁',
  color: 'from-amber-400 to-orange-500',
  language: 'Yoruba',
  tutor: 'Baker Amara',
  income: '₦50K/Month',
  lessons: 8,
  price: '₦5,000',
  popular: true
}, {
  id: 2,
  title: 'Wig Revamp + Chinese Hair Vendor Secrets',
  description: 'Master the art of revamping wigs and connecting with premium Chinese hair vendors. Learn how to create a profitable hair business.',
  emoji: '💇🏾‍♀️',
  color: 'from-purple-400 to-pink-500',
  language: 'Igbo',
  tutor: 'Aunty Nkem',
  income: '₦100K/Month',
  lessons: 10,
  price: '₦7,500',
  popular: false
}, {
  id: 3,
  title: 'Import Small Goods From China & Sell on WhatsApp',
  description: 'Learn how to import profitable small items from China and sell them through WhatsApp. Includes supplier connections and marketing strategies.',
  emoji: '📲',
  color: 'from-blue-400 to-cyan-500',
  language: 'Hausa',
  tutor: 'Uncle Musa',
  income: '₦150K/Month',
  lessons: 12,
  price: '₦10,000',
  popular: true
}, {
  id: 4,
  title: 'Get a Tech Job in 90 Days (No Degree)',
  description: 'Learn Python coding in Pidgin plus interview hacks to land a tech job without a degree. Includes practical projects and CV templates.',
  emoji: '💻',
  color: 'from-green-400 to-emerald-500',
  language: 'Pidgin',
  tutor: 'Digital Mama',
  income: '₦300K/Month',
  lessons: 16,
  price: '₦15,000',
  popular: true
}, {
  id: 5,
  title: 'Speak English Like a Big Boy (Yoruba Edition)',
  description: 'Master conversational English through AI roleplay sessions. Learn expressions for business meetings, interviews, and social settings.',
  emoji: '🗣️',
  color: 'from-yellow-400 to-amber-500',
  language: 'Yoruba',
  tutor: 'Baker Amara',
  income: 'Confidence',
  lessons: 14,
  price: '₦4,000',
  popular: false
}, {
  id: 6,
  title: 'Side Hustle Cheat Code',
  description: 'Discover copywriting and dropshipping hacks to make extra income with minimal time investment. Perfect for students and workers.',
  emoji: '💸',
  color: 'from-red-400 to-rose-500',
  language: 'Hausa',
  tutor: 'Uncle Musa',
  income: '₦80K/Month',
  lessons: 9,
  price: '₦6,000',
  popular: false
}];
const TopCourses = () => {
  const handleEnrollCourse = (courseId: number) => {
    console.log(`Enroll in course ${courseId} clicked`);
    // Here you would typically handle enrollment or navigate to course page
    alert(`Course enrollment coming soon for course ${courseId}!`);
  };
  const handleViewAllCourses = () => {
    console.log("View all courses clicked");
    // Here you would typically navigate to all courses page
    alert("All courses coming soon!");
  };
  return <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="text-white">PRACTICAL NAIJA</span> <span className="text-electric">HUSTLE COURSES</span>
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          No theory, just practical skills that can help you start making money. All courses include video lessons and one-on-one sessions with AI tutors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => <Card key={course.id} className="border-2 border-electric/30 bg-muted/80 overflow-hidden hover:border-electric hover:shadow-lg hover:shadow-electric/20 transition-all duration-300">
              <div className=""></div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{course.emoji}</span>
                  {course.popular && <span className="bg-electric/20 text-electric text-xs uppercase font-bold py-1 px-2 rounded">
                      Popular
                    </span>}
                </div>
                <CardTitle className="text-xl mt-3">{course.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm text-gray-400">
                  {course.language} • Taught by {course.tutor}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-gray-300 mb-4">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-4 bg-black/20 rounded-md p-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Income Potential</p>
                    <p className="font-bold text-electric">{course.income}</p>
                  </div>
                  <div className="text-center border-l border-gray-700">
                    <p className="text-xs text-gray-400">Lessons</p>
                    <p className="font-bold">{course.lessons}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <button className="w-full py-2 text-center bg-electric text-black rounded font-medium transition-colors hover:bg-electric/80" onClick={() => handleEnrollCourse(course.id)}>
                  Enroll Now
                </button>
              </CardFooter>
            </Card>)}
        </div>
        
        <div className="mt-12 text-center">
          <button className="rebel-secondary-button" onClick={handleViewAllCourses}>
            View All Courses
          </button>
        </div>
      </div>
    </section>;
};
export default TopCourses;
