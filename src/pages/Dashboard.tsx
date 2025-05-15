
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CourseHeader from '@/components/dashboard/CourseHeader';
import { useModuleProgress } from '@/hooks/useModuleProgress';
import PreviewMode from '@/components/common/PreviewMode';
import DashboardTabs from '@/components/dashboard/tabs/DashboardTabs';
import CourseSelector from '@/components/dashboard/CourseSelector';
import { useDashboardData } from '@/hooks/useDashboardData';
import { uiTranslations } from '@/translations/uiTranslations';

const Dashboard = () => {
  const { userPrefs, updateUserPreferences } = useUserPreferences();
  const location = useLocation();
  const [courseSelectionOpen, setCourseSelectionOpen] = useState(false);
  
  const {
    activeTab,
    setActiveTab,
    selectedModule,
    setSelectedModule,
    isLoading,
    isPreviewMode,
    setIsPreviewMode,
    user,
    currentLanguage,
    courseId,
    currentCourse
  } = useDashboardData();
  
  // Get UI text translations
  const texts = uiTranslations[currentLanguage as keyof typeof uiTranslations] || uiTranslations.english;
  
  // Use the module progress hook
  const { 
    courseProgress, 
    fetchCourseProgress, 
    handleModuleComplete, 
    handleQuizComplete 
  } = useModuleProgress(courseId);
  
  // Check URL for course selection parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectCourse = searchParams.get('selectCourse');
    
    if (selectCourse === 'true') {
      // Open the course selection dialog
      setCourseSelectionOpen(true);
      
      // Clean up URL
      searchParams.delete('selectCourse');
      const newUrl = `${location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [location.search]);
  
  // Handle course selection
  const handleCourseSelect = async (selectedCourseId: string) => {
    await updateUserPreferences({ course: selectedCourseId });
    window.location.reload();
  };
  
  // Update modules with completion status and unlocking logic
  const updatedModules = useMemo(() => {
    if (!currentCourse) return [];
    
    // Create a copy of the modules array
    return currentCourse.modules.map((module, index) => {
      // Check if module is completed
      const isCompleted = courseProgress.completedModules.includes(module.id);
      
      // Check if module should be unlocked
      let shouldBeUnlocked = index === 0; // First module is always unlocked
      if (index > 0) {
        // Module is unlocked if previous module is completed
        const previousModule = currentCourse.modules[index - 1];
        shouldBeUnlocked = courseProgress.completedModules.includes(previousModule.id) || previousModule.completed;
      }
      
      // Return updated module with progress information
      return {
        ...module,
        completed: isCompleted || module.completed,
        locked: !shouldBeUnlocked && !isCompleted && !module.completed
      };
    });
  }, [currentCourse, courseProgress.completedModules]);

  // Fetch course progress on initial load
  useEffect(() => {
    if (!isPreviewMode) {
      fetchCourseProgress();
    }
  }, [fetchCourseProgress, isPreviewMode]);
  
  return (
    <DashboardLayout 
      currentPath={location.pathname} 
      user={user}
    >
      {isPreviewMode && <PreviewMode />}
      
      <CourseHeader 
        title={currentCourse.title}
        avatar={currentCourse.avatar}
        progress={courseProgress.progress}
      />
      
      <div className="container mx-auto px-4 mb-16">
        <DashboardTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          isLoading={isLoading}
          modules={updatedModules}
          completedModuleIds={courseProgress.completedModules}
          currentLanguage={currentLanguage}
          courseAvatar={currentCourse.avatar}
          courseTranslations={currentCourse.translations}
          handleModuleComplete={handleModuleComplete}
          handleQuizComplete={handleQuizComplete}
          userName={user.name}
          texts={texts}
        />
      </div>
      
      {/* Course Selection Dialog */}
      <CourseSelector
        open={courseSelectionOpen}
        onOpenChange={setCourseSelectionOpen}
        onCourseSelect={handleCourseSelect}
        currentCourse={courseId}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
