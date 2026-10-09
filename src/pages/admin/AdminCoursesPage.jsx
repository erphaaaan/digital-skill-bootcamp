import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { BookOpen, Plus, Edit3, Trash2, Eye, CheckCircle2 } from 'lucide-react';

export const AdminCoursesPage = ({ onNavigate }) => {
  const { courses, saveCourseAdmin, deleteCourseAdmin } = useCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    level: 'Beginner',
    duration_hours: 30,
    instructor: 'Bootcamp Instructor',
    description: '',
    thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    is_published: true
  });

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      category: 'Web Development',
      level: 'Beginner',
      duration_hours: 30,
      instructor: 'Bootcamp Instructor',
      description: '',
      thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      is_published: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCourse(c);
    setFormData({
      title: c.title,
      category: c.category,
      level: c.level,
      duration_hours: c.duration_hours,
      instructor: c.instructor,
      description: c.description,
      thumbnail_url: c.thumbnail_url,
      is_published: c.is_published
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCourseAdmin({
      ...(editingCourse ? { id: editingCourse.id } : {}),
      ...formData,
      modules: editingCourse?.modules || [
        {
          id: `mod-${Date.now()}`,
          title: 'Module 1: Foundations',
          order_index: 1,
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: 'Welcome to Course Overview',
              type: 'text',
              duration_mins: 15,
              content: 'Course content introduction...',
              is_free_preview: true
            }
          ]
        }
      ]
    });
    setModalOpen(false);
  };

  const togglePublish = (c) => {
    saveCourseAdmin({
      ...c,
      is_published: !c.is_published
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">Course & Curriculum Manager</h1>
          <p className="text-xs text-slate-500">Create, edit, and publish bootcamp skill courses.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-40 overflow-hidden bg-slate-200">
                <img src={c.thumbnail_url} alt={c.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${c.is_published ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                  {c.is_published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase">{c.category} • {c.level}</span>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-2">{c.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-xs font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => togglePublish(c)}
                  className={`p-1.5 text-xs font-bold ${c.is_published ? 'text-amber-600' : 'text-emerald-600'}`}
                >
                  {c.is_published ? 'Unpublish' : 'Publish'}
                </button>
              </div>

              <button
                onClick={() => deleteCourseAdmin(c.id)}
                className="p-1.5 text-slate-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Course Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Freelancing">Freelancing</option>
                </select>

                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <textarea
                required
                rows={3}
                placeholder="Course Overview & Description *"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
