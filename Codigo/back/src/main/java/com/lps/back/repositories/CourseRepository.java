package com.lps.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lps.back.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}
