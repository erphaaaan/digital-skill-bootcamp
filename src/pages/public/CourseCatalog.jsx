import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { Search, Filter, Clock, BookOpen, CheckCircle2, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const CourseCatalog = ({ onNavigate }) => {
  const { courses, isEnrolled, enrollCourse } = useCourses();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Web Development', 'Digital Marketing', 'Data Analytics', 'Graphic Design', 'Artificial Intelligence', 'Freelancing'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtering Logic
  const filteredCourses = courses.filter(course => {
    if (!course.is_published) return false;

    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  }).sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'duration') return b.duration_hours - a.duration_hours;
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Explore Free Digital Skill Courses
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          Practical, beginner-friendly training programs built for job readiness. Enroll instantly and start learning at your own pace.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          {/* Level Dropdown */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {levels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Skill Levels' : lvl}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-slate-500 hover:text-red-500 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Results Count & Sort Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Showing {filteredCourses.length} Courses</span>
        <div className="flex items-center gap-2">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-slate-900 dark:text-white font-bold cursor-pointer focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="title">Course Title (A-Z)</option>
            <option value="duration">Duration (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">No Courses Found</h3>
          <p className="text-xs text-slate-500">No courses matched your current search filters. Try clearing or searching another topic.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const enrolled = isEnrolled(c.id);
            return (
              <div 
                key={c.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img 
                      src={c.thumbnail_url} 
                      alt={c.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                      100% Free
                    </span>
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {c.level}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      <span>{c.category}</span>
                      <span className="text-slate-400 font-normal normal-case flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {c.duration_hours} hrs
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                      {c.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>

                    <p className="text-[11px] text-slate-500 italic pt-1">
                      Instructor: {c.instructor || 'Bootcamp Staff'}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-4">
                  <button
                    onClick={() => onNavigate('course-detail', { courseId: c.id })}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600"
                  >
                    View Curriculum
                  </button>

                  <button
                    onClick={() => {
                      if (!enrolled) enrollCourse(c.id);
                      onNavigate('course-detail', { courseId: c.id });
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      enrolled
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                    }`}
                  >
                    {enrolled ? 'Resume Course' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
